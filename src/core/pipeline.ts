import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { Drawing } from "../types/drawing.js";
import { writeJson, writeText } from "../shared/fs.js";
import { log } from "../shared/log.js";
import { outputPaths } from "../shared/paths.js";
import { renderDrawingSvg, renderLayeredSvg, renderVideoBase } from "../svg/engine.js";
import { validateDrawing } from "../quality-control/validator.js";
import { renderSrt, renderSubtitleOverlaySvg } from "../subtitle/engine.js";
import { MacOsSayProvider } from "../voice/macos-say.js";
import { generateMetadata } from "../metadata/engine.js";
import { renderThumbnailSvg } from "../thumbnail/engine.js";
import { renderShort, svgToPng } from "../video/renderer.js";
import { buildQualityReport } from "../quality-control/report.js";
import { drawingHash, loadManifest, outputsExist, saveManifest } from "./manifest.js";

export interface PipelineOptions {
  force?: boolean;
  videoOnly?: boolean;
}

export async function runPipeline(drawing: Drawing, options: PipelineOptions = {}): Promise<void> {
  const paths = outputPaths(drawing.id);
  await mkdir(paths.tempDir, { recursive: true });
  let manifest = await loadManifest(paths.manifest, drawing);

  const stage = async (name: string, outputs: string[], work: () => Promise<void>): Promise<void> => {
    if (!options.force && manifest.stages[name]?.status === "completed" && await outputsExist(outputs)) {
      log(name, "Bỏ qua: input không đổi và output đã tồn tại.");
      return;
    }
    log(name, "Bắt đầu.");
    try {
      await work();
      manifest.stages[name] = { status: "completed", completedAt: new Date().toISOString(), outputs };
      await saveManifest(paths.manifest, manifest);
      log(name, "Hoàn thành.");
    } catch (error) {
      manifest.stages[name] = {
        status: "failed",
        completedAt: new Date().toISOString(),
        outputs,
        error: error instanceof Error ? error.message : String(error),
      };
      await saveManifest(paths.manifest, manifest);
      throw error;
    }
  };

  await stage("validate-data", [], async () => {
    const errors = validateDrawing(drawing).filter((issue) => issue.severity === "error");
    if (errors.length) throw new Error(errors.map((issue) => `${issue.code}: ${issue.message}`).join("\n"));
  });

  const enabledStrokes = drawing.strokes.filter((stroke) => stroke.enabled).sort((a, b) => a.order - b.order);
  const layerPngs = enabledStrokes.map((stroke) => path.join(paths.layersDir, `${stroke.id}.png`));
  const subtitlePngs = drawing.voiceScript.cues.map((cue, index) =>
    path.join(paths.tempDir, "subtitles", `${String(index + 1).padStart(2, "0")}-${cue.id}.png`),
  );

  await stage("svg", [paths.fullSvg, paths.layeredSvg], async () => {
    await writeText(paths.fullSvg, renderDrawingSvg(drawing));
    await writeText(paths.layeredSvg, renderLayeredSvg(drawing));
  });

  await stage("png", [paths.transparentPng, paths.whitePng, paths.baseVideoPng, ...layerPngs], async () => {
    const whiteSvg = path.join(paths.tempDir, "white.svg");
    const baseSvg = path.join(paths.tempDir, "video-base.svg");
    await writeText(whiteSvg, renderDrawingSvg(drawing, { background: "#ffffff" }));
    await writeText(baseSvg, renderVideoBase(drawing));
    await svgToPng(paths.fullSvg, paths.transparentPng, 1000, 1000);
    await svgToPng(whiteSvg, paths.whitePng, 1000, 1000);
    await svgToPng(baseSvg, paths.baseVideoPng, 1080, 1920);
    for (const [index, stroke] of enabledStrokes.entries()) {
      const layerSvg = path.join(paths.tempDir, `${stroke.id}.svg`);
      await writeText(layerSvg, renderDrawingSvg(drawing, { onlyStrokeId: stroke.id, videoCanvas: true }));
      await svgToPng(layerSvg, layerPngs[index]!, 1080, 1920);
    }
  });

  await stage("subtitle", [paths.subtitles, ...subtitlePngs], async () => {
    await writeText(paths.subtitles, renderSrt(drawing.voiceScript.cues));
    for (const [index, cue] of drawing.voiceScript.cues.entries()) {
      const subtitleSvg = path.join(paths.tempDir, "subtitles", `${String(index + 1).padStart(2, "0")}-${cue.id}.svg`);
      await writeText(subtitleSvg, renderSubtitleOverlaySvg(cue.text));
      await svgToPng(subtitleSvg, subtitlePngs[index]!, 1080, 1920);
    }
  });

  await stage("voice", [paths.audio], async () => {
    if (drawing.voiceScript.provider !== "macos-say") {
      throw new Error(`Provider TTS "${drawing.voiceScript.provider}" chưa được cài. MVP hỗ trợ macos-say.`);
    }
    await new MacOsSayProvider().synthesize({
      cues: drawing.voiceScript.cues,
      outputFile: paths.audio,
      tempDir: path.join(paths.tempDir, "voice"),
      voice: drawing.voiceScript.voice,
      rate: drawing.voiceScript.rate,
      durationSeconds: drawing.videoMetadata.durationSeconds,
    });
  });

  await stage("video", [paths.video], async () => {
    await renderShort(drawing, paths.baseVideoPng, layerPngs, subtitlePngs, paths.audio, paths.video);
  });

  await stage("thumbnail", [paths.thumbnailSvg, paths.thumbnail], async () => {
    await writeText(paths.thumbnailSvg, renderThumbnailSvg(drawing));
    await svgToPng(paths.thumbnailSvg, paths.thumbnail, 1080, 1920);
  });

  await stage("metadata", [paths.metadata], async () => {
    await writeJson(paths.metadata, generateMetadata(drawing));
  });

  const artifacts = {
    sourceJson: paths.source,
    fullSvg: paths.fullSvg,
    layeredSvg: paths.layeredSvg,
    transparentPng: paths.transparentPng,
    whitePng: paths.whitePng,
    voice: paths.audio,
    subtitles: paths.subtitles,
    shortVideo: paths.video,
    thumbnail: paths.thumbnail,
    metadata: paths.metadata,
  };
  await stage("quality-control", [paths.report], async () => {
    const report = await buildQualityReport(drawing, artifacts, paths.video);
    await writeJson(paths.report, report);
    if (!report.passed) {
      throw new Error(`QC không đạt: ${report.issues.filter((issue) => issue.severity === "error").map((issue) => issue.code).join(", ")}`);
    }
  });

  if (drawing.status === "draft") {
    drawing.status = "generated";
    drawing.updatedAt = new Date().toISOString();
    await writeJson(paths.source, drawing);
    manifest.inputHash = drawingHash(drawing);
    await saveManifest(paths.manifest, manifest);
    log("status", "Chuyển trạng thái draft -> generated. Cần review thủ công trước approved.");
  }
}

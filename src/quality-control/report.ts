import { access, stat } from "node:fs/promises";
import type { Drawing, QualityReport } from "../types/drawing.js";
import { runCommand } from "../shared/command.js";
import { validateDrawing } from "./validator.js";

async function existsAndNotEmpty(file: string): Promise<boolean> {
  try { return (await stat(file)).size > 0; } catch { return false; }
}

export async function buildQualityReport(
  drawing: Drawing,
  artifacts: Record<string, string>,
  videoFile?: string,
): Promise<QualityReport> {
  const artifactChecks: Record<string, boolean> = {};
  for (const [name, file] of Object.entries(artifacts)) artifactChecks[name] = await existsAndNotEmpty(file);
  const issues = validateDrawing(drawing);
  for (const [name, ok] of Object.entries(artifactChecks)) {
    if (!ok) issues.push({ severity: "error", code: "MISSING_ARTIFACT", message: `Artifact thiếu hoặc rỗng: ${name}` });
  }
  let media: QualityReport["media"];
  if (videoFile) {
    try {
      await access(videoFile);
      const raw = await runCommand("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", videoFile], true);
      const probe = JSON.parse(raw) as {
        streams: Array<{ codec_type: string; codec_name?: string; width?: number; height?: number }>;
        format: { duration?: string };
      };
      const video = probe.streams.find((stream) => stream.codec_type === "video");
      const audio = probe.streams.find((stream) => stream.codec_type === "audio");
      const measured: NonNullable<QualityReport["media"]> = {
        durationSeconds: Number(probe.format.duration),
        ...(video?.width !== undefined ? { width: video.width } : {}),
        ...(video?.height !== undefined ? { height: video.height } : {}),
        ...(video?.codec_name !== undefined ? { videoCodec: video.codec_name } : {}),
        ...(audio?.codec_name !== undefined ? { audioCodec: audio.codec_name } : {}),
      };
      media = measured;
      if (measured.width !== 1080 || measured.height !== 1920) issues.push({ severity: "error", code: "VIDEO_SIZE", message: "Video không phải 1080×1920." });
      if (!measured.durationSeconds || measured.durationSeconds < 15 || measured.durationSeconds > 30) issues.push({ severity: "error", code: "VIDEO_DURATION_ACTUAL", message: "Thời lượng video thật ngoài 15–30 giây." });
      if (!audio) issues.push({ severity: "error", code: "AUDIO_STREAM", message: "Video không có audio stream." });
    } catch (error) {
      issues.push({ severity: "error", code: "FFPROBE", message: error instanceof Error ? error.message : String(error) });
    }
  }
  return {
    drawingId: drawing.id,
    generatedAt: new Date().toISOString(),
    passed: !issues.some((issue) => issue.severity === "error"),
    issues,
    artifactChecks,
    ...(media ? { media } : {}),
  };
}

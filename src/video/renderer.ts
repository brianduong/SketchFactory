import type { Drawing } from "../types/drawing.js";
import { runCommand } from "../shared/command.js";
import { ensureParent } from "../shared/fs.js";

export async function svgToPng(svg: string, png: string, width?: number, height?: number): Promise<void> {
  await ensureParent(png);
  const sizeArgs = [
    ...(width ? ["-w", String(width)] : []),
    ...(height ? ["-h", String(height)] : []),
  ];
  await runCommand("rsvg-convert", [...sizeArgs, "-o", png, svg], true);
}

export async function renderShort(
  drawing: Drawing,
  basePng: string,
  layerPngs: string[],
  subtitlePngs: string[],
  audio: string,
  output: string,
): Promise<void> {
  await ensureParent(output);
  const fps = String(drawing.videoMetadata.fps);
  const visualInputs = [basePng, ...layerPngs, ...subtitlePngs].flatMap((file) => ["-loop", "1", "-framerate", fps, "-i", file]);
  const filters: string[] = [];
  let previous = "0:v";
  drawing.strokes.filter((stroke) => stroke.enabled).sort((a, b) => a.order - b.order).forEach((stroke, index) => {
    const inputIndex = index + 1;
    const layer = `layer${index}`;
    const out = `v${index + 1}`;
    const start = stroke.startMs / 1000;
    const duration = Math.max(0.15, stroke.durationMs / 1000);
    filters.push(`[${inputIndex}:v]format=rgba,fade=t=in:st=${start}:d=${duration}:alpha=1[${layer}]`);
    filters.push(`[${previous}][${layer}]overlay=eof_action=pass:format=auto[${out}]`);
    previous = out;
  });
  drawing.voiceScript.cues.forEach((cue, index) => {
    const inputIndex = 1 + layerPngs.length + index;
    const out = `sub${index}`;
    filters.push(`[${previous}][${inputIndex}:v]overlay=eof_action=pass:enable='between(t,${cue.startMs / 1000},${cue.endMs / 1000})'[${out}]`);
    previous = out;
  });
  const final = previous;
  const audioIndex = 1 + layerPngs.length + subtitlePngs.length;
  await runCommand("ffmpeg", [
    "-y",
    ...visualInputs,
    "-i", audio,
    "-filter_complex", filters.join(";"),
    "-map", `[${final}]`,
    "-map", `${audioIndex}:a`,
    "-t", String(drawing.videoMetadata.durationSeconds),
    "-r", fps,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-movflags", "+faststart",
    output,
  ], true);
}

import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "../..");
export const DATA_DIR = path.join(ROOT, "data", "drawings");
export const OUTPUT_DIR = path.join(ROOT, "output");

export function outputPaths(id: string) {
  const drawingDir = path.join(OUTPUT_DIR, "drawings", id);
  return {
    source: path.join(DATA_DIR, `${id}.json`),
    drawingDir,
    fullSvg: path.join(drawingDir, `${id}.svg`),
    layeredSvg: path.join(drawingDir, `${id}-layered.svg`),
    transparentPng: path.join(drawingDir, `${id}-transparent.png`),
    whitePng: path.join(drawingDir, `${id}-white.png`),
    baseVideoPng: path.join(drawingDir, `${id}-video-base.png`),
    layersDir: path.join(drawingDir, "layers"),
    audio: path.join(OUTPUT_DIR, "audio", `${id}.wav`),
    subtitles: path.join(OUTPUT_DIR, "subtitles", `${id}.srt`),
    video: path.join(OUTPUT_DIR, "shorts", `${id}.mp4`),
    thumbnailSvg: path.join(OUTPUT_DIR, "thumbnails", `${id}.svg`),
    thumbnail: path.join(OUTPUT_DIR, "thumbnails", `${id}.png`),
    metadata: path.join(OUTPUT_DIR, "reports", `${id}-metadata.json`),
    report: path.join(OUTPUT_DIR, "reports", `${id}-qc.json`),
    manifest: path.join(OUTPUT_DIR, "manifests", `${id}.json`),
    tempDir: path.join(OUTPUT_DIR, ".tmp", id),
  };
}

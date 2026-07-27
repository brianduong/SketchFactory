import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import type { Drawing } from "../types/drawing.js";
import { readJson, writeJson } from "../shared/fs.js";

export interface PipelineManifest {
  drawingId: string;
  inputHash: string;
  updatedAt: string;
  stages: Record<string, { status: "completed" | "failed"; completedAt: string; outputs: string[]; error?: string }>;
}

const PIPELINE_VERSION = "0.1.1";

export function drawingHash(drawing: Drawing): string {
  return createHash("sha256").update(PIPELINE_VERSION).update(JSON.stringify(drawing)).digest("hex");
}

export async function loadManifest(file: string, drawing: Drawing): Promise<PipelineManifest> {
  try {
    const manifest = await readJson<PipelineManifest>(file);
    if (manifest.inputHash === drawingHash(drawing)) return manifest;
  } catch {
    // Manifest chưa tồn tại hoặc không hợp lệ: tạo mới.
  }
  return { drawingId: drawing.id, inputHash: drawingHash(drawing), updatedAt: new Date().toISOString(), stages: {} };
}

export async function outputsExist(outputs: string[]): Promise<boolean> {
  return (await Promise.all(outputs.map(async (file) => {
    try { await access(file); return true; } catch { return false; }
  }))).every(Boolean);
}

export async function saveManifest(file: string, manifest: PipelineManifest): Promise<void> {
  manifest.updatedAt = new Date().toISOString();
  await writeJson(file, manifest);
}

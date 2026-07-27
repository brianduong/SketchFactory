import { access } from "node:fs/promises";
import type { Drawing } from "../types/drawing.js";
import { readJson, writeJson } from "../shared/fs.js";
import { outputPaths } from "../shared/paths.js";
import { createCatDrawing } from "./cat.js";

export async function planDrawing(subject: string): Promise<Drawing> {
  if (subject.toLowerCase() !== "cat") {
    throw new Error(`MVP chỉ hỗ trợ subject "cat"; đã nhận "${subject}".`);
  }
  const drawing = createCatDrawing();
  const file = outputPaths(drawing.id).source;
  try {
    await access(file);
    return readJson<Drawing>(file);
  } catch {
    await writeJson(file, drawing);
    return drawing;
  }
}

export async function loadDrawing(id: string): Promise<Drawing> {
  try {
    return await readJson<Drawing>(outputPaths(id).source);
  } catch {
    throw new Error(`Không tìm thấy drawing "${id}". Hãy chạy create trước.`);
  }
}

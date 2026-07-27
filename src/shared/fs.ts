import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function ensureParent(file: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
}

export async function writeText(file: string, content: string): Promise<void> {
  await ensureParent(file);
  await writeFile(file, content, "utf8");
}

export async function writeJson(file: string, value: unknown): Promise<void> {
  await writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

export async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

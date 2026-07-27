import { access } from "node:fs/promises";
import type { Drawing } from "../types/drawing.js";
import { readJson, writeJson } from "../shared/fs.js";
import { outputPaths } from "../shared/paths.js";
import { createCatDrawing } from "./cat.js";
import { createBearDrawing } from "./bear.js";
import { createCowDrawing } from "./cow.js";
import { createDogDrawing } from "./dog.js";
import { createElephantDrawing } from "./elephant.js";
import { createFishDrawing } from "./fish.js";
import { createFoxDrawing } from "./fox.js";
import { createFrogDrawing } from "./frog.js";
import { createPandaDrawing } from "./panda.js";
import { createPigDrawing } from "./pig.js";
import { createRabbitDrawing } from "./rabbit.js";
import { createTurtleDrawing } from "./turtle.js";

export async function planDrawing(subject: string): Promise<Drawing> {
  const factories: Record<string, () => Drawing> = {
    bear: createBearDrawing,
    cat: createCatDrawing,
    cow: createCowDrawing,
    dog: createDogDrawing,
    elephant: createElephantDrawing,
    fish: createFishDrawing,
    fox: createFoxDrawing,
    frog: createFrogDrawing,
    panda: createPandaDrawing,
    pig: createPigDrawing,
    rabbit: createRabbitDrawing,
    turtle: createTurtleDrawing,
  };
  const factory = factories[subject.toLowerCase()];
  if (!factory) {
    throw new Error(`Subject chưa được hỗ trợ: "${subject}". Hiện có: ${Object.keys(factories).join(", ")}.`);
  }
  const drawing = factory();
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

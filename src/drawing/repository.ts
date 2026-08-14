import { access } from "node:fs/promises";
import type { Drawing } from "../types/drawing.js";
import { readJson, writeJson } from "../shared/fs.js";
import { outputPaths } from "../shared/paths.js";
import { createCatDrawing } from "./cat.js";
import { createBearDrawing } from "./bear.js";
import { createBeeDrawing } from "./bee.js";
import { createButterflyDrawing } from "./butterfly.js";
import { createCowDrawing } from "./cow.js";
import { createCrabDrawing } from "./crab.js";
import { createDogDrawing } from "./dog.js";
import { createDuckDrawing } from "./duck.js";
import { createElephantDrawing } from "./elephant.js";
import { createFishDrawing } from "./fish.js";
import { createFoxDrawing } from "./fox.js";
import { createFrogDrawing } from "./frog.js";
import { createGiraffeDrawing } from "./giraffe.js";
import { createKoalaDrawing } from "./koala.js";
import { createLionDrawing } from "./lion.js";
import { createMonkeyDrawing } from "./monkey.js";
import { createMouseDrawing } from "./mouse.js";
import { createOctopusDrawing } from "./octopus.js";
import { createOwlDrawing } from "./owl.js";
import { createPandaDrawing } from "./panda.js";
import { createPenguinDrawing } from "./penguin.js";
import { createPigDrawing } from "./pig.js";
import { createRabbitDrawing } from "./rabbit.js";
import { createSheepDrawing } from "./sheep.js";
import { createSnailDrawing } from "./snail.js";
import { createSquirrelDrawing } from "./squirrel.js";
import { createTurtleDrawing } from "./turtle.js";
import { createWhaleDrawing } from "./whale.js";

export async function planDrawing(subject: string): Promise<Drawing> {
  const factories: Record<string, () => Drawing> = {
    bear: createBearDrawing,
    bee: createBeeDrawing,
    butterfly: createButterflyDrawing,
    cat: createCatDrawing,
    cow: createCowDrawing,
    crab: createCrabDrawing,
    dog: createDogDrawing,
    duck: createDuckDrawing,
    elephant: createElephantDrawing,
    fish: createFishDrawing,
    fox: createFoxDrawing,
    frog: createFrogDrawing,
    giraffe: createGiraffeDrawing,
    koala: createKoalaDrawing,
    lion: createLionDrawing,
    monkey: createMonkeyDrawing,
    mouse: createMouseDrawing,
    octopus: createOctopusDrawing,
    owl: createOwlDrawing,
    panda: createPandaDrawing,
    penguin: createPenguinDrawing,
    pig: createPigDrawing,
    rabbit: createRabbitDrawing,
    sheep: createSheepDrawing,
    snail: createSnailDrawing,
    squirrel: createSquirrelDrawing,
    turtle: createTurtleDrawing,
    whale: createWhaleDrawing,
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

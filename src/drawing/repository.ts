import { access } from "node:fs/promises";
import type { Drawing } from "../types/drawing.js";
import { readJson, writeJson } from "../shared/fs.js";
import { outputPaths } from "../shared/paths.js";
import { createCamelDrawing } from "./camel.js";
import { createCatDrawing } from "./cat.js";
import { createBearDrawing } from "./bear.js";
import { createAntDrawing } from "./ant.js";
import { createBatDrawing } from "./bat.js";
import { createBeeDrawing } from "./bee.js";
import { createButterflyDrawing } from "./butterfly.js";
import { createCaterpillarDrawing } from "./caterpillar.js";
import { createCowDrawing } from "./cow.js";
import { createCrocodileDrawing } from "./crocodile.js";
import { createDeerDrawing } from "./deer.js";
import { createCrabDrawing } from "./crab.js";
import { createDogDrawing } from "./dog.js";
import { createDuckDrawing } from "./duck.js";
import { createElephantDrawing } from "./elephant.js";
import { createFishDrawing } from "./fish.js";
import { createFlamingoDrawing } from "./flamingo.js";
import { createFoxDrawing } from "./fox.js";
import { createFrogDrawing } from "./frog.js";
import { createGiraffeDrawing } from "./giraffe.js";
import { createHedgehogDrawing } from "./hedgehog.js";
import { createJellyfishDrawing } from "./jellyfish.js";
import { createKangarooDrawing } from "./kangaroo.js";
import { createKoalaDrawing } from "./koala.js";
import { createLionDrawing } from "./lion.js";
import { createLlamaDrawing } from "./llama.js";
import { createMonkeyDrawing } from "./monkey.js";
import { createMouseDrawing } from "./mouse.js";
import { createOctopusDrawing } from "./octopus.js";
import { createOwlDrawing } from "./owl.js";
import { createPandaDrawing } from "./panda.js";
import { createPenguinDrawing } from "./penguin.js";
import { createPigDrawing } from "./pig.js";
import { createRabbitDrawing } from "./rabbit.js";
import { createRhinoDrawing } from "./rhino.js";
import { createRoosterDrawing } from "./rooster.js";
import { createSheepDrawing } from "./sheep.js";
import { createHorseDrawing } from "./horse.js";
import { createSnailDrawing } from "./snail.js";
import { createSnakeDrawing } from "./snake.js";
import { createSpiderDrawing } from "./spider.js";
import { createSquirrelDrawing } from "./squirrel.js";
import { createStarfishDrawing } from "./starfish.js";
import { createStegosaurusDrawing } from "./stegosaurus.js";
import { createSwanDrawing } from "./swan.js";
import { createToucanDrawing } from "./toucan.js";
import { createTrexDrawing } from "./trex.js";
import { createTurtleDrawing } from "./turtle.js";
import { createUnicornDrawing } from "./unicorn.js";
import { createWhaleDrawing } from "./whale.js";
import { createZebraDrawing } from "./zebra.js";
import { createSeahorseDrawing } from "./seahorse.js";
import { createPeacockDrawing } from "./peacock.js";
import { createLadybugDrawing } from "./ladybug.js";
import { createDragonflyDrawing } from "./dragonfly.js";
import { createScorpionDrawing } from "./scorpion.js";
import { createPufferfishDrawing } from "./pufferfish.js";
import { createPlatypusDrawing } from "./platypus.js";
import { createSlothDrawing } from "./sloth.js";
import { createBeaverDrawing } from "./beaver.js";
import { createWalrusDrawing } from "./walrus.js";

export async function planDrawing(subject: string): Promise<Drawing> {
  const factories: Record<string, () => Drawing> = {
    seahorse: createSeahorseDrawing,
    peacock: createPeacockDrawing,
    ladybug: createLadybugDrawing,
    dragonfly: createDragonflyDrawing,
    scorpion: createScorpionDrawing,
    pufferfish: createPufferfishDrawing,
    platypus: createPlatypusDrawing,
    sloth: createSlothDrawing,
    beaver: createBeaverDrawing,
    walrus: createWalrusDrawing,
    ant: createAntDrawing,
    bat: createBatDrawing,
    bear: createBearDrawing,
    bee: createBeeDrawing,
    butterfly: createButterflyDrawing,
    camel: createCamelDrawing,
    cat: createCatDrawing,
    caterpillar: createCaterpillarDrawing,
    cow: createCowDrawing,
    crab: createCrabDrawing,
    crocodile: createCrocodileDrawing,
    deer: createDeerDrawing,
    dog: createDogDrawing,
    duck: createDuckDrawing,
    elephant: createElephantDrawing,
    fish: createFishDrawing,
    flamingo: createFlamingoDrawing,
    fox: createFoxDrawing,
    frog: createFrogDrawing,
    giraffe: createGiraffeDrawing,
    hedgehog: createHedgehogDrawing,
    jellyfish: createJellyfishDrawing,
    kangaroo: createKangarooDrawing,
    horse: createHorseDrawing,
    koala: createKoalaDrawing,
    lion: createLionDrawing,
    llama: createLlamaDrawing,
    monkey: createMonkeyDrawing,
    mouse: createMouseDrawing,
    octopus: createOctopusDrawing,
    owl: createOwlDrawing,
    panda: createPandaDrawing,
    penguin: createPenguinDrawing,
    pig: createPigDrawing,
    rabbit: createRabbitDrawing,
    rhino: createRhinoDrawing,
    rooster: createRoosterDrawing,
    sheep: createSheepDrawing,
    snail: createSnailDrawing,
    snake: createSnakeDrawing,
    spider: createSpiderDrawing,
    squirrel: createSquirrelDrawing,
    starfish: createStarfishDrawing,
    stegosaurus: createStegosaurusDrawing,
    swan: createSwanDrawing,
    toucan: createToucanDrawing,
    trex: createTrexDrawing,
    turtle: createTurtleDrawing,
    unicorn: createUnicornDrawing,
    whale: createWhaleDrawing,
    zebra: createZebraDrawing,
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

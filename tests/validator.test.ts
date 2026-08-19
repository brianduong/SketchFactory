import { describe, expect, it } from "vitest";
import { createBearDrawing } from "../src/drawing/bear.js";
import { createAntDrawing } from "../src/drawing/ant.js";
import { createBatDrawing } from "../src/drawing/bat.js";
import { createBeeDrawing } from "../src/drawing/bee.js";
import { createButterflyDrawing } from "../src/drawing/butterfly.js";
import { createCamelDrawing } from "../src/drawing/camel.js";
import { createCatDrawing } from "../src/drawing/cat.js";
import { createCaterpillarDrawing } from "../src/drawing/caterpillar.js";
import { createCowDrawing } from "../src/drawing/cow.js";
import { createCrocodileDrawing } from "../src/drawing/crocodile.js";
import { createDeerDrawing } from "../src/drawing/deer.js";
import { createCrabDrawing } from "../src/drawing/crab.js";
import { createDogDrawing } from "../src/drawing/dog.js";
import { createDuckDrawing } from "../src/drawing/duck.js";
import { createElephantDrawing } from "../src/drawing/elephant.js";
import { createFishDrawing } from "../src/drawing/fish.js";
import { createFlamingoDrawing } from "../src/drawing/flamingo.js";
import { createFoxDrawing } from "../src/drawing/fox.js";
import { createFrogDrawing } from "../src/drawing/frog.js";
import { createGiraffeDrawing } from "../src/drawing/giraffe.js";
import { createHedgehogDrawing } from "../src/drawing/hedgehog.js";
import { createJellyfishDrawing } from "../src/drawing/jellyfish.js";
import { createKangarooDrawing } from "../src/drawing/kangaroo.js";
import { createKoalaDrawing } from "../src/drawing/koala.js";
import { createLionDrawing } from "../src/drawing/lion.js";
import { createLlamaDrawing } from "../src/drawing/llama.js";
import { createMonkeyDrawing } from "../src/drawing/monkey.js";
import { createMouseDrawing } from "../src/drawing/mouse.js";
import { createOctopusDrawing } from "../src/drawing/octopus.js";
import { createOwlDrawing } from "../src/drawing/owl.js";
import { createPandaDrawing } from "../src/drawing/panda.js";
import { createPenguinDrawing } from "../src/drawing/penguin.js";
import { createPigDrawing } from "../src/drawing/pig.js";
import { createRabbitDrawing } from "../src/drawing/rabbit.js";
import { createRhinoDrawing } from "../src/drawing/rhino.js";
import { createRoosterDrawing } from "../src/drawing/rooster.js";
import { createSheepDrawing } from "../src/drawing/sheep.js";
import { createHorseDrawing } from "../src/drawing/horse.js";
import { createSnailDrawing } from "../src/drawing/snail.js";
import { createSnakeDrawing } from "../src/drawing/snake.js";
import { createSpiderDrawing } from "../src/drawing/spider.js";
import { createSquirrelDrawing } from "../src/drawing/squirrel.js";
import { createStarfishDrawing } from "../src/drawing/starfish.js";
import { createStegosaurusDrawing } from "../src/drawing/stegosaurus.js";
import { createSwanDrawing } from "../src/drawing/swan.js";
import { createToucanDrawing } from "../src/drawing/toucan.js";
import { createTrexDrawing } from "../src/drawing/trex.js";
import { createTurtleDrawing } from "../src/drawing/turtle.js";
import { createUnicornDrawing } from "../src/drawing/unicorn.js";
import { createWhaleDrawing } from "../src/drawing/whale.js";
import { createZebraDrawing } from "../src/drawing/zebra.js";
import { createSeahorseDrawing } from "../src/drawing/seahorse.js";
import { createPeacockDrawing } from "../src/drawing/peacock.js";
import { createLadybugDrawing } from "../src/drawing/ladybug.js";
import { createDragonflyDrawing } from "../src/drawing/dragonfly.js";
import { createScorpionDrawing } from "../src/drawing/scorpion.js";
import { createPufferfishDrawing } from "../src/drawing/pufferfish.js";
import { createPlatypusDrawing } from "../src/drawing/platypus.js";
import { createSlothDrawing } from "../src/drawing/sloth.js";
import { createBeaverDrawing } from "../src/drawing/beaver.js";
import { createWalrusDrawing } from "../src/drawing/walrus.js";
import { validateDrawing } from "../src/quality-control/validator.js";
import { strokeExtent } from "./helpers/stroke-extent.js";

const catalog = [
  ["bear", createBearDrawing],
  ["ant", createAntDrawing],
  ["bat", createBatDrawing],
  ["bee", createBeeDrawing],
  ["butterfly", createButterflyDrawing],
  ["camel", createCamelDrawing],
  ["cat", createCatDrawing],
  ["caterpillar", createCaterpillarDrawing],
  ["cow", createCowDrawing],
  ["crocodile", createCrocodileDrawing],
  ["deer", createDeerDrawing],
  ["crab", createCrabDrawing],
  ["dog", createDogDrawing],
  ["duck", createDuckDrawing],
  ["elephant", createElephantDrawing],
  ["fish", createFishDrawing],
  ["flamingo", createFlamingoDrawing],
  ["fox", createFoxDrawing],
  ["frog", createFrogDrawing],
  ["giraffe", createGiraffeDrawing],
  ["hedgehog", createHedgehogDrawing],
  ["jellyfish", createJellyfishDrawing],
  ["kangaroo", createKangarooDrawing],
  ["horse", createHorseDrawing],
  ["koala", createKoalaDrawing],
  ["lion", createLionDrawing],
  ["llama", createLlamaDrawing],
  ["monkey", createMonkeyDrawing],
  ["mouse", createMouseDrawing],
  ["octopus", createOctopusDrawing],
  ["owl", createOwlDrawing],
  ["panda", createPandaDrawing],
  ["penguin", createPenguinDrawing],
  ["pig", createPigDrawing],
  ["rabbit", createRabbitDrawing],
  ["rhino", createRhinoDrawing],
  ["rooster", createRoosterDrawing],
  ["sheep", createSheepDrawing],
  ["snail", createSnailDrawing],
  ["snake", createSnakeDrawing],
  ["spider", createSpiderDrawing],
  ["squirrel", createSquirrelDrawing],
  ["starfish", createStarfishDrawing],
  ["stegosaurus", createStegosaurusDrawing],
  ["swan", createSwanDrawing],
  ["toucan", createToucanDrawing],
  ["trex", createTrexDrawing],
  ["turtle", createTurtleDrawing],
  ["unicorn", createUnicornDrawing],
  ["whale", createWhaleDrawing],
  ["zebra", createZebraDrawing],
  ["seahorse", createSeahorseDrawing],
  ["peacock", createPeacockDrawing],
  ["ladybug", createLadybugDrawing],
  ["dragonfly", createDragonflyDrawing],
  ["scorpion", createScorpionDrawing],
  ["pufferfish", createPufferfishDrawing],
  ["platypus", createPlatypusDrawing],
  ["sloth", createSlothDrawing],
  ["beaver", createBeaverDrawing],
  ["walrus", createWalrusDrawing],
] as const;

describe("validateDrawing", () => {
  it("accepts the canonical cat drawing", () => {
    const errors = validateDrawing(createCatDrawing()).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
  });

  it("accepts the canonical dog drawing", () => {
    const errors = validateDrawing(createDogDrawing()).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
  });

  it("accepts the canonical rabbit drawing", () => {
    const errors = validateDrawing(createRabbitDrawing()).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
  });

  it.each(catalog)("accepts the canonical %s drawing", (_name, factory) => {
    const errors = validateDrawing(factory()).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
  });

  it.each(catalog)("keeps every declared bound around the real %s geometry", (_name, factory) => {
    const drawing = factory();
    for (const stroke of drawing.strokes.filter((candidate) => candidate.enabled)) {
      const extent = strokeExtent(stroke);
      const bounds = stroke.bounds;
      expect(bounds.x, `${stroke.id} left`).toBeLessThanOrEqual(extent.minX);
      expect(bounds.y, `${stroke.id} top`).toBeLessThanOrEqual(extent.minY);
      expect(bounds.x + bounds.width, `${stroke.id} right`).toBeGreaterThanOrEqual(extent.maxX);
      expect(bounds.y + bounds.height, `${stroke.id} bottom`).toBeGreaterThanOrEqual(extent.maxY);
    }
  });

  it("detects a wrong stroke count", () => {
    const drawing = createCatDrawing();
    drawing.strokeCount = 7;
    expect(validateDrawing(drawing).some((issue) => issue.code === "STROKE_COUNT")).toBe(true);
  });

  it("detects a stroke outside the safe area", () => {
    const drawing = createCatDrawing();
    drawing.strokes[0]!.bounds.x = 50;
    expect(validateDrawing(drawing).some((issue) => issue.code === "SAFE_AREA")).toBe(true);
  });

  it("keeps the cat tutorial slow enough to follow", () => {
    const drawing = createCatDrawing();
    const enabled = drawing.strokes.filter((stroke) => stroke.enabled);
    const drawingStart = Math.min(...enabled.map((stroke) => stroke.startMs));
    const drawingEnd = Math.max(...enabled.map((stroke) => stroke.startMs + stroke.durationMs));
    expect(drawingEnd - drawingStart).toBeGreaterThanOrEqual(18_000);
    expect(drawing.videoMetadata.durationSeconds).toBeGreaterThanOrEqual(28);
    expect(drawing.videoMetadata.durationSeconds).toBeLessThanOrEqual(30);
  });

  it("rejects multiple disconnected paths bundled into one stroke", () => {
    const drawing = createCatDrawing();
    drawing.strokes[0]!.geometry = "path";
    drawing.strokes[0]!.vector = { d: "M100 100 L200 200 M300 300 L400 400" };
    expect(validateDrawing(drawing).some((issue) => issue.code === "COMPLEX_STROKE")).toBe(true);
  });
});

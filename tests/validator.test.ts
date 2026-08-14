import { describe, expect, it } from "vitest";
import { createBearDrawing } from "../src/drawing/bear.js";
import { createBeeDrawing } from "../src/drawing/bee.js";
import { createButterflyDrawing } from "../src/drawing/butterfly.js";
import { createCatDrawing } from "../src/drawing/cat.js";
import { createCowDrawing } from "../src/drawing/cow.js";
import { createCrabDrawing } from "../src/drawing/crab.js";
import { createDogDrawing } from "../src/drawing/dog.js";
import { createDuckDrawing } from "../src/drawing/duck.js";
import { createElephantDrawing } from "../src/drawing/elephant.js";
import { createFishDrawing } from "../src/drawing/fish.js";
import { createFoxDrawing } from "../src/drawing/fox.js";
import { createFrogDrawing } from "../src/drawing/frog.js";
import { createGiraffeDrawing } from "../src/drawing/giraffe.js";
import { createKoalaDrawing } from "../src/drawing/koala.js";
import { createLionDrawing } from "../src/drawing/lion.js";
import { createMonkeyDrawing } from "../src/drawing/monkey.js";
import { createMouseDrawing } from "../src/drawing/mouse.js";
import { createOctopusDrawing } from "../src/drawing/octopus.js";
import { createOwlDrawing } from "../src/drawing/owl.js";
import { createPandaDrawing } from "../src/drawing/panda.js";
import { createPenguinDrawing } from "../src/drawing/penguin.js";
import { createPigDrawing } from "../src/drawing/pig.js";
import { createRabbitDrawing } from "../src/drawing/rabbit.js";
import { createSheepDrawing } from "../src/drawing/sheep.js";
import { createSnailDrawing } from "../src/drawing/snail.js";
import { createSquirrelDrawing } from "../src/drawing/squirrel.js";
import { createTurtleDrawing } from "../src/drawing/turtle.js";
import { createWhaleDrawing } from "../src/drawing/whale.js";
import { validateDrawing } from "../src/quality-control/validator.js";
import { strokeExtent } from "./helpers/stroke-extent.js";

const catalog = [
  ["bear", createBearDrawing],
  ["bee", createBeeDrawing],
  ["butterfly", createButterflyDrawing],
  ["cat", createCatDrawing],
  ["cow", createCowDrawing],
  ["crab", createCrabDrawing],
  ["dog", createDogDrawing],
  ["duck", createDuckDrawing],
  ["elephant", createElephantDrawing],
  ["fish", createFishDrawing],
  ["fox", createFoxDrawing],
  ["frog", createFrogDrawing],
  ["giraffe", createGiraffeDrawing],
  ["koala", createKoalaDrawing],
  ["lion", createLionDrawing],
  ["monkey", createMonkeyDrawing],
  ["mouse", createMouseDrawing],
  ["octopus", createOctopusDrawing],
  ["owl", createOwlDrawing],
  ["panda", createPandaDrawing],
  ["penguin", createPenguinDrawing],
  ["pig", createPigDrawing],
  ["rabbit", createRabbitDrawing],
  ["sheep", createSheepDrawing],
  ["snail", createSnailDrawing],
  ["squirrel", createSquirrelDrawing],
  ["turtle", createTurtleDrawing],
  ["whale", createWhaleDrawing],
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

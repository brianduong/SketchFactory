import { describe, expect, it } from "vitest";
import { createBearDrawing } from "../src/drawing/bear.js";
import { createCatDrawing } from "../src/drawing/cat.js";
import { createCowDrawing } from "../src/drawing/cow.js";
import { createDogDrawing } from "../src/drawing/dog.js";
import { createElephantDrawing } from "../src/drawing/elephant.js";
import { createFishDrawing } from "../src/drawing/fish.js";
import { createFoxDrawing } from "../src/drawing/fox.js";
import { createFrogDrawing } from "../src/drawing/frog.js";
import { createPandaDrawing } from "../src/drawing/panda.js";
import { createPigDrawing } from "../src/drawing/pig.js";
import { createRabbitDrawing } from "../src/drawing/rabbit.js";
import { createTurtleDrawing } from "../src/drawing/turtle.js";
import { validateDrawing } from "../src/quality-control/validator.js";

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

  it.each([
    ["bear", createBearDrawing],
    ["cow", createCowDrawing],
    ["elephant", createElephantDrawing],
    ["fish", createFishDrawing],
    ["fox", createFoxDrawing],
    ["frog", createFrogDrawing],
    ["panda", createPandaDrawing],
    ["pig", createPigDrawing],
    ["turtle", createTurtleDrawing],
  ])("accepts the canonical %s drawing", (_name, factory) => {
    const errors = validateDrawing(factory()).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
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

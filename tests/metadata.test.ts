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
import { generateMetadata } from "../src/metadata/engine.js";

describe("metadata positioning", () => {
  it("keeps public copy general-audience rather than child-directed", () => {
    const text = JSON.stringify(generateMetadata(createCatDrawing())).toLowerCase();
    expect(text).not.toContain("adult");
    expect(text).not.toContain("drawingforkids");
    expect(text).not.toMatch(/\b(kid|kids|child|children|parent|parents|preschool)\b/);
  });

  it("generates neutral English metadata for the dog", () => {
    const text = JSON.stringify(generateMetadata(createDogDrawing())).toLowerCase();
    expect(text).toContain("how to draw a dog");
    expect(text).toContain("9 simple strokes");
    expect(text).not.toContain("adult");
    expect(text).not.toContain("drawingforkids");
  });

  it("generates neutral English metadata for the rabbit", () => {
    const text = JSON.stringify(generateMetadata(createRabbitDrawing())).toLowerCase();
    expect(text).toContain("how to draw a rabbit");
    expect(text).toContain("9 simple strokes");
    expect(text).not.toContain("adult");
    expect(text).not.toContain("drawingforkids");
  });

  it.each([
    ["bear", "Bear", 9, createBearDrawing],
    ["cow", "Cow", 10, createCowDrawing],
    ["elephant", "Elephant", 10, createElephantDrawing],
    ["fish", "Fish", 9, createFishDrawing],
    ["fox", "Fox", 9, createFoxDrawing],
    ["frog", "Frog", 8, createFrogDrawing],
    ["panda", "Panda", 10, createPandaDrawing],
    ["pig", "Pig", 9, createPigDrawing],
    ["turtle", "Turtle", 9, createTurtleDrawing],
  ])("generates neutral English metadata for the %s", (subject, displayName, strokeCount, factory) => {
    const text = JSON.stringify(generateMetadata(factory())).toLowerCase();
    const article = /^[aeiou]/i.test(subject) ? "an" : "a";
    expect(text).toContain(`how to draw ${article} ${subject}`);
    expect(text).toContain(`how to draw ${article} ${displayName.toLowerCase()} in ${strokeCount} simple strokes`);
    expect(text).not.toContain("adult");
    expect(text).not.toContain("drawingforkids");
  });
});

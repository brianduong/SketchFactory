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
import { renderThumbnailSvg } from "../src/thumbnail/engine.js";

describe("thumbnail engine", () => {
  it("uses the drawing name instead of a hard-coded subject", () => {
    expect(renderThumbnailSvg(createCatDrawing())).toContain("DRAW A CAT");
    expect(renderThumbnailSvg(createDogDrawing())).toContain("DRAW A DOG");
    expect(renderThumbnailSvg(createRabbitDrawing())).toContain("DRAW A RABBIT");
    expect(renderThumbnailSvg(createBearDrawing())).toContain("DRAW A BEAR");
    expect(renderThumbnailSvg(createFoxDrawing())).toContain("DRAW A FOX");
    expect(renderThumbnailSvg(createPandaDrawing())).toContain("DRAW A PANDA");
    expect(renderThumbnailSvg(createCowDrawing())).toContain("DRAW A COW");
    expect(renderThumbnailSvg(createFishDrawing())).toContain("DRAW A FISH");
    expect(renderThumbnailSvg(createFrogDrawing())).toContain("DRAW A FROG");
    expect(renderThumbnailSvg(createPigDrawing())).toContain("DRAW A PIG");
    expect(renderThumbnailSvg(createTurtleDrawing())).toContain("DRAW A TURTLE");
    expect(renderThumbnailSvg(createElephantDrawing())).toContain("DRAW AN ELEPHANT");
  });
});

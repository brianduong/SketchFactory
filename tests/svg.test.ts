import { describe, expect, it } from "vitest";
import { createBearDrawing } from "../src/drawing/bear.js";
import { createCatDrawing } from "../src/drawing/cat.js";
import { createCowDrawing } from "../src/drawing/cow.js";
import { createDogDrawing } from "../src/drawing/dog.js";
import { createFishDrawing } from "../src/drawing/fish.js";
import { createFoxDrawing } from "../src/drawing/fox.js";
import { createFrogDrawing } from "../src/drawing/frog.js";
import { createPandaDrawing } from "../src/drawing/panda.js";
import { createPigDrawing } from "../src/drawing/pig.js";
import { createRabbitDrawing } from "../src/drawing/rabbit.js";
import { renderDrawingSvg, renderLayeredSvg, renderVideoBase } from "../src/svg/engine.js";

describe("SVG engine", () => {
  it("renders all enabled stroke ids", () => {
    const drawing = createCatDrawing();
    const svg = renderDrawingSvg(drawing);
    for (const stroke of drawing.strokes) expect(svg).toContain(`id="${stroke.id}"`);
  });

  it("keeps timing metadata in layered SVG", () => {
    const svg = renderLayeredSvg(createCatDrawing());
    expect(svg).toContain('data-start-ms="3000"');
    expect(svg).toContain('data-duration-ms="2400"');
    expect(svg).toContain('id="layer-09-left-whisker"');
    expect(svg).toContain('id="layer-10-right-whisker"');
  });

  it("wraps the video hook into two mobile-safe lines", () => {
    const svg = renderVideoBase(createCatDrawing());
    expect(svg).toContain('font-size="44"');
    expect(svg.match(/<tspan /g)).toHaveLength(2);
    expect(svg).toContain("Can you draw a cat");
    expect(svg).toContain("in just ten strokes?");
  });

  it("renders every dog stroke as a separate layer", () => {
    const drawing = createDogDrawing();
    const svg = renderLayeredSvg(drawing);
    for (const stroke of drawing.strokes) expect(svg).toContain(`id="layer-${stroke.id}"`);
  });

  it("renders every rabbit stroke as a separate layer", () => {
    const drawing = createRabbitDrawing();
    const svg = renderLayeredSvg(drawing);
    for (const stroke of drawing.strokes) expect(svg).toContain(`id="layer-${stroke.id}"`);
  });

  it.each([
    ["bear", createBearDrawing],
    ["cow", createCowDrawing],
    ["fish", createFishDrawing],
    ["fox", createFoxDrawing],
    ["frog", createFrogDrawing],
    ["panda", createPandaDrawing],
    ["pig", createPigDrawing],
  ])("renders every %s stroke as a separate layer", (_name, factory) => {
    const drawing = factory();
    const svg = renderLayeredSvg(drawing);
    for (const stroke of drawing.strokes) expect(svg).toContain(`id="layer-${stroke.id}"`);
  });
});

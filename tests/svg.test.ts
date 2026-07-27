import { describe, expect, it } from "vitest";
import { createCatDrawing } from "../src/drawing/cat.js";
import { renderDrawingSvg, renderLayeredSvg } from "../src/svg/engine.js";

describe("SVG engine", () => {
  it("renders all enabled stroke ids", () => {
    const drawing = createCatDrawing();
    const svg = renderDrawingSvg(drawing);
    for (const stroke of drawing.strokes) expect(svg).toContain(`id="${stroke.id}"`);
  });

  it("keeps timing metadata in layered SVG", () => {
    const svg = renderLayeredSvg(createCatDrawing());
    expect(svg).toContain('data-start-ms="2600"');
    expect(svg).toContain('id="layer-08-whiskers"');
  });
});

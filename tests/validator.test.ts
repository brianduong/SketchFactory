import { describe, expect, it } from "vitest";
import { createCatDrawing } from "../src/drawing/cat.js";
import { validateDrawing } from "../src/quality-control/validator.js";

describe("validateDrawing", () => {
  it("accepts the canonical cat drawing", () => {
    const errors = validateDrawing(createCatDrawing()).filter((issue) => issue.severity === "error");
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
});

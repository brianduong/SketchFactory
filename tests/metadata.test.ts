import { describe, expect, it } from "vitest";
import { createCatDrawing } from "../src/drawing/cat.js";
import { generateMetadata } from "../src/metadata/engine.js";

describe("metadata positioning", () => {
  it("keeps public copy general-audience rather than child-directed", () => {
    const text = JSON.stringify(generateMetadata(createCatDrawing())).toLowerCase();
    expect(text).toContain("adults");
    expect(text).not.toMatch(/\b(kid|kids|child|children|parent|parents|preschool)\b/);
  });
});

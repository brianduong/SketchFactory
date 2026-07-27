import { describe, expect, it } from "vitest";
import { renderSrt } from "../src/subtitle/engine.js";

describe("subtitle engine", () => {
  it("formats SRT timestamps", () => {
    expect(renderSrt([{ id: "a", startMs: 200, endMs: 2200, text: "Hello" }]))
      .toBe("1\n00:00:00,200 --> 00:00:02,200\nHello\n");
  });
});

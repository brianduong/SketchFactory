import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-19T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 520, cy: 520, rx: 190, ry: 120 },
    bounds: { x: 330, y: 400, width: 380, height: 240 },
    startMs: 3000, durationMs: 3000, stepId: "step-1",
    voiceDescription: "Draw one wide oval for the body.", enabled: true,
  },
  {
    id: "02-bill", name: "Draw the bill", order: 2, geometry: "ellipse",
    vector: { cx: 300, cy: 508, rx: 105, ry: 46 },
    bounds: { x: 195, y: 462, width: 210, height: 92 },
    style: { fill: "#FFFDF7" },
    startMs: 6300, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add a flat bill at the front.", enabled: true,
  },
  {
    id: "03-bill-line", name: "Bill line", order: 3, geometry: "line",
    vector: { x1: 235, y1: 508, x2: 360, y2: 508 },
    bounds: { x: 235, y: 496, width: 125, height: 24 },
    startMs: 8900, durationMs: 1400, stepId: "step-2",
    voiceDescription: "Draw one line across the bill.", enabled: true,
  },
  {
    id: "04-tail", name: "Draw the tail", order: 4, geometry: "ellipse",
    vector: { cx: 780, cy: 590, rx: 90, ry: 50 },
    bounds: { x: 690, y: 540, width: 180, height: 100 },
    style: { fill: "#FFFDF7" },
    startMs: 10600, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Add a flat tail at the back.", enabled: true,
  },
  {
    id: "05-tail-line", name: "Tail line", order: 5, geometry: "line",
    vector: { x1: 715, y1: 560, x2: 840, y2: 620 },
    bounds: { x: 715, y: 560, width: 125, height: 60 },
    startMs: 13200, durationMs: 1400, stepId: "step-3",
    voiceDescription: "Draw one line across the tail.", enabled: true,
  },
  {
    id: "06-eye", name: "Draw the eye", order: 6, geometry: "circle",
    vector: { cx: 425, cy: 452, r: 18 },
    bounds: { x: 407, y: 434, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14900, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Add one small round eye.", enabled: true,
  },
  {
    id: "07-foot-front", name: "Front foot", order: 7, geometry: "path",
    vector: { d: "M430 638 C405 700 450 715 480 660" },
    bounds: { x: 405, y: 638, width: 75, height: 77 },
    startMs: 16600, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Add one webbed foot.", enabled: true,
  },
  {
    id: "08-foot-back", name: "Back foot", order: 8, geometry: "path",
    vector: { d: "M610 638 C585 700 630 715 660 660" },
    bounds: { x: 585, y: 638, width: 75, height: 77 },
    startMs: 19200, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Finish with the second foot.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Draw one wide oval for the body." },
  { id: "step-2", order: 2, title: "Bill", strokeIds: ["02-bill", "03-bill-line"], voiceText: "Add a flat bill at the front with one line across." },
  { id: "step-3", order: 3, title: "Tail", strokeIds: ["04-tail", "05-tail-line"], voiceText: "Add a flat tail at the back with one line across." },
  { id: "step-4", order: 4, title: "Face and feet", strokeIds: ["06-eye", "07-foot-front", "08-foot-back"], voiceText: "Finish with one eye and two webbed feet." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a platypus in just eight strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6200, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6200, endMs: 10500, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10500, endMs: 14800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14800, endMs: 21700, text: steps[3]!.voiceText },
  { id: "result", startMs: 21900, endMs: 24100, text: "It's a platypus!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createPlatypusDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "58-animal-platypus-001", slug: "easy-platypus",
    name: { en: "Platypus", vi: "Con thú mỏ vịt" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 8, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["platypus", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a platypus in just eight strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 430, cy: 640, rx: 240, ry: 130 },
    bounds: { x: 190, y: 510, width: 480, height: 260 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2600, stepId: "step-1",
    voiceDescription: "Start with one wide oval body.", enabled: true,
  },
  {
    id: "02-neck-back", name: "Draw the back of the neck", order: 2, geometry: "path",
    vector: { d: "M520 545 C660 520 690 290 570 230" },
    bounds: { x: 520, y: 230, width: 170, height: 315 },
    startMs: 5900, durationMs: 2800, stepId: "step-2",
    voiceDescription: "Curve one long neck up and over.", enabled: true,
  },
  {
    id: "03-neck-front", name: "Draw the front of the neck", order: 3, geometry: "path",
    vector: { d: "M440 540 C580 515 610 285 490 225" },
    bounds: { x: 440, y: 225, width: 170, height: 315 },
    startMs: 9000, durationMs: 2600, stepId: "step-2",
    voiceDescription: "Draw a second curve beside it.", enabled: true,
  },
  {
    id: "04-head", name: "Draw the head", order: 4, geometry: "ellipse",
    vector: { cx: 520, cy: 215, rx: 82, ry: 66 },
    bounds: { x: 438, y: 149, width: 164, height: 132 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 11900, durationMs: 2200, stepId: "step-3",
    voiceDescription: "Add one small oval head on top.", enabled: true,
  },
  {
    id: "05-beak", name: "Draw the beak", order: 5, geometry: "polygon",
    vector: { points: "450,190 320,225 452,255" },
    bounds: { x: 320, y: 190, width: 132, height: 65 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 14400, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add one pointed beak.", enabled: true,
  },
  {
    id: "06-eye", name: "Draw the eye", order: 6, geometry: "circle",
    vector: { cx: 500, cy: 200, r: 20 },
    bounds: { x: 480, y: 180, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16700, durationMs: 1500, stepId: "step-5",
    voiceDescription: "Give it one round eye.", enabled: true,
  },
  {
    id: "07-wing", name: "Draw the wing", order: 7, geometry: "path",
    vector: { d: "M300 615 C400 545 520 570 570 650" },
    bounds: { x: 300, y: 545, width: 270, height: 105 },
    startMs: 18500, durationMs: 2600, stepId: "step-6",
    voiceDescription: "Draw one curve inside for the wing.", enabled: true,
  },
  {
    id: "08-water", name: "Draw the water", order: 8, geometry: "path",
    vector: { d: "M170 790 Q500 850 830 790" },
    bounds: { x: 170, y: 790, width: 660, height: 60 },
    startMs: 21400, durationMs: 2400, stepId: "step-7",
    voiceDescription: "Finish with one long curve for the water.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one wide oval body." },
  { id: "step-2", order: 2, title: "Neck", strokeIds: ["02-neck-back", "03-neck-front"], voiceText: "Draw two curves for the long bent neck." },
  { id: "step-3", order: 3, title: "Head", strokeIds: ["04-head"], voiceText: "Add one small oval head on top." },
  { id: "step-4", order: 4, title: "Beak", strokeIds: ["05-beak"], voiceText: "Add one pointed beak." },
  { id: "step-5", order: 5, title: "Eye", strokeIds: ["06-eye"], voiceText: "Give it one round eye." },
  { id: "step-6", order: 6, title: "Wing", strokeIds: ["07-wing"], voiceText: "Draw one curve inside for the wing." },
  { id: "step-7", order: 7, title: "Water", strokeIds: ["08-water"], voiceText: "Finish with one long curve for the water." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a swan in just eight strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 11800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11800, endMs: 14300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14300, endMs: 16600, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 16600, endMs: 18400, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 18400, endMs: 21300, text: steps[5]!.voiceText },
  { id: "step-7", startMs: 21300, endMs: 24000, text: steps[6]!.voiceText },
  { id: "result", startMs: 24300, endMs: 26300, text: "It's a swan!" },
  { id: "cta", startMs: 26500, endMs: 28900, text: "Great job! Try it yourself." },
];

export function createSwanDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "42-animal-swan-001", slug: "easy-swan",
    name: { en: "Swan", vi: "Con thiên nga" }, category: "animals", subcategory: "birds",
    difficulty: 1, strokeCount: 8, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["swan", "animal", "bird", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a swan in just eight strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

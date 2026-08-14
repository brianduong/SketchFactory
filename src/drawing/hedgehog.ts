import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-spikes", name: "Draw the spiky back", order: 1, geometry: "polygon",
    vector: { points: "230,690 275,510 325,600 385,470 445,585 505,455 565,575 625,465 685,585 745,495 800,620 820,690" },
    bounds: { x: 230, y: 455, width: 590, height: 235 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 3600, stepId: "step-1",
    voiceDescription: "Draw one big zigzag for the spiky back.", enabled: true,
  },
  {
    id: "02-face", name: "Draw the face", order: 2, geometry: "polygon",
    vector: { points: "260,555 120,635 260,700" },
    bounds: { x: 120, y: 555, width: 140, height: 145 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 6900, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Add one pointed face on the left.", enabled: true,
  },
  {
    id: "03-nose", name: "Add the nose", order: 3, geometry: "circle",
    vector: { cx: 142, cy: 635, r: 24 },
    bounds: { x: 118, y: 611, width: 48, height: 48 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 9600, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Put one round nose on the tip.", enabled: true,
  },
  {
    id: "04-eye", name: "Draw the eye", order: 4, geometry: "circle",
    vector: { cx: 225, cy: 610, r: 20 },
    bounds: { x: 205, y: 590, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11500, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add one round eye.", enabled: true,
  },
  {
    id: "05-left-foot", name: "Draw the left foot", order: 5, geometry: "path",
    vector: { d: "M305 690 Q355 768 405 690" },
    bounds: { x: 305, y: 690, width: 100, height: 78 },
    startMs: 13400, durationMs: 2200, stepId: "step-4",
    voiceDescription: "Add one little foot under the belly.", enabled: true,
  },
  {
    id: "06-right-foot", name: "Draw the right foot", order: 6, geometry: "path",
    vector: { d: "M605 690 Q655 768 705 690" },
    bounds: { x: 605, y: 690, width: 100, height: 78 },
    startMs: 16000, durationMs: 2200, stepId: "step-4",
    voiceDescription: "Finish with the second little foot.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Spikes", strokeIds: ["01-spikes"], voiceText: "Draw one big zigzag for the spiky back." },
  { id: "step-2", order: 2, title: "Face", strokeIds: ["02-face"], voiceText: "Add one pointed face on the left." },
  { id: "step-3", order: 3, title: "Nose and eye", strokeIds: ["03-nose", "04-eye"], voiceText: "Put one round nose on the tip and one round eye." },
  { id: "step-4", order: 4, title: "Feet", strokeIds: ["05-left-foot", "06-right-foot"], voiceText: "Finish with two little feet under the belly." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a hedgehog in just six strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6800, endMs: 9500, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9500, endMs: 13300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 13300, endMs: 18400, text: steps[3]!.voiceText },
  { id: "result", startMs: 19000, endMs: 21400, text: "It's a hedgehog!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createHedgehogDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "36-animal-hedgehog-001", slug: "easy-hedgehog",
    name: { en: "Hedgehog", vi: "Con nhím" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 6, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["hedgehog", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a hedgehog in just six strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

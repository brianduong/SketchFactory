import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-hull", name: "Draw the hull", order: 1, geometry: "polygon",
    vector: { points: "220,700 780,700 690,830 310,830" },
    bounds: { x: 220, y: 700, width: 560, height: 130 },
    startMs: 3000, durationMs: 2700, stepId: "step-1",
    voiceDescription: "Draw the boat at the bottom.", enabled: true,
  },
  {
    id: "02-mast", name: "Draw the mast", order: 2, geometry: "line",
    vector: { x1: 500, y1: 200, x2: 500, y2: 700 },
    bounds: { x: 490, y: 200, width: 20, height: 500 },
    startMs: 6000, durationMs: 2700, stepId: "step-2",
    voiceDescription: "Draw a tall mast in the middle.", enabled: true,
  },
  {
    id: "03-big-sail", name: "Big sail", order: 3, geometry: "polygon",
    vector: { points: "520,230 520,660 790,660" },
    bounds: { x: 520, y: 230, width: 270, height: 430 },
    startMs: 9000, durationMs: 2700, stepId: "step-3",
    voiceDescription: "Add a big sail on the right.", enabled: true,
  },
  {
    id: "04-small-sail", name: "Small sail", order: 4, geometry: "polygon",
    vector: { points: "480,260 480,660 260,660" },
    bounds: { x: 260, y: 260, width: 220, height: 400 },
    startMs: 12000, durationMs: 2700, stepId: "step-4",
    voiceDescription: "Add a smaller sail on the left.", enabled: true,
  },
  {
    id: "05-wave-left", name: "First wave", order: 5, geometry: "path",
    vector: { d: "M180 875 C280 845 380 895 480 875" },
    bounds: { x: 180, y: 845, width: 300, height: 50 },
    startMs: 15000, durationMs: 2700, stepId: "step-5",
    voiceDescription: "Draw a wave under the boat.", enabled: true,
  },
  {
    id: "06-wave-right", name: "Second wave", order: 6, geometry: "path",
    vector: { d: "M520 875 C620 845 720 895 820 875" },
    bounds: { x: 520, y: 845, width: 300, height: 50 },
    startMs: 18000, durationMs: 2700, stepId: "step-5",
    voiceDescription: "Finish with a second wave.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Hull", strokeIds: ["01-hull"], voiceText: "Draw the boat at the bottom." },
  { id: "step-2", order: 2, title: "Mast", strokeIds: ["02-mast"], voiceText: "Draw a tall mast in the middle." },
  { id: "step-3", order: 3, title: "Big sail", strokeIds: ["03-big-sail"], voiceText: "Add a big sail on the right." },
  { id: "step-4", order: 4, title: "Small sail", strokeIds: ["04-small-sail"], voiceText: "Add a smaller sail on the left." },
  { id: "step-5", order: 5, title: "Waves", strokeIds: ["05-wave-left", "06-wave-right"], voiceText: "Finish with two waves under the boat." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw a sailboat in just six strokes?" },
  { id: "step-1", startMs: 2800, endMs: 5800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 8800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8800, endMs: 11800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 11800, endMs: 14800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 14800, endMs: 20900, text: steps[4]!.voiceText },
  { id: "result", startMs: 21100, endMs: 23300, text: "It's a sailboat!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createSailboatDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "64-object-sailboat-001", slug: "easy-sailboat",
    name: { en: "Sailboat", vi: "Thuyền buồm" }, category: "objects", subcategory: "vehicle",
    difficulty: 1, strokeCount: 6, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["sailboat", "boat", "object", "vehicle", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a sailboat in just six strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

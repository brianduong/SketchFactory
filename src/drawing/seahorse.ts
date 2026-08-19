import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-19T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head", name: "Draw the head", order: 1, geometry: "ellipse",
    vector: { cx: 505, cy: 250, rx: 58, ry: 50 },
    bounds: { x: 447, y: 200, width: 116, height: 100 },
    startMs: 3000, durationMs: 1800, stepId: "step-1",
    voiceDescription: "Draw a small oval for the head.", enabled: true,
  },
  {
    id: "02-snout", name: "Draw the snout", order: 2, geometry: "line",
    vector: { x1: 555, y1: 268, x2: 655, y2: 300 },
    bounds: { x: 555, y: 268, width: 100, height: 32 },
    startMs: 5100, durationMs: 1100, stepId: "step-1",
    voiceDescription: "Add a long snout pointing out.", enabled: true,
  },
  {
    id: "03-back", name: "Draw the back", order: 3, geometry: "path",
    vector: { d: "M545 305 C640 400 620 570 505 650" },
    bounds: { x: 505, y: 305, width: 135, height: 345 },
    startMs: 6500, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Draw the long curved back.", enabled: true,
  },
  {
    id: "04-belly", name: "Draw the belly", order: 4, geometry: "path",
    vector: { d: "M462 315 C400 400 430 545 500 630" },
    bounds: { x: 400, y: 315, width: 100, height: 315 },
    startMs: 9200, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Draw the round belly.", enabled: true,
  },
  {
    id: "05-tail", name: "Curl the tail", order: 5, geometry: "path",
    vector: { d: "M508 648 C430 760 300 690 402 632" },
    bounds: { x: 300, y: 632, width: 208, height: 128 },
    startMs: 11900, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Curl the tail around like a spring.", enabled: true,
  },
  {
    id: "06-fin", name: "Draw the fin", order: 6, geometry: "path",
    vector: { d: "M628 455 C692 492 690 545 620 570" },
    bounds: { x: 620, y: 455, width: 72, height: 115 },
    startMs: 14000, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add one small fin on the back.", enabled: true,
  },
  {
    id: "07-ridge-one", name: "First belly ridge", order: 7, geometry: "line",
    vector: { x1: 445, y1: 423, x2: 588, y2: 427 },
    bounds: { x: 445, y: 413, width: 143, height: 24 },
    startMs: 16100, durationMs: 1100, stepId: "step-4",
    voiceDescription: "Draw one line across the belly.", enabled: true,
  },
  {
    id: "08-ridge-two", name: "Second belly ridge", order: 8, geometry: "line",
    vector: { x1: 452, y1: 510, x2: 582, y2: 518 },
    bounds: { x: 452, y: 502, width: 130, height: 24 },
    startMs: 17500, durationMs: 1100, stepId: "step-4",
    voiceDescription: "Draw one more line lower down.", enabled: true,
  },
  {
    id: "09-eye", name: "Draw the eye", order: 9, geometry: "circle",
    vector: { cx: 528, cy: 240, r: 16 },
    bounds: { x: 512, y: 224, width: 32, height: 32 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18900, durationMs: 1100, stepId: "step-5",
    voiceDescription: "Add one round eye.", enabled: true,
  },
  {
    id: "10-crown", name: "Draw the crown", order: 10, geometry: "path",
    vector: { d: "M462 205 L492 168 L520 202" },
    bounds: { x: 462, y: 168, width: 58, height: 37 },
    startMs: 20300, durationMs: 1100, stepId: "step-5",
    voiceDescription: "Finish with a little crown on top.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head", "02-snout"], voiceText: "Draw a small oval head with a long snout." },
  { id: "step-2", order: 2, title: "Body", strokeIds: ["03-back", "04-belly"], voiceText: "Draw the long curved back and the round belly." },
  { id: "step-3", order: 3, title: "Tail", strokeIds: ["05-tail", "06-fin"], voiceText: "Curl the tail like a spring and add one fin." },
  { id: "step-4", order: 4, title: "Ridges", strokeIds: ["07-ridge-one", "08-ridge-two"], voiceText: "Draw two lines across the belly." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["09-eye", "10-crown"], voiceText: "Finish with one eye and a little crown." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a seahorse in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6400, endMs: 11800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11800, endMs: 16000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 16000, endMs: 18800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18800, endMs: 21600, text: steps[4]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24000, text: "It's a seahorse!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createSeahorseDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "52-animal-seahorse-001", slug: "easy-seahorse",
    name: { en: "Seahorse", vi: "Con cá ngựa" }, category: "animals", subcategory: "sea",
    difficulty: 2, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["seahorse", "animal", "sea", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a seahorse in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

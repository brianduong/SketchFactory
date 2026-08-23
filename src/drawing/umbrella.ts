import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-canopy", name: "Draw the top", order: 1, geometry: "path",
    vector: { d: "M180 560 C230 250 770 250 820 560" },
    bounds: { x: 180, y: 250, width: 640, height: 310 },
    startMs: 3000, durationMs: 2300, stepId: "step-1",
    voiceDescription: "Draw a big arch on top.", enabled: true,
  },
  {
    id: "02-scallop-one", name: "First curve", order: 2, geometry: "path",
    vector: { d: "M180 560 C225 630 295 630 340 560" },
    bounds: { x: 180, y: 560, width: 160, height: 70 },
    startMs: 5600, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add one curve under the edge.", enabled: true,
  },
  {
    id: "03-scallop-two", name: "Second curve", order: 3, geometry: "path",
    vector: { d: "M340 560 C385 630 455 630 500 560" },
    bounds: { x: 340, y: 560, width: 160, height: 70 },
    startMs: 8200, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add the second curve.", enabled: true,
  },
  {
    id: "04-scallop-three", name: "Third curve", order: 4, geometry: "path",
    vector: { d: "M500 560 C545 630 615 630 660 560" },
    bounds: { x: 500, y: 560, width: 160, height: 70 },
    startMs: 10800, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Add the third curve.", enabled: true,
  },
  {
    id: "05-scallop-four", name: "Fourth curve", order: 5, geometry: "path",
    vector: { d: "M660 560 C705 630 775 630 820 560" },
    bounds: { x: 660, y: 560, width: 160, height: 70 },
    startMs: 13400, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Add the last curve.", enabled: true,
  },
  {
    id: "06-pole", name: "Draw the pole", order: 6, geometry: "line",
    vector: { x1: 500, y1: 330, x2: 500, y2: 780 },
    bounds: { x: 490, y: 330, width: 20, height: 450 },
    startMs: 16000, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Draw a straight pole down the middle.", enabled: true,
  },
  {
    id: "07-handle", name: "Draw the handle", order: 7, geometry: "path",
    vector: { d: "M500 780 C500 870 400 870 400 790" },
    bounds: { x: 400, y: 780, width: 100, height: 90 },
    startMs: 18600, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Finish with a hook handle.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Top", strokeIds: ["01-canopy"], voiceText: "Draw a big arch on top." },
  { id: "step-2", order: 2, title: "First curves", strokeIds: ["02-scallop-one", "03-scallop-two"], voiceText: "Add two curves under the left edge." },
  { id: "step-3", order: 3, title: "Last curves", strokeIds: ["04-scallop-three", "05-scallop-four"], voiceText: "Add two more curves under the right edge." },
  { id: "step-4", order: 4, title: "Pole", strokeIds: ["06-pole"], voiceText: "Draw a straight pole down the middle." },
  { id: "step-5", order: 5, title: "Handle", strokeIds: ["07-handle"], voiceText: "Finish with a hook handle." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw an umbrella in just seven strokes?" },
  { id: "step-1", startMs: 2800, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5400, endMs: 10600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10600, endMs: 15800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 15800, endMs: 18400, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18400, endMs: 21100, text: steps[4]!.voiceText },
  { id: "result", startMs: 21300, endMs: 23500, text: "It's an umbrella!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createUmbrellaDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "67-object-umbrella-001", slug: "easy-umbrella",
    name: { en: "Umbrella", vi: "Cái ô" }, category: "objects", subcategory: "everyday",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["umbrella", "object", "rain", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw an umbrella in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

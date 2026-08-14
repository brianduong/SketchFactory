import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-star", name: "Draw the star shape", order: 1, geometry: "polygon",
    vector: { points: "500,180 588,399 823,415 643,566 700,795 500,670 300,795 357,566 177,415 412,399" },
    bounds: { x: 177, y: 180, width: 646, height: 615 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 3800, stepId: "step-1",
    voiceDescription: "Draw one big star with five arms.", enabled: true,
  },
  {
    id: "02-left-eye", name: "Draw the left eye", order: 2, geometry: "circle",
    vector: { cx: 438, cy: 452, r: 34 },
    bounds: { x: 404, y: 418, width: 68, height: 68 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 7100, durationMs: 1400, stepId: "step-2",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "03-right-eye", name: "Draw the right eye", order: 3, geometry: "circle",
    vector: { cx: 562, cy: 452, r: 34 },
    bounds: { x: 528, y: 418, width: 68, height: 68 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 8800, durationMs: 1400, stepId: "step-2",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "04-smile", name: "Draw the smile", order: 4, geometry: "path",
    vector: { d: "M428 532 Q500 598 572 532" },
    bounds: { x: 428, y: 532, width: 144, height: 66 },
    startMs: 10500, durationMs: 2000, stepId: "step-3",
    voiceDescription: "Add one happy curve.", enabled: true,
  },
  {
    id: "05-top-dot", name: "Add the first dot", order: 5, geometry: "circle",
    vector: { cx: 500, cy: 268, r: 22 },
    bounds: { x: 478, y: 246, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12800, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Put one dot on the top arm.", enabled: true,
  },
  {
    id: "06-right-dot", name: "Add the second dot", order: 6, geometry: "circle",
    vector: { cx: 726, cy: 447, r: 22 },
    bounds: { x: 704, y: 425, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14300, durationMs: 1300, stepId: "step-4",
    voiceDescription: "One dot on the next arm.", enabled: true,
  },
  {
    id: "07-lower-right-dot", name: "Add the third dot", order: 7, geometry: "circle",
    vector: { cx: 648, cy: 712, r: 22 },
    bounds: { x: 626, y: 690, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 15800, durationMs: 1300, stepId: "step-4",
    voiceDescription: "One dot down here.", enabled: true,
  },
  {
    id: "08-lower-left-dot", name: "Add the fourth dot", order: 8, geometry: "circle",
    vector: { cx: 352, cy: 712, r: 22 },
    bounds: { x: 330, y: 690, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 17300, durationMs: 1300, stepId: "step-4",
    voiceDescription: "One dot on the other side.", enabled: true,
  },
  {
    id: "09-left-dot", name: "Add the last dot", order: 9, geometry: "circle",
    vector: { cx: 274, cy: 447, r: 22 },
    bounds: { x: 252, y: 425, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18800, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Finish with one dot on the last arm.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Star", strokeIds: ["01-star"], voiceText: "Draw one big star with five arms." },
  { id: "step-2", order: 2, title: "Eyes", strokeIds: ["02-left-eye", "03-right-eye"], voiceText: "Add two round eyes in the middle." },
  { id: "step-3", order: 3, title: "Smile", strokeIds: ["04-smile"], voiceText: "Add one happy curve." },
  { id: "step-4", order: 4, title: "Dots", strokeIds: ["05-top-dot", "06-right-dot", "07-lower-right-dot", "08-lower-left-dot", "09-left-dot"], voiceText: "Finish with one dot on each arm." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a starfish in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 7000, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 7000, endMs: 10400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10400, endMs: 12700, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12700, endMs: 20200, text: steps[3]!.voiceText },
  { id: "result", startMs: 20600, endMs: 22800, text: "It's a starfish!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createStarfishDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "37-animal-starfish-001", slug: "easy-starfish",
    name: { en: "Starfish", vi: "Con sao biển" }, category: "animals", subcategory: "sea",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["starfish", "animal", "sea", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a starfish in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

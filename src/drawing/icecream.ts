import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-cone", name: "Draw the cone", order: 1, geometry: "polygon",
    vector: { points: "360,540 640,540 500,850" },
    bounds: { x: 360, y: 540, width: 280, height: 310 },
    startMs: 3000, durationMs: 2300, stepId: "step-1",
    voiceDescription: "Draw a triangle for the cone.", enabled: true,
  },
  {
    id: "02-scoop-bottom", name: "Big scoop", order: 2, geometry: "circle",
    vector: { cx: 500, cy: 470, r: 152 },
    bounds: { x: 348, y: 318, width: 304, height: 304 },
    style: { fill: "#FFFDF7" },
    startMs: 5600, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add a big round scoop on the cone.", enabled: true,
  },
  {
    id: "03-scoop-top", name: "Small scoop", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 300, r: 118 },
    bounds: { x: 382, y: 182, width: 236, height: 236 },
    style: { fill: "#FFFDF7" },
    startMs: 8200, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Stack a smaller scoop above it.", enabled: true,
  },
  {
    id: "04-cherry", name: "Add the cherry", order: 4, geometry: "circle",
    vector: { cx: 500, cy: 160, r: 40 },
    bounds: { x: 460, y: 120, width: 80, height: 80 },
    style: { fill: "#FFFDF7" },
    startMs: 10800, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Put a little cherry on top.", enabled: true,
  },
  {
    id: "05-stem", name: "Cherry stem", order: 5, geometry: "path",
    vector: { d: "M508 128 C530 100 558 100 572 122" },
    bounds: { x: 508, y: 100, width: 64, height: 28 },
    startMs: 13400, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Draw a short stem on the cherry.", enabled: true,
  },
  {
    id: "06-waffle-left", name: "First waffle line", order: 6, geometry: "line",
    vector: { x1: 428, y1: 685, x2: 546, y2: 745 },
    bounds: { x: 428, y: 685, width: 118, height: 60 },
    startMs: 16000, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Draw one line across the cone.", enabled: true,
  },
  {
    id: "07-waffle-right", name: "Second waffle line", order: 7, geometry: "line",
    vector: { x1: 572, y1: 685, x2: 454, y2: 745 },
    bounds: { x: 454, y: 685, width: 118, height: 60 },
    startMs: 18600, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Cross it with a second line.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Cone", strokeIds: ["01-cone"], voiceText: "Draw a triangle for the cone." },
  { id: "step-2", order: 2, title: "Big scoop", strokeIds: ["02-scoop-bottom"], voiceText: "Add a big round scoop on the cone." },
  { id: "step-3", order: 3, title: "Small scoop", strokeIds: ["03-scoop-top"], voiceText: "Stack a smaller scoop above it." },
  { id: "step-4", order: 4, title: "Cherry", strokeIds: ["04-cherry", "05-stem"], voiceText: "Put a little cherry with a stem on top." },
  { id: "step-5", order: 5, title: "Waffle", strokeIds: ["06-waffle-left", "07-waffle-right"], voiceText: "Finish with two lines across the cone." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw an ice cream cone in just seven strokes?" },
  { id: "step-1", startMs: 2800, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5400, endMs: 8000, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8000, endMs: 10600, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 10600, endMs: 15800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 15800, endMs: 21100, text: steps[4]!.voiceText },
  { id: "result", startMs: 21300, endMs: 23500, text: "It's an ice cream cone!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createIceCreamDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "63-object-icecream-001", slug: "easy-ice-cream-cone",
    name: { en: "Ice Cream Cone", vi: "Cây kem" }, category: "objects", subcategory: "food",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["ice cream", "ice cream cone", "object", "food", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw an ice cream cone in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

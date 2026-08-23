import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-wall", name: "Draw the wall", order: 1, geometry: "rect",
    vector: { x: 250, y: 470, width: 500, height: 380 },
    bounds: { x: 250, y: 470, width: 500, height: 380 },
    startMs: 3000, durationMs: 2300, stepId: "step-1",
    voiceDescription: "Draw a big square for the wall.", enabled: true,
  },
  {
    id: "02-roof", name: "Add the roof", order: 2, geometry: "polygon",
    vector: { points: "230,470 500,250 770,470" },
    bounds: { x: 230, y: 250, width: 540, height: 220 },
    startMs: 5600, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add a triangle roof on top.", enabled: true,
  },
  {
    id: "03-chimney", name: "Draw the chimney", order: 3, geometry: "polyline",
    vector: { points: "640,370 640,200 720,200 720,395" },
    bounds: { x: 640, y: 200, width: 80, height: 195 },
    startMs: 8200, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Draw a small chimney on the roof.", enabled: true,
  },
  {
    id: "04-door", name: "Add the door", order: 4, geometry: "rect",
    vector: { x: 440, y: 660, width: 140, height: 190 },
    bounds: { x: 440, y: 660, width: 140, height: 190 },
    startMs: 10800, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Add a tall door in the middle.", enabled: true,
  },
  {
    id: "05-doorknob", name: "Add the knob", order: 5, geometry: "circle",
    vector: { cx: 555, cy: 765, r: 16 },
    bounds: { x: 539, y: 749, width: 32, height: 32 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13400, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Put a round knob on the door.", enabled: true,
  },
  {
    id: "06-window-left", name: "Left window", order: 6, geometry: "rect",
    vector: { x: 310, y: 520, width: 120, height: 100 },
    bounds: { x: 310, y: 520, width: 120, height: 100 },
    startMs: 16000, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Draw one square window.", enabled: true,
  },
  {
    id: "07-window-right", name: "Right window", order: 7, geometry: "rect",
    vector: { x: 590, y: 520, width: 120, height: 100 },
    bounds: { x: 590, y: 520, width: 120, height: 100 },
    startMs: 18600, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Add the second window.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Wall", strokeIds: ["01-wall"], voiceText: "Draw a big square for the wall." },
  { id: "step-2", order: 2, title: "Roof", strokeIds: ["02-roof"], voiceText: "Add a triangle roof on top." },
  { id: "step-3", order: 3, title: "Chimney", strokeIds: ["03-chimney"], voiceText: "Draw a small chimney on the roof." },
  { id: "step-4", order: 4, title: "Door", strokeIds: ["04-door", "05-doorknob"], voiceText: "Add a tall door with a round knob." },
  { id: "step-5", order: 5, title: "Windows", strokeIds: ["06-window-left", "07-window-right"], voiceText: "Finish with two square windows." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw a house in just seven strokes?" },
  { id: "step-1", startMs: 2800, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5400, endMs: 8000, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8000, endMs: 10600, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 10600, endMs: 15800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 15800, endMs: 21100, text: steps[4]!.voiceText },
  { id: "result", startMs: 21300, endMs: 23500, text: "It's a house!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createHouseDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "62-object-house-001", slug: "easy-house",
    name: { en: "House", vi: "Ngôi nhà" }, category: "objects", subcategory: "home",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["house", "object", "home", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a house in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

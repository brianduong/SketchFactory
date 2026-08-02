import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-31T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 395, cy: 645, rx: 205, ry: 145 },
    bounds: { x: 190, y: 500, width: 410, height: 290 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with one wide oval body.", enabled: true,
  },
  {
    id: "02-neck", name: "Draw the neck", order: 2, geometry: "line",
    vector: { x1: 480, y1: 590, x2: 640, y2: 330 },
    bounds: { x: 434, y: 284, width: 252, height: 352 },
    style: { stroke: "#111111", strokeWidth: 26 },
    startMs: 5400, durationMs: 2200, stepId: "step-2",
    voiceDescription: "Draw one long slanted neck.", enabled: true,
  },
  {
    id: "03-head", name: "Draw the head", order: 3, geometry: "ellipse",
    vector: { cx: 690, cy: 290, rx: 115, ry: 78 },
    bounds: { x: 575, y: 212, width: 230, height: 156 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7800, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add one small oval head.", enabled: true,
  },
  {
    id: "04-left-horn", name: "Add the left horn", order: 4, geometry: "line",
    vector: { x1: 655, y1: 225, x2: 640, y2: 155 },
    bounds: { x: 629, y: 144, width: 37, height: 92 },
    style: { stroke: "#111111", strokeWidth: 22 },
    startMs: 9800, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Add one short horn.", enabled: true,
  },
  {
    id: "05-right-horn", name: "Add the right horn", order: 5, geometry: "line",
    vector: { x1: 725, y1: 225, x2: 740, y2: 155 },
    bounds: { x: 714, y: 144, width: 37, height: 92 },
    style: { stroke: "#111111", strokeWidth: 22 },
    startMs: 11400, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Add the second short horn.", enabled: true,
  },
  {
    id: "06-eye", name: "Draw the eye", order: 6, geometry: "circle",
    vector: { cx: 715, cy: 275, r: 18 },
    bounds: { x: 697, y: 257, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13000, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw one little eye.", enabled: true,
  },
  {
    id: "07-front-leg", name: "Draw the front leg", order: 7, geometry: "line",
    vector: { x1: 480, y1: 760, x2: 480, y2: 880 },
    bounds: { x: 465, y: 760, width: 30, height: 120 },
    style: { stroke: "#111111", strokeWidth: 26 },
    startMs: 14500, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Draw one straight leg.", enabled: true,
  },
  {
    id: "08-back-leg", name: "Draw the back leg", order: 8, geometry: "line",
    vector: { x1: 300, y1: 760, x2: 300, y2: 880 },
    bounds: { x: 285, y: 760, width: 30, height: 120 },
    style: { stroke: "#111111", strokeWidth: 26 },
    startMs: 16300, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Draw the second straight leg.", enabled: true,
  },
  {
    id: "09-first-spot", name: "Add the first spot", order: 9, geometry: "circle",
    vector: { cx: 330, cy: 610, r: 46 },
    bounds: { x: 284, y: 564, width: 92, height: 92 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 18 },
    startMs: 18100, durationMs: 1400, stepId: "step-6",
    voiceDescription: "Add one round spot.", enabled: true,
  },
  {
    id: "10-second-spot", name: "Add the second spot", order: 10, geometry: "circle",
    vector: { cx: 460, cy: 670, r: 46 },
    bounds: { x: 414, y: 624, width: 92, height: 92 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 18 },
    startMs: 19700, durationMs: 1600, stepId: "step-6",
    voiceDescription: "Finish with the second round spot.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one wide oval body." },
  { id: "step-2", order: 2, title: "Neck", strokeIds: ["02-neck"], voiceText: "Draw one long slanted neck." },
  { id: "step-3", order: 3, title: "Head", strokeIds: ["03-head"], voiceText: "Add one small oval head on top." },
  { id: "step-4", order: 4, title: "Horns and eye", strokeIds: ["04-left-horn", "05-right-horn", "06-eye"], voiceText: "Add two short horns and one little eye." },
  { id: "step-5", order: 5, title: "Legs", strokeIds: ["07-front-leg", "08-back-leg"], voiceText: "Draw two straight legs." },
  { id: "step-6", order: 6, title: "Spots", strokeIds: ["09-first-spot", "10-second-spot"], voiceText: "Finish with two round spots." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a giraffe in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5300, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5300, endMs: 7700, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 7700, endMs: 9700, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 9700, endMs: 14400, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 14400, endMs: 18000, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 18000, endMs: 21400, text: steps[5]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24200, text: "It's a giraffe!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createGiraffeDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "20-animal-giraffe-001", slug: "easy-giraffe",
    name: { en: "Giraffe", vi: "Con hươu cao cổ" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["giraffe", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a giraffe in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-31T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-ear", name: "Draw the left ear", order: 1, geometry: "circle",
    vector: { cx: 295, cy: 500, r: 78 },
    bounds: { x: 217, y: 422, width: 156, height: 156 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with one round ear.", enabled: true,
  },
  {
    id: "02-right-ear", name: "Draw the right ear", order: 2, geometry: "circle",
    vector: { cx: 705, cy: 500, r: 78 },
    bounds: { x: 627, y: 422, width: 156, height: 156 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5400, durationMs: 1800, stepId: "step-1",
    voiceDescription: "Add the second round ear.", enabled: true,
  },
  {
    id: "03-head", name: "Draw the head", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 485, r: 215 },
    bounds: { x: 285, y: 270, width: 430, height: 430 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7400, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Draw one big round head.", enabled: true,
  },
  {
    id: "04-face", name: "Draw the face patch", order: 4, geometry: "ellipse",
    vector: { cx: 500, cy: 545, rx: 145, ry: 125 },
    bounds: { x: 355, y: 420, width: 290, height: 250 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 10000, durationMs: 2000, stepId: "step-3",
    voiceDescription: "Add one oval face patch.", enabled: true,
  },
  {
    id: "05-left-eye", name: "Draw the left eye", order: 5, geometry: "circle",
    vector: { cx: 435, cy: 490, r: 20 },
    bounds: { x: 415, y: 470, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12200, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the first little eye.", enabled: true,
  },
  {
    id: "06-right-eye", name: "Draw the right eye", order: 6, geometry: "circle",
    vector: { cx: 565, cy: 490, r: 20 },
    bounds: { x: 545, y: 470, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13800, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the second little eye.", enabled: true,
  },
  {
    id: "07-nose", name: "Add the nose", order: 7, geometry: "ellipse",
    vector: { cx: 500, cy: 555, rx: 26, ry: 18 },
    bounds: { x: 474, y: 537, width: 52, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 15400, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Add one small oval nose.", enabled: true,
  },
  {
    id: "08-smile", name: "Draw the smile", order: 8, geometry: "path",
    vector: { d: "M430 605 Q500 665 570 605" },
    bounds: { x: 430, y: 605, width: 140, height: 60 },
    startMs: 17000, durationMs: 1900, stepId: "step-5",
    voiceDescription: "Draw one wide smile.", enabled: true,
  },
  {
    id: "09-hair-curl", name: "Add the hair curl", order: 9, geometry: "path",
    vector: { d: "M450 280 Q500 185 550 280" },
    bounds: { x: 450, y: 185, width: 100, height: 95 },
    startMs: 19100, durationMs: 2200, stepId: "step-5",
    voiceDescription: "Finish with one little hair curl.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Ears", strokeIds: ["01-left-ear", "02-right-ear"], voiceText: "Start with two big round ears." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["03-head"], voiceText: "Draw one big round head." },
  { id: "step-3", order: 3, title: "Face patch", strokeIds: ["04-face"], voiceText: "Add one oval face patch." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["05-left-eye", "06-right-eye"], voiceText: "Now add two little eyes." },
  { id: "step-5", order: 5, title: "Nose, smile and hair", strokeIds: ["07-nose", "08-smile", "09-hair-curl"], voiceText: "Finish with a nose, a smile and one hair curl." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a monkey in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 7200, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 7200, endMs: 9900, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9900, endMs: 12100, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12100, endMs: 15300, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 15300, endMs: 21400, text: steps[4]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24200, text: "It's a monkey!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createMonkeyDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "14-animal-monkey-001", slug: "easy-monkey",
    name: { en: "Monkey", vi: "Con khỉ" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["monkey", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a monkey in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

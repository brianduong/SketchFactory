import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the head", order: 1, geometry: "ellipse",
    vector: { cx: 500, cy: 525, rx: 220, ry: 260 },
    bounds: { x: 280, y: 265, width: 440, height: 520 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with a tall oval.", enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left ear", order: 2, geometry: "ellipse",
    vector: { cx: 285, cy: 400, rx: 90, ry: 50, transform: "rotate(-15 285 400)" },
    bounds: { x: 190, y: 340, width: 190, height: 120 },
    startMs: 5700, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add one wide ear.", enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right ear", order: 3, geometry: "ellipse",
    vector: { cx: 715, cy: 400, rx: 90, ry: 50, transform: "rotate(15 715 400)" },
    bounds: { x: 620, y: 340, width: 190, height: 120 },
    startMs: 7600, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add another wide ear.", enabled: true,
  },
  {
    id: "04-left-horn", name: "Add the left horn", order: 4, geometry: "polygon",
    vector: { points: "345,350 365,185 420,365" },
    bounds: { x: 345, y: 185, width: 75, height: 180 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 20 },
    startMs: 9500, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add the first little horn.", enabled: true,
  },
  {
    id: "05-right-horn", name: "Add the right horn", order: 5, geometry: "polygon",
    vector: { points: "580,365 635,185 655,350" },
    bounds: { x: 580, y: 185, width: 75, height: 180 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 20 },
    startMs: 11300, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add the second little horn.", enabled: true,
  },
  {
    id: "06-left-eye", name: "Draw the left eye", order: 6, geometry: "circle",
    vector: { cx: 425, cy: 500, r: 18 },
    bounds: { x: 407, y: 482, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13200, durationMs: 1000, stepId: "step-3",
    voiceDescription: "Draw the first eye.", enabled: true,
  },
  {
    id: "07-right-eye", name: "Draw the right eye", order: 7, geometry: "circle",
    vector: { cx: 575, cy: 500, r: 18 },
    bounds: { x: 557, y: 482, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14600, durationMs: 1000, stepId: "step-3",
    voiceDescription: "Draw the second eye.", enabled: true,
  },
  {
    id: "08-muzzle", name: "Draw the muzzle", order: 8, geometry: "ellipse",
    vector: { cx: 500, cy: 635, rx: 135, ry: 92 },
    bounds: { x: 365, y: 543, width: 270, height: 184 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 16100, durationMs: 1900, stepId: "step-4",
    voiceDescription: "Add a wide oval muzzle.", enabled: true,
  },
  {
    id: "09-left-nostril", name: "Add the left nostril", order: 9, geometry: "circle",
    vector: { cx: 450, cy: 635, r: 15 },
    bounds: { x: 435, y: 620, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18500, durationMs: 1100, stepId: "step-4",
    voiceDescription: "Add the first nostril.", enabled: true,
  },
  {
    id: "10-right-nostril", name: "Add the right nostril", order: 10, geometry: "circle",
    vector: { cx: 550, cy: 635, r: 15 },
    bounds: { x: 535, y: 620, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 20200, durationMs: 1600, stepId: "step-4",
    voiceDescription: "Add the second nostril.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with a tall oval." },
  { id: "step-2", order: 2, title: "Ears and horns", strokeIds: ["02-left-ear", "03-right-ear", "04-left-horn", "05-right-horn"], voiceText: "Add two wide ears and two little horns." },
  { id: "step-3", order: 3, title: "Eyes", strokeIds: ["06-left-eye", "07-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-4", order: 4, title: "Muzzle", strokeIds: ["08-muzzle", "09-left-nostril", "10-right-nostril"], voiceText: "Finish with a wide muzzle and two nostrils." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a cow in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5500, endMs: 13000, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 13000, endMs: 15800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 15800, endMs: 22000, text: steps[3]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a cow!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createCowDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "animal-cow-001", slug: "easy-cow",
    name: { en: "Cow", vi: "Con bò" }, category: "animals", subcategory: "farm",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["cow", "animal", "farm", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a cow in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

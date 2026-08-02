import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-31T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-ear", name: "Draw the left ear", order: 1, geometry: "circle",
    vector: { cx: 330, cy: 300, r: 62 },
    bounds: { x: 268, y: 238, width: 124, height: 124 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with one small round ear.", enabled: true,
  },
  {
    id: "02-right-ear", name: "Draw the right ear", order: 2, geometry: "circle",
    vector: { cx: 670, cy: 300, r: 62 },
    bounds: { x: 608, y: 238, width: 124, height: 124 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5400, durationMs: 1800, stepId: "step-1",
    voiceDescription: "Add the second small round ear.", enabled: true,
  },
  {
    id: "03-mane", name: "Draw the mane", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 510, r: 268 },
    bounds: { x: 232, y: 242, width: 536, height: 536 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7400, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Draw one big circle for the mane.", enabled: true,
  },
  {
    id: "04-head", name: "Draw the head", order: 4, geometry: "circle",
    vector: { cx: 500, cy: 510, r: 192 },
    bounds: { x: 308, y: 318, width: 384, height: 384 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 10000, durationMs: 2000, stepId: "step-3",
    voiceDescription: "Draw a smaller circle inside for the face.", enabled: true,
  },
  {
    id: "05-left-eye", name: "Draw the left eye", order: 5, geometry: "circle",
    vector: { cx: 430, cy: 470, r: 20 },
    bounds: { x: 410, y: 450, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12200, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the first little eye.", enabled: true,
  },
  {
    id: "06-right-eye", name: "Draw the right eye", order: 6, geometry: "circle",
    vector: { cx: 570, cy: 470, r: 20 },
    bounds: { x: 550, y: 450, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13800, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the second little eye.", enabled: true,
  },
  {
    id: "07-nose", name: "Add the nose", order: 7, geometry: "polygon",
    vector: { points: "460,555 540,555 500,600" },
    bounds: { x: 460, y: 555, width: 80, height: 45 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 15400, durationMs: 1500, stepId: "step-5",
    voiceDescription: "Add one small triangle nose.", enabled: true,
  },
  {
    id: "08-left-mouth", name: "Draw the left mouth curve", order: 8, geometry: "path",
    vector: { d: "M500 600 Q460 660 415 620" },
    bounds: { x: 415, y: 600, width: 85, height: 60 },
    startMs: 17100, durationMs: 1800, stepId: "step-5",
    voiceDescription: "Draw one curve to the left.", enabled: true,
  },
  {
    id: "09-right-mouth", name: "Draw the right mouth curve", order: 9, geometry: "path",
    vector: { d: "M500 600 Q540 660 585 620" },
    bounds: { x: 500, y: 600, width: 85, height: 60 },
    startMs: 19100, durationMs: 2200, stepId: "step-5",
    voiceDescription: "Finish with one curve to the right.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Ears", strokeIds: ["01-left-ear", "02-right-ear"], voiceText: "Start with two small round ears." },
  { id: "step-2", order: 2, title: "Mane", strokeIds: ["03-mane"], voiceText: "Draw one big circle for the mane." },
  { id: "step-3", order: 3, title: "Head", strokeIds: ["04-head"], voiceText: "Draw a smaller circle inside for the face." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["05-left-eye", "06-right-eye"], voiceText: "Now add two little eyes." },
  { id: "step-5", order: 5, title: "Nose and mouth", strokeIds: ["07-nose", "08-left-mouth", "09-right-mouth"], voiceText: "Finish with a triangle nose and two mouth curves." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a lion in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 7200, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 7200, endMs: 9900, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9900, endMs: 12100, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12100, endMs: 15300, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 15300, endMs: 21400, text: steps[4]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24200, text: "It's a lion!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createLionDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "13-animal-lion-001", slug: "easy-lion",
    name: { en: "Lion", vi: "Con sư tử" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["lion", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a lion in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

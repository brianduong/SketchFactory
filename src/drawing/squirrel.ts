import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-ear", name: "Draw the left ear", order: 1, geometry: "ellipse",
    vector: { cx: 290, cy: 175, rx: 34, ry: 55 },
    bounds: { x: 256, y: 120, width: 68, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 3000, durationMs: 1800, stepId: "step-1",
    voiceDescription: "Start with one small ear.", enabled: true,
  },
  {
    id: "02-right-ear", name: "Draw the right ear", order: 2, geometry: "ellipse",
    vector: { cx: 435, cy: 172, rx: 34, ry: 55 },
    bounds: { x: 401, y: 117, width: 68, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5000, durationMs: 1700, stepId: "step-1",
    voiceDescription: "Add the second small ear.", enabled: true,
  },
  {
    id: "03-head", name: "Draw the head", order: 3, geometry: "circle",
    vector: { cx: 360, cy: 300, r: 125 },
    bounds: { x: 235, y: 175, width: 250, height: 250 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7000, durationMs: 2500, stepId: "step-2",
    voiceDescription: "Draw one round head under them.", enabled: true,
  },
  {
    id: "04-body", name: "Draw the body", order: 4, geometry: "ellipse",
    vector: { cx: 375, cy: 600, rx: 135, ry: 185 },
    bounds: { x: 240, y: 415, width: 270, height: 370 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 9800, durationMs: 2400, stepId: "step-3",
    voiceDescription: "Add one tall oval body.", enabled: true,
  },
  {
    id: "05-tail-outer", name: "Sweep the tail up", order: 5, geometry: "path",
    vector: { d: "M455 760 C890 620 730 110 520 320" },
    bounds: { x: 455, y: 110, width: 435, height: 650 },
    startMs: 12400, durationMs: 2500, stepId: "step-4",
    voiceDescription: "Sweep one big curve up and over.", enabled: true,
  },
  {
    id: "06-tail-inner", name: "Bring the tail back down", order: 6, geometry: "path",
    vector: { d: "M520 320 C590 480 560 650 455 760" },
    bounds: { x: 455, y: 320, width: 135, height: 440 },
    startMs: 15100, durationMs: 2200, stepId: "step-4",
    voiceDescription: "Bring one curve back down to the body.", enabled: true,
  },
  {
    id: "07-left-eye", name: "Draw the left eye", order: 7, geometry: "circle",
    vector: { cx: 315, cy: 290, r: 22 },
    bounds: { x: 293, y: 268, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 17500, durationMs: 1200, stepId: "step-5",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "08-right-eye", name: "Draw the right eye", order: 8, geometry: "circle",
    vector: { cx: 405, cy: 290, r: 22 },
    bounds: { x: 383, y: 268, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18900, durationMs: 1200, stepId: "step-5",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "09-nose", name: "Add the nose", order: 9, geometry: "circle",
    vector: { cx: 360, cy: 355, r: 20 },
    bounds: { x: 340, y: 335, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 20300, durationMs: 1200, stepId: "step-5",
    voiceDescription: "Finish with one little nose.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Ears", strokeIds: ["01-left-ear", "02-right-ear"], voiceText: "Start with two small ears." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["03-head"], voiceText: "Draw one round head under them." },
  { id: "step-3", order: 3, title: "Body", strokeIds: ["04-body"], voiceText: "Add one tall oval body." },
  { id: "step-4", order: 4, title: "Tail", strokeIds: ["05-tail-outer", "06-tail-inner"], voiceText: "Draw two curves for one big bushy tail." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["07-left-eye", "08-right-eye", "09-nose"], voiceText: "Finish with two round eyes and a little nose." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a squirrel in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6900, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6900, endMs: 9700, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9700, endMs: 12300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12300, endMs: 17400, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 17400, endMs: 21500, text: steps[4]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24000, text: "It's a squirrel!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createSquirrelDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "28-animal-squirrel-001", slug: "easy-squirrel",
    name: { en: "Squirrel", vi: "Con sóc" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["squirrel", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a squirrel in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

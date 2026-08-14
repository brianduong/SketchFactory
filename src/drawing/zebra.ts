import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-ear", name: "Draw the left ear", order: 1, geometry: "polygon",
    vector: { points: "350,300 375,190 428,288" },
    bounds: { x: 350, y: 190, width: 78, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 3000, durationMs: 1900, stepId: "step-1",
    voiceDescription: "Start with one pointy ear.", enabled: true,
  },
  {
    id: "02-right-ear", name: "Draw the right ear", order: 2, geometry: "polygon",
    vector: { points: "572,288 625,190 650,300" },
    bounds: { x: 572, y: 190, width: 78, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5100, durationMs: 1800, stepId: "step-1",
    voiceDescription: "Add the second pointy ear.", enabled: true,
  },
  {
    id: "03-head", name: "Draw the head", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 470, r: 175 },
    bounds: { x: 325, y: 295, width: 350, height: 350 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7100, durationMs: 2600, stepId: "step-2",
    voiceDescription: "Draw one round head under them.", enabled: true,
  },
  {
    id: "04-muzzle", name: "Draw the muzzle", order: 4, geometry: "ellipse",
    vector: { cx: 500, cy: 668, rx: 118, ry: 102 },
    bounds: { x: 382, y: 566, width: 236, height: 204 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 9900, durationMs: 2400, stepId: "step-3",
    voiceDescription: "Add one oval muzzle below.", enabled: true,
  },
  {
    id: "05-stripe-left", name: "Draw the first stripe", order: 5, geometry: "path",
    vector: { d: "M425 345 L400 450" },
    bounds: { x: 400, y: 345, width: 25, height: 105 },
    startMs: 12500, durationMs: 1700, stepId: "step-4",
    voiceDescription: "Draw one stripe on the forehead.", enabled: true,
  },
  {
    id: "06-stripe-middle", name: "Draw the second stripe", order: 6, geometry: "path",
    vector: { d: "M510 320 L486 432" },
    bounds: { x: 486, y: 320, width: 24, height: 112 },
    startMs: 14400, durationMs: 1700, stepId: "step-4",
    voiceDescription: "Add a second stripe.", enabled: true,
  },
  {
    id: "07-stripe-right", name: "Draw the third stripe", order: 7, geometry: "path",
    vector: { d: "M592 348 L566 452" },
    bounds: { x: 566, y: 348, width: 26, height: 104 },
    startMs: 16300, durationMs: 1700, stepId: "step-4",
    voiceDescription: "Add the third stripe.", enabled: true,
  },
  {
    id: "08-left-eye", name: "Draw the left eye", order: 8, geometry: "circle",
    vector: { cx: 420, cy: 500, r: 24 },
    bounds: { x: 396, y: 476, width: 48, height: 48 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18200, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "09-right-eye", name: "Draw the right eye", order: 9, geometry: "circle",
    vector: { cx: 580, cy: 500, r: 24 },
    bounds: { x: 556, y: 476, width: 48, height: 48 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19800, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "10-nostrils", name: "Add the nose", order: 10, geometry: "ellipse",
    vector: { cx: 500, cy: 692, rx: 50, ry: 25 },
    bounds: { x: 450, y: 667, width: 100, height: 50 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 21400, durationMs: 1600, stepId: "step-6",
    voiceDescription: "Finish with one small oval nose.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Ears", strokeIds: ["01-left-ear", "02-right-ear"], voiceText: "Start with two pointy ears." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["03-head"], voiceText: "Draw one round head under them." },
  { id: "step-3", order: 3, title: "Muzzle", strokeIds: ["04-muzzle"], voiceText: "Add one oval muzzle below." },
  { id: "step-4", order: 4, title: "Stripes", strokeIds: ["05-stripe-left", "06-stripe-middle", "07-stripe-right"], voiceText: "Draw three stripes across the forehead." },
  { id: "step-5", order: 5, title: "Eyes", strokeIds: ["08-left-eye", "09-right-eye"], voiceText: "Now add two round eyes." },
  { id: "step-6", order: 6, title: "Nose", strokeIds: ["10-nostrils"], voiceText: "Finish with one small oval nose." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a zebra in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 7000, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 7000, endMs: 9800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9800, endMs: 12400, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12400, endMs: 18100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18100, endMs: 21300, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 21300, endMs: 23200, text: steps[5]!.voiceText },
  { id: "result", startMs: 23500, endMs: 25500, text: "It's a zebra!" },
  { id: "cta", startMs: 25800, endMs: 28700, text: "Great job! Try it yourself." },
];

export function createZebraDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "50-animal-zebra-001", slug: "easy-zebra",
    name: { en: "Zebra", vi: "Con ngựa vằn" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["zebra", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a zebra in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

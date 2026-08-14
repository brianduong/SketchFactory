import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 430, cy: 665, rx: 180, ry: 120 },
    bounds: { x: 250, y: 545, width: 360, height: 240 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2600, stepId: "step-1",
    voiceDescription: "Start with one oval body.", enabled: true,
  },
  {
    id: "02-neck-back", name: "Draw the back of the neck", order: 2, geometry: "path",
    vector: { d: "M500 580 C560 440 555 350 520 285" },
    bounds: { x: 500, y: 285, width: 60, height: 295 },
    startMs: 5900, durationMs: 2600, stepId: "step-2",
    voiceDescription: "Curve one long neck up.", enabled: true,
  },
  {
    id: "03-neck-front", name: "Draw the front of the neck", order: 3, geometry: "path",
    vector: { d: "M400 585 C460 445 455 355 420 290" },
    bounds: { x: 400, y: 290, width: 60, height: 295 },
    startMs: 8800, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Draw a second curve beside it.", enabled: true,
  },
  {
    id: "04-left-ear", name: "Draw the left ear", order: 4, geometry: "polygon",
    vector: { points: "405,255 415,140 460,245" },
    bounds: { x: 405, y: 140, width: 55, height: 115 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 11500, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add one long banana ear.", enabled: true,
  },
  {
    id: "05-right-ear", name: "Draw the right ear", order: 5, geometry: "polygon",
    vector: { points: "480,245 525,140 535,255" },
    bounds: { x: 480, y: 140, width: 55, height: 115 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 13600, durationMs: 1700, stepId: "step-3",
    voiceDescription: "Add the second long ear.", enabled: true,
  },
  {
    id: "06-head", name: "Draw the head", order: 6, geometry: "ellipse",
    vector: { cx: 462, cy: 295, rx: 118, ry: 82 },
    bounds: { x: 344, y: 213, width: 236, height: 164 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 15600, durationMs: 2400, stepId: "step-4",
    voiceDescription: "Draw one oval head under the ears.", enabled: true,
  },
  {
    id: "07-eye", name: "Draw the eye", order: 7, geometry: "circle",
    vector: { cx: 428, cy: 280, r: 22 },
    bounds: { x: 406, y: 258, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18300, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Give it one round eye.", enabled: true,
  },
  {
    id: "08-nose", name: "Add the nose", order: 8, geometry: "circle",
    vector: { cx: 358, cy: 305, r: 20 },
    bounds: { x: 338, y: 285, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19900, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Add one little nose.", enabled: true,
  },
  {
    id: "09-left-leg", name: "Draw the left leg", order: 9, geometry: "path",
    vector: { d: "M360 775 L340 855" },
    bounds: { x: 340, y: 775, width: 20, height: 80 },
    startMs: 21500, durationMs: 1400, stepId: "step-6",
    voiceDescription: "Draw one straight leg.", enabled: true,
  },
  {
    id: "10-right-leg", name: "Draw the right leg", order: 10, geometry: "path",
    vector: { d: "M500 775 L520 855" },
    bounds: { x: 500, y: 775, width: 20, height: 80 },
    startMs: 23100, durationMs: 1400, stepId: "step-6",
    voiceDescription: "Finish with the second leg.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one oval body." },
  { id: "step-2", order: 2, title: "Neck", strokeIds: ["02-neck-back", "03-neck-front"], voiceText: "Draw two curves for the long neck." },
  { id: "step-3", order: 3, title: "Ears", strokeIds: ["04-left-ear", "05-right-ear"], voiceText: "Add two long banana ears." },
  { id: "step-4", order: 4, title: "Head", strokeIds: ["06-head"], voiceText: "Draw one oval head under the ears." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["07-eye", "08-nose"], voiceText: "Add one round eye and a little nose." },
  { id: "step-6", order: 6, title: "Legs", strokeIds: ["09-left-leg", "10-right-leg"], voiceText: "Finish with two straight legs." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a llama in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 11400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11400, endMs: 15500, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 15500, endMs: 18200, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18200, endMs: 21400, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 21400, endMs: 24600, text: steps[5]!.voiceText },
  { id: "result", startMs: 24900, endMs: 26900, text: "It's a llama!" },
  { id: "cta", startMs: 27100, endMs: 28900, text: "Great job! Try it yourself." },
];

export function createLlamaDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "44-animal-llama-001", slug: "easy-llama",
    name: { en: "Llama", vi: "Con lạc đà không bướu" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["llama", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a llama in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

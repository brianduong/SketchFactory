import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-tail", name: "Draw the tail", order: 1, geometry: "polygon",
    vector: { points: "620,530 890,620 615,655" },
    bounds: { x: 615, y: 530, width: 275, height: 125 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with one long pointed tail.", enabled: true,
  },
  {
    id: "02-body", name: "Draw the body", order: 2, geometry: "ellipse",
    vector: { cx: 480, cy: 545, rx: 165, ry: 190 },
    bounds: { x: 315, y: 355, width: 330, height: 380 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 5700, durationMs: 2600, stepId: "step-2",
    voiceDescription: "Draw one tall oval body.", enabled: true,
  },
  {
    id: "03-leg", name: "Draw the big leg", order: 3, geometry: "polygon",
    vector: { points: "415,678 385,790 300,835 495,835 530,760 548,672" },
    bounds: { x: 300, y: 672, width: 248, height: 163 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 8500, durationMs: 2600, stepId: "step-3",
    voiceDescription: "Add one big strong leg.", enabled: true,
  },
  {
    id: "04-arm", name: "Draw the tiny arm", order: 4, geometry: "path",
    vector: { d: "M358 462 L295 495 L328 528" },
    bounds: { x: 295, y: 462, width: 63, height: 66 },
    startMs: 11300, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add one tiny arm in front.", enabled: true,
  },
  {
    id: "05-head", name: "Draw the head", order: 5, geometry: "ellipse",
    vector: { cx: 390, cy: 288, rx: 152, ry: 95 },
    bounds: { x: 238, y: 193, width: 304, height: 190 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 13600, durationMs: 2600, stepId: "step-5",
    voiceDescription: "Draw one big head at the top.", enabled: true,
  },
  {
    id: "06-teeth", name: "Draw the teeth", order: 6, geometry: "polygon",
    vector: { points: "265,318 300,363 335,318 370,363 405,318 440,363 475,318" },
    bounds: { x: 265, y: 318, width: 210, height: 45 },
    startMs: 16400, durationMs: 2800, stepId: "step-6",
    voiceDescription: "Zigzag a row of sharp teeth.", enabled: true,
  },
  {
    id: "07-eye", name: "Draw the eye", order: 7, geometry: "circle",
    vector: { cx: 425, cy: 254, r: 24 },
    bounds: { x: 401, y: 230, width: 48, height: 48 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19500, durationMs: 1500, stepId: "step-7",
    voiceDescription: "Give it one round eye.", enabled: true,
  },
  {
    id: "08-nostril", name: "Add the nostril", order: 8, geometry: "circle",
    vector: { cx: 268, cy: 258, r: 18 },
    bounds: { x: 250, y: 240, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 21300, durationMs: 1500, stepId: "step-7",
    voiceDescription: "Finish with one little nostril.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Tail", strokeIds: ["01-tail"], voiceText: "Start with one long pointed tail." },
  { id: "step-2", order: 2, title: "Body", strokeIds: ["02-body"], voiceText: "Draw one tall oval body." },
  { id: "step-3", order: 3, title: "Leg", strokeIds: ["03-leg"], voiceText: "Add one big strong leg." },
  { id: "step-4", order: 4, title: "Arm", strokeIds: ["04-arm"], voiceText: "Add one tiny arm in front." },
  { id: "step-5", order: 5, title: "Head", strokeIds: ["05-head"], voiceText: "Draw one big head at the top." },
  { id: "step-6", order: 6, title: "Teeth", strokeIds: ["06-teeth"], voiceText: "Zigzag a row of sharp teeth." },
  { id: "step-7", order: 7, title: "Face", strokeIds: ["07-eye", "08-nostril"], voiceText: "Finish with one round eye and a little nostril." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a T-rex in just eight strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5600, endMs: 8400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8400, endMs: 11200, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 11200, endMs: 13500, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 13500, endMs: 16300, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 16300, endMs: 19400, text: steps[5]!.voiceText },
  { id: "step-7", startMs: 19400, endMs: 23000, text: steps[6]!.voiceText },
  { id: "result", startMs: 23300, endMs: 25300, text: "It's a T-rex!" },
  { id: "cta", startMs: 25600, endMs: 28700, text: "Great job! Try it yourself." },
];

export function createTrexDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "49-animal-trex-001", slug: "easy-t-rex",
    name: { en: "T-Rex", vi: "Khủng long bạo chúa" }, category: "animals", subcategory: "dinosaurs",
    difficulty: 1, strokeCount: 8, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["t-rex", "dinosaur", "animal", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a T-rex in just eight strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

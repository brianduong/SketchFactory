import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 540, cy: 590, rx: 245, ry: 90 },
    bounds: { x: 295, y: 500, width: 490, height: 180 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2600, stepId: "step-1",
    voiceDescription: "Start with one long flat body.", enabled: true,
  },
  {
    id: "02-snout", name: "Draw the snout", order: 2, geometry: "ellipse",
    vector: { cx: 250, cy: 570, rx: 135, ry: 70 },
    bounds: { x: 115, y: 500, width: 270, height: 140 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 5900, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Add one long snout at the front.", enabled: true,
  },
  {
    id: "03-tail", name: "Draw the tail", order: 3, geometry: "polygon",
    vector: { points: "760,540 885,615 760,650" },
    bounds: { x: 760, y: 540, width: 125, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 8500, durationMs: 2200, stepId: "step-3",
    voiceDescription: "Add one pointed tail at the back.", enabled: true,
  },
  {
    id: "04-teeth", name: "Draw the teeth", order: 4, geometry: "polygon",
    vector: { points: "150,585 180,545 210,585 240,545 270,585 300,545 330,585" },
    bounds: { x: 150, y: 545, width: 180, height: 40 },
    startMs: 11000, durationMs: 2600, stepId: "step-4",
    voiceDescription: "Zigzag a row of teeth along the snout.", enabled: true,
  },
  {
    id: "05-eye-bump", name: "Draw the eye bump", order: 5, geometry: "circle",
    vector: { cx: 330, cy: 495, r: 48 },
    bounds: { x: 282, y: 447, width: 96, height: 96 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 13800, durationMs: 2000, stepId: "step-5",
    voiceDescription: "Put one round bump on top.", enabled: true,
  },
  {
    id: "06-eye", name: "Draw the eye", order: 6, geometry: "circle",
    vector: { cx: 330, cy: 492, r: 20 },
    bounds: { x: 310, y: 472, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16000, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Fill in one round eye.", enabled: true,
  },
  {
    id: "07-back-scales", name: "Draw the scales", order: 7, geometry: "polygon",
    vector: { points: "430,505 470,450 510,505 550,450 590,505 630,450 670,505" },
    bounds: { x: 430, y: 450, width: 240, height: 55 },
    startMs: 17600, durationMs: 2600, stepId: "step-6",
    voiceDescription: "Zigzag the scales along the back.", enabled: true,
  },
  {
    id: "08-front-leg", name: "Draw the front leg", order: 8, geometry: "path",
    vector: { d: "M395 665 L370 735 L300 735" },
    bounds: { x: 300, y: 665, width: 95, height: 70 },
    startMs: 20400, durationMs: 1800, stepId: "step-7",
    voiceDescription: "Draw one short leg.", enabled: true,
  },
  {
    id: "09-back-leg", name: "Draw the back leg", order: 9, geometry: "path",
    vector: { d: "M680 665 L705 735 L775 735" },
    bounds: { x: 680, y: 665, width: 95, height: 70 },
    startMs: 22400, durationMs: 1800, stepId: "step-7",
    voiceDescription: "Finish with the second short leg.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one long flat body." },
  { id: "step-2", order: 2, title: "Snout", strokeIds: ["02-snout"], voiceText: "Add one long snout at the front." },
  { id: "step-3", order: 3, title: "Tail", strokeIds: ["03-tail"], voiceText: "Add one pointed tail at the back." },
  { id: "step-4", order: 4, title: "Teeth", strokeIds: ["04-teeth"], voiceText: "Zigzag a row of teeth along the snout." },
  { id: "step-5", order: 5, title: "Eye", strokeIds: ["05-eye-bump", "06-eye"], voiceText: "Put one round bump on top and fill in the eye." },
  { id: "step-6", order: 6, title: "Scales", strokeIds: ["07-back-scales"], voiceText: "Zigzag the scales along the back." },
  { id: "step-7", order: 7, title: "Legs", strokeIds: ["08-front-leg", "09-back-leg"], voiceText: "Finish with two short legs." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a crocodile in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 8400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8400, endMs: 10900, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 10900, endMs: 13700, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 13700, endMs: 17500, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 17500, endMs: 20300, text: steps[5]!.voiceText },
  { id: "step-7", startMs: 20300, endMs: 24300, text: steps[6]!.voiceText },
  { id: "result", startMs: 24600, endMs: 26600, text: "It's a crocodile!" },
  { id: "cta", startMs: 26800, endMs: 28900, text: "Great job! Try it yourself." },
];

export function createCrocodileDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "40-animal-crocodile-001", slug: "easy-crocodile",
    name: { en: "Crocodile", vi: "Con cá sấu" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["crocodile", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a crocodile in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

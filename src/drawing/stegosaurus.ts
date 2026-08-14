import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-plates", name: "Draw the back plates", order: 1, geometry: "polygon",
    vector: { points: "310,480 350,340 400,465 450,325 500,460 550,325 600,465 650,340 690,480" },
    bounds: { x: 310, y: 325, width: 380, height: 155 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 3400, stepId: "step-1",
    voiceDescription: "Draw a row of pointed plates.", enabled: true,
  },
  {
    id: "02-body", name: "Draw the body", order: 2, geometry: "ellipse",
    vector: { cx: 500, cy: 580, rx: 250, ry: 130 },
    bounds: { x: 250, y: 450, width: 500, height: 260 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 6700, durationMs: 2800, stepId: "step-2",
    voiceDescription: "Draw one big oval body under them.", enabled: true,
  },
  {
    id: "03-tail", name: "Draw the tail", order: 3, geometry: "polygon",
    vector: { points: "720,520 895,415 745,610" },
    bounds: { x: 720, y: 415, width: 175, height: 195 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 9800, durationMs: 2400, stepId: "step-3",
    voiceDescription: "Add one pointed tail at the back.", enabled: true,
  },
  {
    id: "04-neck", name: "Draw the neck", order: 4, geometry: "polygon",
    vector: { points: "255,530 190,398 262,370 335,510" },
    bounds: { x: 190, y: 370, width: 145, height: 160 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 12500, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add one thick neck going up to the front.", enabled: true,
  },
  {
    id: "05-head", name: "Draw the head", order: 5, geometry: "ellipse",
    vector: { cx: 195, cy: 350, rx: 88, ry: 56 },
    bounds: { x: 107, y: 294, width: 176, height: 112 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 14800, durationMs: 2200, stepId: "step-5",
    voiceDescription: "Add one small head on the neck.", enabled: true,
  },
  {
    id: "06-eye", name: "Draw the eye", order: 6, geometry: "circle",
    vector: { cx: 170, cy: 338, r: 18 },
    bounds: { x: 152, y: 320, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 17300, durationMs: 1400, stepId: "step-6",
    voiceDescription: "Give it one round eye.", enabled: true,
  },
  {
    id: "07-front-leg", name: "Draw the front leg", order: 7, geometry: "path",
    vector: { d: "M400 700 L378 810" },
    bounds: { x: 378, y: 700, width: 22, height: 110 },
    startMs: 19000, durationMs: 1600, stepId: "step-7",
    voiceDescription: "Draw one short leg.", enabled: true,
  },
  {
    id: "08-back-leg", name: "Draw the back leg", order: 8, geometry: "path",
    vector: { d: "M620 700 L642 810" },
    bounds: { x: 620, y: 700, width: 22, height: 110 },
    startMs: 20800, durationMs: 1600, stepId: "step-7",
    voiceDescription: "Finish with the second short leg.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Plates", strokeIds: ["01-plates"], voiceText: "Draw a row of pointed plates." },
  { id: "step-2", order: 2, title: "Body", strokeIds: ["02-body"], voiceText: "Draw one big oval body under them." },
  { id: "step-3", order: 3, title: "Tail", strokeIds: ["03-tail"], voiceText: "Add one pointed tail at the back." },
  { id: "step-4", order: 4, title: "Neck", strokeIds: ["04-neck"], voiceText: "Add one thick neck going up to the front." },
  { id: "step-5", order: 5, title: "Head", strokeIds: ["05-head"], voiceText: "Add one small head on the neck." },
  { id: "step-6", order: 6, title: "Eye", strokeIds: ["06-eye"], voiceText: "Give it one round eye." },
  { id: "step-7", order: 7, title: "Legs", strokeIds: ["07-front-leg", "08-back-leg"], voiceText: "Finish with two short legs." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a dinosaur in just eight strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6600, endMs: 9700, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9700, endMs: 12400, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12400, endMs: 14700, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 14700, endMs: 17200, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 17200, endMs: 18900, text: steps[5]!.voiceText },
  { id: "step-7", startMs: 18900, endMs: 22600, text: steps[6]!.voiceText },
  { id: "result", startMs: 22900, endMs: 25300, text: "It's a stegosaurus!" },
  { id: "cta", startMs: 25600, endMs: 28700, text: "Great job! Try it yourself." },
];

export function createStegosaurusDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "48-animal-stegosaurus-001", slug: "easy-stegosaurus",
    name: { en: "Stegosaurus", vi: "Khủng long stegosaurus" }, category: "animals", subcategory: "dinosaurs",
    difficulty: 1, strokeCount: 8, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["stegosaurus", "dinosaur", "animal", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a dinosaur in just eight strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

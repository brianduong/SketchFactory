import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-19T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 500, cy: 600, rx: 170, ry: 148 },
    bounds: { x: 330, y: 452, width: 340, height: 296 },
    startMs: 3000, durationMs: 2500, stepId: "step-1",
    voiceDescription: "Draw one round body.", enabled: true,
  },
  {
    id: "02-head", name: "Draw the head", order: 2, geometry: "circle",
    vector: { cx: 400, cy: 370, r: 118 },
    bounds: { x: 282, y: 252, width: 236, height: 236 },
    style: { fill: "#FFFDF7" },
    startMs: 5800, durationMs: 1900, stepId: "step-1",
    voiceDescription: "Add a round head on top.", enabled: true,
  },
  {
    id: "03-tail", name: "Draw the tail", order: 3, geometry: "ellipse",
    vector: { cx: 760, cy: 675, rx: 118, ry: 68 },
    bounds: { x: 642, y: 607, width: 236, height: 136 },
    style: { fill: "#FFFDF7" },
    startMs: 8000, durationMs: 1900, stepId: "step-2",
    voiceDescription: "Add one big flat tail at the back.", enabled: true,
  },
  {
    id: "04-tail-line", name: "Tail line", order: 4, geometry: "line",
    vector: { x1: 688, y1: 632, x2: 842, y2: 716 },
    bounds: { x: 688, y: 632, width: 154, height: 84 },
    startMs: 10200, durationMs: 1200, stepId: "step-2",
    voiceDescription: "Draw one line across the flat tail.", enabled: true,
  },
  {
    id: "05-ear", name: "Draw the ear", order: 5, geometry: "circle",
    vector: { cx: 305, cy: 275, r: 32 },
    bounds: { x: 273, y: 243, width: 64, height: 64 },
    startMs: 11700, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Add one small round ear.", enabled: true,
  },
  {
    id: "06-muzzle", name: "Draw the muzzle", order: 6, geometry: "ellipse",
    vector: { cx: 355, cy: 420, rx: 72, ry: 50 },
    bounds: { x: 283, y: 370, width: 144, height: 100 },
    style: { fill: "#FFFDF7" },
    startMs: 13200, durationMs: 1900, stepId: "step-3",
    voiceDescription: "Draw a round muzzle at the front.", enabled: true,
  },
  {
    id: "07-nose", name: "Draw the nose", order: 7, geometry: "ellipse",
    vector: { cx: 355, cy: 388, rx: 22, ry: 15 },
    bounds: { x: 333, y: 373, width: 44, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 15400, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Put a small nose on top of it.", enabled: true,
  },
  {
    id: "08-eye", name: "Draw the eye", order: 8, geometry: "circle",
    vector: { cx: 415, cy: 330, r: 18 },
    bounds: { x: 397, y: 312, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16900, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Add one round eye.", enabled: true,
  },
  {
    id: "09-teeth", name: "Draw the teeth", order: 9, geometry: "rect",
    vector: { x: 331, y: 444, width: 48, height: 56 },
    bounds: { x: 331, y: 444, width: 48, height: 56 },
    startMs: 18400, durationMs: 1900, stepId: "step-4",
    voiceDescription: "Draw two big front teeth under the nose.", enabled: true,
  },
  {
    id: "10-teeth-split", name: "Split the teeth", order: 10, geometry: "line",
    vector: { x1: 355, y1: 444, x2: 355, y2: 500 },
    bounds: { x: 343, y: 444, width: 24, height: 56 },
    startMs: 20600, durationMs: 1200, stepId: "step-4",
    voiceDescription: "Finish with one line down the middle.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body", "02-head"], voiceText: "Draw one round body and a round head." },
  { id: "step-2", order: 2, title: "Tail", strokeIds: ["03-tail", "04-tail-line"], voiceText: "Add one big flat tail with a line across." },
  { id: "step-3", order: 3, title: "Face", strokeIds: ["05-ear", "06-muzzle", "07-nose", "08-eye"], voiceText: "Add an ear, a round muzzle, a nose and one eye." },
  { id: "step-4", order: 4, title: "Teeth", strokeIds: ["09-teeth", "10-teeth-split"], voiceText: "Finish with two big front teeth." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a beaver in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 7900, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 7900, endMs: 11600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11600, endMs: 18300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 18300, endMs: 22000, text: steps[3]!.voiceText },
  { id: "result", startMs: 22200, endMs: 24400, text: "It's a beaver!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createBeaverDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "60-animal-beaver-001", slug: "easy-beaver",
    name: { en: "Beaver", vi: "Con hải ly" }, category: "animals", subcategory: "wildlife",
    difficulty: 2, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["beaver", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a beaver in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

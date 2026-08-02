import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the head", order: 1, geometry: "circle",
    vector: { cx: 500, cy: 520, r: 245 },
    bounds: { x: 255, y: 275, width: 490, height: 490 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with a big circle.", enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left triangle ear", order: 2, geometry: "polygon",
    vector: { points: "315,365 335,160 455,315" },
    bounds: { x: 315, y: 160, width: 140, height: 205 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 6000, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add one triangle ear.", enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right triangle ear", order: 3, geometry: "polygon",
    vector: { points: "545,315 665,160 685,365" },
    bounds: { x: 545, y: 160, width: 140, height: 205 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 8200, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add another triangle ear.", enabled: true,
  },
  {
    id: "04-left-eye", name: "Draw the left eye", order: 4, geometry: "circle",
    vector: { cx: 420, cy: 500, r: 18 },
    bounds: { x: 402, y: 482, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 10800, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the first eye.", enabled: true,
  },
  {
    id: "05-right-eye", name: "Draw the right eye", order: 5, geometry: "circle",
    vector: { cx: 580, cy: 500, r: 18 },
    bounds: { x: 562, y: 482, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12500, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the second eye.", enabled: true,
  },
  {
    id: "06-snout", name: "Draw the snout", order: 6, geometry: "ellipse",
    vector: { cx: 500, cy: 610, rx: 125, ry: 88 },
    bounds: { x: 375, y: 522, width: 250, height: 176 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 14200, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add an oval snout.", enabled: true,
  },
  {
    id: "07-left-nostril", name: "Add the left nostril", order: 7, geometry: "circle",
    vector: { cx: 455, cy: 610, r: 15 },
    bounds: { x: 440, y: 595, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16700, durationMs: 1100, stepId: "step-4",
    voiceDescription: "Add the first nostril.", enabled: true,
  },
  {
    id: "08-right-nostril", name: "Add the right nostril", order: 8, geometry: "circle",
    vector: { cx: 545, cy: 610, r: 15 },
    bounds: { x: 530, y: 595, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18300, durationMs: 1100, stepId: "step-4",
    voiceDescription: "Add the second nostril.", enabled: true,
  },
  {
    id: "09-smile", name: "Draw the smile", order: 9, geometry: "path",
    vector: { d: "M440 690 Q500 740 560 690" },
    bounds: { x: 440, y: 690, width: 120, height: 50 },
    startMs: 20200, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with a big circle." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["02-left-ear", "03-right-ear"], voiceText: "Add two triangle ears." },
  { id: "step-3", order: 3, title: "Eyes", strokeIds: ["04-left-eye", "05-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-4", order: 4, title: "Snout", strokeIds: ["06-snout", "07-left-nostril", "08-right-nostril"], voiceText: "Add an oval snout and two little nostrils." },
  { id: "step-5", order: 5, title: "Smile", strokeIds: ["09-smile"], voiceText: "Finish with one happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a pig in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 10200, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10500, endMs: 14000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14000, endMs: 19900, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 19900, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a pig!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createPigDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "animal-pig-001", slug: "easy-pig",
    name: { en: "Pig", vi: "Con heo" }, category: "animals", subcategory: "farm",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["pig", "animal", "farm", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a pig in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

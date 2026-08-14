import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-11T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-ear", name: "Draw the left ear", order: 1, geometry: "circle",
    vector: { cx: 250, cy: 430, r: 135 },
    bounds: { x: 115, y: 295, width: 270, height: 270 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2600, stepId: "step-1",
    voiceDescription: "Start with one big round ear.", enabled: true,
  },
  {
    id: "02-right-ear", name: "Draw the right ear", order: 2, geometry: "circle",
    vector: { cx: 750, cy: 430, r: 135 },
    bounds: { x: 615, y: 295, width: 270, height: 270 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 5900, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Add the second big round ear.", enabled: true,
  },
  {
    id: "03-head", name: "Draw the head", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 520, r: 225 },
    bounds: { x: 275, y: 295, width: 450, height: 450 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 8600, durationMs: 2800, stepId: "step-2",
    voiceDescription: "Draw one big round head between them.", enabled: true,
  },
  {
    id: "04-nose", name: "Draw the nose", order: 4, geometry: "ellipse",
    vector: { cx: 500, cy: 545, rx: 80, ry: 95 },
    bounds: { x: 420, y: 450, width: 160, height: 190 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 11700, durationMs: 2600, stepId: "step-3",
    voiceDescription: "Add one large oval nose in the middle.", enabled: true,
  },
  {
    id: "05-left-eye", name: "Draw the left eye", order: 5, geometry: "circle",
    vector: { cx: 360, cy: 470, r: 28 },
    bounds: { x: 332, y: 442, width: 56, height: 56 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14600, durationMs: 1600, stepId: "step-4",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "06-right-eye", name: "Draw the right eye", order: 6, geometry: "circle",
    vector: { cx: 640, cy: 470, r: 28 },
    bounds: { x: 612, y: 442, width: 56, height: 56 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16500, durationMs: 1600, stepId: "step-4",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "07-smile", name: "Draw the smile", order: 7, geometry: "path",
    vector: { d: "M437 685 Q500 723 563 685" },
    bounds: { x: 437, y: 685, width: 126, height: 38 },
    startMs: 18400, durationMs: 2700, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Ears", strokeIds: ["01-left-ear", "02-right-ear"], voiceText: "Start with two big round ears." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["03-head"], voiceText: "Draw one big round head between them." },
  { id: "step-3", order: 3, title: "Nose", strokeIds: ["04-nose"], voiceText: "Add one large oval nose in the middle." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["05-left-eye", "06-right-eye"], voiceText: "Now draw two round eyes." },
  { id: "step-5", order: 5, title: "Smile", strokeIds: ["07-smile"], voiceText: "Finish with one happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a koala in just seven strokes?" },
  { id: "step-1", startMs: 2700, endMs: 8500, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 8500, endMs: 11600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11600, endMs: 14500, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14500, endMs: 18300, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18300, endMs: 21400, text: steps[4]!.voiceText },
  { id: "result", startMs: 21700, endMs: 23900, text: "It's a koala!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createKoalaDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "27-animal-koala-001", slug: "easy-koala",
    name: { en: "Koala", vi: "Con gấu túi" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["koala", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a koala in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-left-wing", name: "Draw the left wing", order: 1, geometry: "polygon",
    vector: { points: "400,430 150,350 215,520 270,455 330,545 400,470" },
    bounds: { x: 150, y: 350, width: 250, height: 195 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with one pointy wing.", enabled: true,
  },
  {
    id: "02-right-wing", name: "Draw the right wing", order: 2, geometry: "polygon",
    vector: { points: "600,430 850,350 785,520 730,455 670,545 600,470" },
    bounds: { x: 600, y: 350, width: 250, height: 195 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5700, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Draw the second pointy wing.", enabled: true,
  },
  {
    id: "03-left-ear", name: "Draw the left ear", order: 3, geometry: "polygon",
    vector: { points: "425,400 445,290 495,390" },
    bounds: { x: 425, y: 290, width: 70, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 8200, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add one pointy ear.", enabled: true,
  },
  {
    id: "04-right-ear", name: "Draw the right ear", order: 4, geometry: "polygon",
    vector: { points: "575,400 555,290 505,390" },
    bounds: { x: 505, y: 290, width: 70, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 9900, durationMs: 1400, stepId: "step-2",
    voiceDescription: "Add the second pointy ear.", enabled: true,
  },
  {
    id: "05-body", name: "Draw the body", order: 5, geometry: "ellipse",
    vector: { cx: 500, cy: 520, rx: 115, ry: 145 },
    bounds: { x: 385, y: 375, width: 230, height: 290 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 11600, durationMs: 2600, stepId: "step-3",
    voiceDescription: "Draw one oval body in the middle.", enabled: true,
  },
  {
    id: "06-left-eye", name: "Draw the left eye", order: 6, geometry: "circle",
    vector: { cx: 460, cy: 470, r: 22 },
    bounds: { x: 438, y: 448, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14500, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "07-right-eye", name: "Draw the right eye", order: 7, geometry: "circle",
    vector: { cx: 540, cy: 470, r: 22 },
    bounds: { x: 518, y: 448, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16100, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "08-smile", name: "Draw the smile", order: 8, geometry: "path",
    vector: { d: "M450 560 Q500 608 550 560" },
    bounds: { x: 450, y: 560, width: 100, height: 48 },
    startMs: 17800, durationMs: 2600, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Wings", strokeIds: ["01-left-wing", "02-right-wing"], voiceText: "Start with two pointy wings." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["03-left-ear", "04-right-ear"], voiceText: "Add two pointy ears on top." },
  { id: "step-3", order: 3, title: "Body", strokeIds: ["05-body"], voiceText: "Draw one oval body in the middle." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["06-left-eye", "07-right-eye"], voiceText: "Now draw two round eyes." },
  { id: "step-5", order: 5, title: "Smile", strokeIds: ["08-smile"], voiceText: "Finish with one happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a bat in just eight strokes?" },
  { id: "step-1", startMs: 2700, endMs: 8100, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 8100, endMs: 11500, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11500, endMs: 14400, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14400, endMs: 17700, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 17700, endMs: 20600, text: steps[4]!.voiceText },
  { id: "result", startMs: 21000, endMs: 23200, text: "It's a bat!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createBatDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "32-animal-bat-001", slug: "easy-bat",
    name: { en: "Bat", vi: "Con dơi" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 8, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["bat", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a bat in just eight strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

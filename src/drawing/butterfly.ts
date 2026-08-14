import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-11T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 500, cy: 510, rx: 52, ry: 190 },
    bounds: { x: 448, y: 320, width: 104, height: 380 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2300, stepId: "step-1",
    voiceDescription: "Start with one tall oval body.", enabled: true,
  },
  {
    id: "02-left-top-wing", name: "Draw the left top wing", order: 2, geometry: "ellipse",
    vector: { cx: 305, cy: 390, rx: 143, ry: 120 },
    bounds: { x: 162, y: 270, width: 286, height: 240 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 5600, durationMs: 2100, stepId: "step-2",
    voiceDescription: "Add one big oval wing on the left.", enabled: true,
  },
  {
    id: "03-right-top-wing", name: "Draw the right top wing", order: 3, geometry: "ellipse",
    vector: { cx: 695, cy: 390, rx: 143, ry: 120 },
    bounds: { x: 552, y: 270, width: 286, height: 240 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 7900, durationMs: 2000, stepId: "step-2",
    voiceDescription: "Add the second big wing on the right.", enabled: true,
  },
  {
    id: "04-left-bottom-wing", name: "Draw the left bottom wing", order: 4, geometry: "ellipse",
    vector: { cx: 340, cy: 630, rx: 108, ry: 90 },
    bounds: { x: 232, y: 540, width: 216, height: 180 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 10200, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add one smaller wing below.", enabled: true,
  },
  {
    id: "05-right-bottom-wing", name: "Draw the right bottom wing", order: 5, geometry: "ellipse",
    vector: { cx: 660, cy: 630, rx: 108, ry: 90 },
    bounds: { x: 552, y: 540, width: 216, height: 180 },
    style: { stroke: "#111111", strokeWidth: 24 },
    startMs: 12200, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add the second smaller wing below.", enabled: true,
  },
  {
    id: "06-left-antenna", name: "Add the left antenna", order: 6, geometry: "path",
    vector: { d: "M478 335 Q432 250 388 226" },
    bounds: { x: 388, y: 226, width: 90, height: 109 },
    startMs: 14300, durationMs: 1800, stepId: "step-4",
    voiceDescription: "Draw one thin antenna.", enabled: true,
  },
  {
    id: "07-right-antenna", name: "Add the right antenna", order: 7, geometry: "path",
    vector: { d: "M522 335 Q568 250 612 226" },
    bounds: { x: 522, y: 226, width: 90, height: 109 },
    startMs: 16400, durationMs: 1800, stepId: "step-4",
    voiceDescription: "Draw the second thin antenna.", enabled: true,
  },
  {
    id: "08-left-eye", name: "Draw the left eye", order: 8, geometry: "circle",
    vector: { cx: 480, cy: 420, r: 15 },
    bounds: { x: 465, y: 405, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18500, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Draw the first little eye.", enabled: true,
  },
  {
    id: "09-right-eye", name: "Draw the right eye", order: 9, geometry: "circle",
    vector: { cx: 520, cy: 420, r: 15 },
    bounds: { x: 505, y: 405, width: 30, height: 30 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 20100, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Finish with the second little eye.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one tall oval body." },
  { id: "step-2", order: 2, title: "Top wings", strokeIds: ["02-left-top-wing", "03-right-top-wing"], voiceText: "Add two big oval wings on the sides." },
  { id: "step-3", order: 3, title: "Bottom wings", strokeIds: ["04-left-bottom-wing", "05-right-bottom-wing"], voiceText: "Add two smaller wings below them." },
  { id: "step-4", order: 4, title: "Antennae", strokeIds: ["06-left-antenna", "07-right-antenna"], voiceText: "Draw two thin antennae on top." },
  { id: "step-5", order: 5, title: "Eyes", strokeIds: ["08-left-eye", "09-right-eye"], voiceText: "Finish with two little eyes." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a butterfly in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5500, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5500, endMs: 10100, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10100, endMs: 14200, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14200, endMs: 18400, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18400, endMs: 21800, text: steps[4]!.voiceText },
  { id: "result", startMs: 22100, endMs: 24300, text: "It's a butterfly!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createButterflyDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "25-animal-butterfly-001", slug: "easy-butterfly",
    name: { en: "Butterfly", vi: "Con bướm" }, category: "animals", subcategory: "insects",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["butterfly", "animal", "insect", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a butterfly in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

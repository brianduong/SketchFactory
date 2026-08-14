import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head", name: "Draw the head", order: 1, geometry: "circle",
    vector: { cx: 225, cy: 620, r: 100 },
    bounds: { x: 125, y: 520, width: 200, height: 200 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with one round head.", enabled: true,
  },
  {
    id: "02-segment-one", name: "Draw the first body part", order: 2, geometry: "circle",
    vector: { cx: 375, cy: 555, r: 88 },
    bounds: { x: 287, y: 467, width: 176, height: 176 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 5700, durationMs: 1900, stepId: "step-2",
    voiceDescription: "Add one round body part.", enabled: true,
  },
  {
    id: "03-segment-two", name: "Draw the second body part", order: 3, geometry: "circle",
    vector: { cx: 515, cy: 525, r: 88 },
    bounds: { x: 427, y: 437, width: 176, height: 176 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 7900, durationMs: 1900, stepId: "step-2",
    voiceDescription: "Add another one beside it.", enabled: true,
  },
  {
    id: "04-segment-three", name: "Draw the third body part", order: 4, geometry: "circle",
    vector: { cx: 655, cy: 555, r: 88 },
    bounds: { x: 567, y: 467, width: 176, height: 176 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 10100, durationMs: 1900, stepId: "step-2",
    voiceDescription: "Keep the line going.", enabled: true,
  },
  {
    id: "05-segment-four", name: "Draw the last body part", order: 5, geometry: "circle",
    vector: { cx: 790, cy: 625, r: 88 },
    bounds: { x: 702, y: 537, width: 176, height: 176 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 12300, durationMs: 1900, stepId: "step-2",
    voiceDescription: "One more to finish the body.", enabled: true,
  },
  {
    id: "06-left-antenna", name: "Add the left antenna", order: 6, geometry: "path",
    vector: { d: "M188 528 L158 435" },
    bounds: { x: 158, y: 435, width: 30, height: 93 },
    startMs: 14500, durationMs: 1500, stepId: "step-3",
    voiceDescription: "Draw one little antenna.", enabled: true,
  },
  {
    id: "07-right-antenna", name: "Add the right antenna", order: 7, geometry: "path",
    vector: { d: "M258 525 L292 435" },
    bounds: { x: 258, y: 435, width: 34, height: 90 },
    startMs: 16200, durationMs: 1500, stepId: "step-3",
    voiceDescription: "Draw the second antenna.", enabled: true,
  },
  {
    id: "08-left-eye", name: "Draw the left eye", order: 8, geometry: "circle",
    vector: { cx: 190, cy: 595, r: 20 },
    bounds: { x: 170, y: 575, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 17900, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "09-right-eye", name: "Draw the right eye", order: 9, geometry: "circle",
    vector: { cx: 258, cy: 590, r: 20 },
    bounds: { x: 238, y: 570, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19400, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the second round eye.", enabled: true,
  },
  {
    id: "10-smile", name: "Draw the smile", order: 10, geometry: "path",
    vector: { d: "M178 662 Q225 700 272 662" },
    bounds: { x: 178, y: 662, width: 94, height: 38 },
    startMs: 20900, durationMs: 1800, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head"], voiceText: "Start with one round head." },
  { id: "step-2", order: 2, title: "Body", strokeIds: ["02-segment-one", "03-segment-two", "04-segment-three", "05-segment-four"], voiceText: "Add four round body parts in a curve." },
  { id: "step-3", order: 3, title: "Antennae", strokeIds: ["06-left-antenna", "07-right-antenna"], voiceText: "Draw two little antennae on the head." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["08-left-eye", "09-right-eye"], voiceText: "Now add two round eyes." },
  { id: "step-5", order: 5, title: "Smile", strokeIds: ["10-smile"], voiceText: "Finish with one happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a caterpillar in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5600, endMs: 14400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 14400, endMs: 17800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 17800, endMs: 20800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 20800, endMs: 22900, text: steps[4]!.voiceText },
  { id: "result", startMs: 23200, endMs: 25400, text: "It's a caterpillar!" },
  { id: "cta", startMs: 25700, endMs: 28900, text: "Great job! Try it yourself." },
];

export function createCaterpillarDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "38-animal-caterpillar-001", slug: "easy-caterpillar",
    name: { en: "Caterpillar", vi: "Con sâu" }, category: "animals", subcategory: "insects",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["caterpillar", "animal", "insect", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a caterpillar in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

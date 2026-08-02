import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-31T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 500, cy: 530, rx: 205, ry: 285 },
    bounds: { x: 295, y: 245, width: 410, height: 570 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with one tall oval body.", enabled: true,
  },
  {
    id: "02-belly", name: "Draw the belly", order: 2, geometry: "ellipse",
    vector: { cx: 500, cy: 585, rx: 135, ry: 215 },
    bounds: { x: 365, y: 370, width: 270, height: 430 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 20 },
    startMs: 5400, durationMs: 2000, stepId: "step-2",
    voiceDescription: "Add one smaller oval belly.", enabled: true,
  },
  {
    id: "03-left-wing", name: "Add the left wing", order: 3, geometry: "polygon",
    vector: { points: "310,420 215,620 325,660" },
    bounds: { x: 215, y: 420, width: 110, height: 240 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 7600, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Add one wing on the left.", enabled: true,
  },
  {
    id: "04-right-wing", name: "Add the right wing", order: 4, geometry: "polygon",
    vector: { points: "690,420 785,620 675,660" },
    bounds: { x: 675, y: 420, width: 110, height: 240 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 9600, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add the second wing on the right.", enabled: true,
  },
  {
    id: "05-left-eye", name: "Draw the left eye", order: 5, geometry: "circle",
    vector: { cx: 440, cy: 320, r: 22 },
    bounds: { x: 418, y: 298, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11400, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the first little eye.", enabled: true,
  },
  {
    id: "06-right-eye", name: "Draw the right eye", order: 6, geometry: "circle",
    vector: { cx: 560, cy: 320, r: 22 },
    bounds: { x: 538, y: 298, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12900, durationMs: 1300, stepId: "step-4",
    voiceDescription: "Draw the second little eye.", enabled: true,
  },
  {
    id: "07-beak", name: "Add the beak", order: 7, geometry: "polygon",
    vector: { points: "455,375 545,375 500,445" },
    bounds: { x: 455, y: 375, width: 90, height: 70 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 18 },
    startMs: 14400, durationMs: 1500, stepId: "step-5",
    voiceDescription: "Add one small triangle beak.", enabled: true,
  },
  {
    id: "08-left-foot", name: "Add the left foot", order: 8, geometry: "polygon",
    vector: { points: "395,805 330,865 470,865" },
    bounds: { x: 330, y: 805, width: 140, height: 60 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 18 },
    startMs: 16400, durationMs: 1900, stepId: "step-6",
    voiceDescription: "Add one flat foot.", enabled: true,
  },
  {
    id: "09-right-foot", name: "Add the right foot", order: 9, geometry: "polygon",
    vector: { points: "605,805 530,865 670,865" },
    bounds: { x: 530, y: 805, width: 140, height: 60 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 18 },
    startMs: 18600, durationMs: 2500, stepId: "step-6",
    voiceDescription: "Finish with the second flat foot.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one tall oval body." },
  { id: "step-2", order: 2, title: "Belly", strokeIds: ["02-belly"], voiceText: "Add one smaller oval belly." },
  { id: "step-3", order: 3, title: "Wings", strokeIds: ["03-left-wing", "04-right-wing"], voiceText: "Add two simple wings on the sides." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["05-left-eye", "06-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-5", order: 5, title: "Beak", strokeIds: ["07-beak"], voiceText: "Add one small triangle beak." },
  { id: "step-6", order: 6, title: "Feet", strokeIds: ["08-left-foot", "09-right-foot"], voiceText: "Finish with two flat feet." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a penguin in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5300, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5300, endMs: 7500, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 7500, endMs: 11300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 11300, endMs: 14300, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 14300, endMs: 16300, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 16300, endMs: 21200, text: steps[5]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24200, text: "It's a penguin!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createPenguinDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "16-animal-penguin-001", slug: "easy-penguin",
    name: { en: "Penguin", vi: "Chim cánh cụt" }, category: "animals", subcategory: "birds",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["penguin", "animal", "bird", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a penguin in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

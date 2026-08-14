import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-dome", name: "Draw the dome", order: 1, geometry: "path",
    vector: { d: "M250 560 C270 260 730 260 750 560" },
    bounds: { x: 250, y: 260, width: 500, height: 300 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2600, stepId: "step-1",
    voiceDescription: "Start with one big dome.", enabled: true,
  },
  {
    id: "02-left-wave", name: "Draw the left wave", order: 2, geometry: "path",
    vector: { d: "M250 560 Q315 645 380 560" },
    bounds: { x: 250, y: 560, width: 130, height: 85 },
    startMs: 5900, durationMs: 1300, stepId: "step-2",
    voiceDescription: "Add one small wave underneath.", enabled: true,
  },
  {
    id: "03-middle-wave", name: "Draw the middle wave", order: 3, geometry: "path",
    vector: { d: "M380 560 Q500 660 620 560" },
    bounds: { x: 380, y: 560, width: 240, height: 100 },
    startMs: 7400, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add a wider wave in the middle.", enabled: true,
  },
  {
    id: "04-right-wave", name: "Draw the right wave", order: 4, geometry: "path",
    vector: { d: "M620 560 Q685 645 750 560" },
    bounds: { x: 620, y: 560, width: 130, height: 85 },
    startMs: 9100, durationMs: 1300, stepId: "step-2",
    voiceDescription: "Add the last small wave.", enabled: true,
  },
  {
    id: "05-tentacle-one", name: "Draw the first tentacle", order: 5, geometry: "path",
    vector: { d: "M320 610 C280 700 360 745 320 830" },
    bounds: { x: 280, y: 610, width: 80, height: 220 },
    startMs: 10700, durationMs: 1700, stepId: "step-3",
    voiceDescription: "Draw one wavy tentacle.", enabled: true,
  },
  {
    id: "06-tentacle-two", name: "Draw the second tentacle", order: 6, geometry: "path",
    vector: { d: "M440 620 C400 710 480 755 440 840" },
    bounds: { x: 400, y: 620, width: 80, height: 220 },
    startMs: 12600, durationMs: 1700, stepId: "step-3",
    voiceDescription: "Draw the second tentacle.", enabled: true,
  },
  {
    id: "07-tentacle-three", name: "Draw the third tentacle", order: 7, geometry: "path",
    vector: { d: "M560 620 C520 710 600 755 560 840" },
    bounds: { x: 520, y: 620, width: 80, height: 220 },
    startMs: 14500, durationMs: 1700, stepId: "step-3",
    voiceDescription: "Draw the third tentacle.", enabled: true,
  },
  {
    id: "08-tentacle-four", name: "Draw the fourth tentacle", order: 8, geometry: "path",
    vector: { d: "M680 610 C640 700 720 745 680 830" },
    bounds: { x: 640, y: 610, width: 80, height: 220 },
    startMs: 16400, durationMs: 1700, stepId: "step-3",
    voiceDescription: "Draw the last tentacle.", enabled: true,
  },
  {
    id: "09-left-eye", name: "Draw the left eye", order: 9, geometry: "circle",
    vector: { cx: 430, cy: 420, r: 26 },
    bounds: { x: 404, y: 394, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18400, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "10-right-eye", name: "Draw the right eye", order: 10, geometry: "circle",
    vector: { cx: 570, cy: 420, r: 26 },
    bounds: { x: 544, y: 394, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 20000, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Finish with the second round eye.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Dome", strokeIds: ["01-dome"], voiceText: "Start with one big dome." },
  { id: "step-2", order: 2, title: "Waves", strokeIds: ["02-left-wave", "03-middle-wave", "04-right-wave"], voiceText: "Add three waves along the bottom." },
  { id: "step-3", order: 3, title: "Tentacles", strokeIds: ["05-tentacle-one", "06-tentacle-two", "07-tentacle-three", "08-tentacle-four"], voiceText: "Draw four wavy tentacles hanging down." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["09-left-eye", "10-right-eye"], voiceText: "Finish with two round eyes." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a jellyfish in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 10600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10600, endMs: 18300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 18300, endMs: 21500, text: steps[3]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24000, text: "It's a jellyfish!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createJellyfishDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "31-animal-jellyfish-001", slug: "easy-jellyfish",
    name: { en: "Jellyfish", vi: "Con sứa" }, category: "animals", subcategory: "sea",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["jellyfish", "animal", "sea", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a jellyfish in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

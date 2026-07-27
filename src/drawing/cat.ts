import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the head", order: 1, geometry: "circle",
    vector: { cx: 500, cy: 510, r: 265 }, bounds: { x: 235, y: 245, width: 530, height: 530 },
    startMs: 3000, durationMs: 2400, stepId: "step-1", voiceDescription: "Start with a big circle.",
    enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left ear", order: 2, geometry: "path",
    vector: { d: "M300 330 L315 145 L440 270" }, bounds: { x: 300, y: 145, width: 140, height: 185 },
    startMs: 6000, durationMs: 1800, stepId: "step-2", voiceDescription: "Add one triangle ear.",
    enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right ear", order: 3, geometry: "path",
    vector: { d: "M560 270 L685 145 L700 330" }, bounds: { x: 560, y: 145, width: 140, height: 185 },
    startMs: 8200, durationMs: 1800, stepId: "step-2", voiceDescription: "Add another triangle ear.",
    enabled: true,
  },
  {
    id: "04-left-eye", name: "Draw the left eye", order: 4, geometry: "circle",
    vector: { cx: 410, cy: 490, r: 18 }, bounds: { x: 392, y: 472, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 }, startMs: 10800, durationMs: 1200,
    stepId: "step-3", voiceDescription: "Draw the first eye.", enabled: true,
  },
  {
    id: "05-right-eye", name: "Draw the right eye", order: 5, geometry: "circle",
    vector: { cx: 590, cy: 490, r: 18 }, bounds: { x: 572, y: 472, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 }, startMs: 12500, durationMs: 1200,
    stepId: "step-3", voiceDescription: "Draw the second eye.", enabled: true,
  },
  {
    id: "06-nose", name: "Add the nose", order: 6, geometry: "circle",
    vector: { cx: 500, cy: 575, r: 24 },
    bounds: { x: 476, y: 551, width: 48, height: 48 }, style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13000, durationMs: 1200, stepId: "step-4", voiceDescription: "Add a tiny round nose.", enabled: true,
  },
  {
    id: "07-left-mouth", name: "Draw the left mouth curve", order: 7, geometry: "path",
    vector: { d: "M500 605 Q465 650 430 615" },
    bounds: { x: 430, y: 605, width: 70, height: 45 }, startMs: 14500, durationMs: 1400,
    stepId: "step-4", voiceDescription: "Draw one curve to the left.", enabled: true,
  },
  {
    id: "08-right-mouth", name: "Draw the right mouth curve", order: 8, geometry: "path",
    vector: { d: "M500 605 Q535 650 570 615" },
    bounds: { x: 500, y: 605, width: 70, height: 45 }, startMs: 16200, durationMs: 1400,
    stepId: "step-4", voiceDescription: "Draw one curve to the right.", enabled: true,
  },
  {
    id: "09-left-whisker", name: "Add the left whisker", order: 9, geometry: "line",
    vector: { x1: 390, y1: 590, x2: 245, y2: 565 },
    bounds: { x: 245, y: 565, width: 145, height: 25 }, startMs: 18000, durationMs: 1600,
    stepId: "step-5", voiceDescription: "Draw one whisker on the left.", enabled: true,
  },
  {
    id: "10-right-whisker", name: "Add the right whisker", order: 10, geometry: "line",
    vector: { x1: 610, y1: 590, x2: 755, y2: 565 },
    bounds: { x: 610, y: 565, width: 145, height: 25 }, startMs: 19900, durationMs: 1900,
    stepId: "step-5", voiceDescription: "Draw one whisker on the right.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with a big circle." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["02-left-ear", "03-right-ear"], voiceText: "Add two triangle ears." },
  { id: "step-3", order: 3, title: "Eyes", strokeIds: ["04-left-eye", "05-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-4", order: 4, title: "Face", strokeIds: ["06-nose", "07-left-mouth", "08-right-mouth"], voiceText: "Add a tiny nose, then two simple mouth curves." },
  { id: "step-5", order: 5, title: "Whiskers", strokeIds: ["09-left-whisker", "10-right-whisker"], voiceText: "Finish with two simple whiskers." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a cat in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 10200, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10500, endMs: 14000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12700, endMs: 17800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 17800, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a cat!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createCatDrawing(): Drawing {
  return {
    schemaVersion: 1,
    id: "animal-cat-001",
    slug: "easy-cat",
    name: { en: "Cat", vi: "Con mèo" },
    category: "animals",
    subcategory: "pets",
    difficulty: 1,
    strokeCount: 10,
    estimatedDrawingSeconds: 10,
    status: "draft",
    tags: ["cat", "animal", "pet", "easy drawing"],
    canvas: { width: 1000, height: 1000 },
    steps,
    strokes,
    voiceScript: {
      language: "en-US",
      provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "macos-say",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "Samantha",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a cat in just ten strokes?",
    },
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

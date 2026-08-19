import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-19T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-shell", name: "Draw the shell", order: 1, geometry: "circle",
    vector: { cx: 500, cy: 540, r: 220 },
    bounds: { x: 280, y: 320, width: 440, height: 440 },
    startMs: 3000, durationMs: 3000, stepId: "step-1",
    voiceDescription: "Draw one big round shell.", enabled: true,
  },
  {
    id: "02-head", name: "Draw the head", order: 2, geometry: "ellipse",
    vector: { cx: 500, cy: 330, rx: 110, ry: 70 },
    bounds: { x: 390, y: 260, width: 220, height: 140 },
    style: { fill: "#FFFDF7" },
    startMs: 6300, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add a small head on top.", enabled: true,
  },
  {
    id: "03-split", name: "Draw the middle line", order: 3, geometry: "line",
    vector: { x1: 500, y1: 400, x2: 500, y2: 750 },
    bounds: { x: 488, y: 400, width: 24, height: 350 },
    startMs: 8900, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Draw one line down the middle.", enabled: true,
  },
  {
    id: "04-dot-one", name: "First dot", order: 4, geometry: "circle",
    vector: { cx: 400, cy: 470, r: 38 },
    bounds: { x: 362, y: 432, width: 76, height: 76 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11500, durationMs: 1400, stepId: "step-3",
    voiceDescription: "Add one big dot.", enabled: true,
  },
  {
    id: "05-dot-two", name: "Second dot", order: 5, geometry: "circle",
    vector: { cx: 620, cy: 470, r: 38 },
    bounds: { x: 582, y: 432, width: 76, height: 76 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 13200, durationMs: 1400, stepId: "step-3",
    voiceDescription: "One dot on the other side.", enabled: true,
  },
  {
    id: "06-dot-three", name: "Third dot", order: 6, geometry: "circle",
    vector: { cx: 400, cy: 650, r: 38 },
    bounds: { x: 362, y: 612, width: 76, height: 76 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14900, durationMs: 1400, stepId: "step-3",
    voiceDescription: "One more dot down here.", enabled: true,
  },
  {
    id: "07-dot-four", name: "Fourth dot", order: 7, geometry: "circle",
    vector: { cx: 620, cy: 650, r: 38 },
    bounds: { x: 582, y: 612, width: 76, height: 76 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16600, durationMs: 1400, stepId: "step-3",
    voiceDescription: "Add the last dot.", enabled: true,
  },
  {
    id: "08-antenna-left", name: "Left antenna", order: 8, geometry: "line",
    vector: { x1: 445, y1: 275, x2: 395, y2: 210 },
    bounds: { x: 395, y: 210, width: 50, height: 65 },
    startMs: 18300, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Add one short antenna.", enabled: true,
  },
  {
    id: "09-antenna-right", name: "Right antenna", order: 9, geometry: "line",
    vector: { x1: 555, y1: 275, x2: 605, y2: 210 },
    bounds: { x: 555, y: 210, width: 50, height: 65 },
    startMs: 20000, durationMs: 1400, stepId: "step-4",
    voiceDescription: "Finish with the second antenna.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Shell", strokeIds: ["01-shell"], voiceText: "Draw one big round shell." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["02-head"], voiceText: "Add a small head on top." },
  { id: "step-3", order: 3, title: "Dots", strokeIds: ["03-split", "04-dot-one", "05-dot-two", "06-dot-three", "07-dot-four"], voiceText: "Draw a line down the middle and four big dots." },
  { id: "step-4", order: 4, title: "Antennae", strokeIds: ["08-antenna-left", "09-antenna-right"], voiceText: "Finish with two short antennae." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a ladybug in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 6200, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 6200, endMs: 8800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8800, endMs: 18200, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 18200, endMs: 21600, text: steps[3]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24000, text: "It's a ladybug!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createLadybugDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "54-animal-ladybug-001", slug: "easy-ladybug",
    name: { en: "Ladybug", vi: "Con bọ rùa" }, category: "animals", subcategory: "insects",
    difficulty: 2, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["ladybug", "animal", "insect", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a ladybug in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-back", name: "Draw the top of the body", order: 1, geometry: "path",
    vector: { d: "M150 520 C330 240 600 780 700 470" },
    bounds: { x: 150, y: 240, width: 550, height: 540 },
    startMs: 3000, durationMs: 3000, stepId: "step-1",
    voiceDescription: "Start with one long wavy curve.", enabled: true,
  },
  {
    id: "02-belly", name: "Draw the underside", order: 2, geometry: "path",
    vector: { d: "M150 630 C330 350 600 890 700 580" },
    bounds: { x: 150, y: 350, width: 550, height: 540 },
    startMs: 6300, durationMs: 3000, stepId: "step-1",
    voiceDescription: "Draw a second curve under it.", enabled: true,
  },
  {
    id: "03-tail-tip", name: "Close the tail", order: 3, geometry: "path",
    vector: { d: "M150 520 Q105 575 150 630" },
    bounds: { x: 105, y: 520, width: 45, height: 110 },
    startMs: 9600, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Join the two curves at the tail.", enabled: true,
  },
  {
    id: "04-head", name: "Draw the head", order: 4, geometry: "ellipse",
    vector: { cx: 740, cy: 525, rx: 80, ry: 62 },
    bounds: { x: 660, y: 463, width: 160, height: 124 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 11400, durationMs: 2600, stepId: "step-3",
    voiceDescription: "Add one small oval head.", enabled: true,
  },
  {
    id: "05-eye", name: "Draw the eye", order: 5, geometry: "circle",
    vector: { cx: 770, cy: 500, r: 18 },
    bounds: { x: 752, y: 482, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 14300, durationMs: 1600, stepId: "step-4",
    voiceDescription: "Add one round eye.", enabled: true,
  },
  {
    id: "06-tongue-top", name: "Draw the tongue", order: 6, geometry: "path",
    vector: { d: "M818 528 L890 502" },
    bounds: { x: 818, y: 502, width: 72, height: 26 },
    startMs: 16200, durationMs: 2400, stepId: "step-5",
    voiceDescription: "Draw one thin tongue.", enabled: true,
  },
  {
    id: "07-tongue-fork", name: "Split the tongue", order: 7, geometry: "path",
    vector: { d: "M818 528 L890 554" },
    bounds: { x: 818, y: 528, width: 72, height: 26 },
    startMs: 18900, durationMs: 2400, stepId: "step-5",
    voiceDescription: "Finish with the second half of the tongue.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-back", "02-belly"], voiceText: "Start with two long wavy curves for the body." },
  { id: "step-2", order: 2, title: "Tail", strokeIds: ["03-tail-tip"], voiceText: "Join the two curves at the tail." },
  { id: "step-3", order: 3, title: "Head", strokeIds: ["04-head"], voiceText: "Add one small oval head at the other end." },
  { id: "step-4", order: 4, title: "Eye", strokeIds: ["05-eye"], voiceText: "Give it one round eye." },
  { id: "step-5", order: 5, title: "Tongue", strokeIds: ["06-tongue-top", "07-tongue-fork"], voiceText: "Finish with two thin lines for the forked tongue." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a snake in just seven strokes?" },
  { id: "step-1", startMs: 2700, endMs: 9500, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 9500, endMs: 11300, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 11300, endMs: 14200, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14200, endMs: 16100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 16100, endMs: 21400, text: steps[4]!.voiceText },
  { id: "result", startMs: 21700, endMs: 23900, text: "It's a snake!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createSnakeDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "30-animal-snake-001", slug: "easy-snake",
    name: { en: "Snake", vi: "Con rắn" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["snake", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a snake in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-11T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-shell", name: "Draw the shell", order: 1, geometry: "circle",
    vector: { cx: 620, cy: 430, r: 175 },
    bounds: { x: 445, y: 255, width: 350, height: 350 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with one big round shell.", enabled: true,
  },
  {
    id: "02-shell-swirl", name: "Draw the swirl", order: 2, geometry: "circle",
    vector: { cx: 636, cy: 452, r: 95 },
    bounds: { x: 541, y: 357, width: 190, height: 190 },
    style: { stroke: "#111111", strokeWidth: 22 },
    startMs: 5800, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add one smaller circle inside.", enabled: true,
  },
  {
    id: "03-shell-center", name: "Draw the swirl centre", order: 3, geometry: "circle",
    vector: { cx: 650, cy: 468, r: 36 },
    bounds: { x: 614, y: 432, width: 72, height: 72 },
    style: { stroke: "#111111", strokeWidth: 20 },
    startMs: 7800, durationMs: 1500, stepId: "step-2",
    voiceDescription: "Add one tiny circle in the middle.", enabled: true,
  },
  {
    id: "04-body", name: "Draw the body", order: 4, geometry: "path",
    vector: { d: "M780 560 Q720 780 400 780 Q200 780 175 620" },
    bounds: { x: 175, y: 560, width: 605, height: 220 },
    startMs: 9500, durationMs: 2400, stepId: "step-3",
    voiceDescription: "Draw one long curve under the shell.", enabled: true,
  },
  {
    id: "05-neck", name: "Draw the neck", order: 5, geometry: "path",
    vector: { d: "M175 620 Q250 540 500 555" },
    bounds: { x: 175, y: 540, width: 325, height: 80 },
    startMs: 12100, durationMs: 1800, stepId: "step-4",
    voiceDescription: "Join the head back to the shell.", enabled: true,
  },
  {
    id: "06-left-stalk", name: "Add the left eye stalk", order: 6, geometry: "path",
    vector: { d: "M236 581 Q195 460 235 385" },
    bounds: { x: 195, y: 385, width: 41, height: 196 },
    startMs: 14100, durationMs: 1700, stepId: "step-5",
    voiceDescription: "Draw one little eye stalk.", enabled: true,
  },
  {
    id: "07-right-stalk", name: "Add the right eye stalk", order: 7, geometry: "path",
    vector: { d: "M328 558 Q345 450 400 390" },
    bounds: { x: 328, y: 390, width: 72, height: 168 },
    startMs: 16000, durationMs: 1700, stepId: "step-5",
    voiceDescription: "Draw the second eye stalk.", enabled: true,
  },
  {
    id: "08-left-eye", name: "Draw the left eye", order: 8, geometry: "circle",
    vector: { cx: 235, cy: 370, r: 26 },
    bounds: { x: 209, y: 344, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 17900, durationMs: 1300, stepId: "step-6",
    voiceDescription: "Draw the first round eye.", enabled: true,
  },
  {
    id: "09-right-eye", name: "Draw the right eye", order: 9, geometry: "circle",
    vector: { cx: 408, cy: 376, r: 26 },
    bounds: { x: 382, y: 350, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19500, durationMs: 1600, stepId: "step-6",
    voiceDescription: "Finish with the second round eye.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Shell", strokeIds: ["01-shell"], voiceText: "Start with one big round shell." },
  { id: "step-2", order: 2, title: "Swirl", strokeIds: ["02-shell-swirl", "03-shell-center"], voiceText: "Add two smaller circles inside for the swirl." },
  { id: "step-3", order: 3, title: "Body", strokeIds: ["04-body"], voiceText: "Draw one long curve under the shell." },
  { id: "step-4", order: 4, title: "Neck", strokeIds: ["05-neck"], voiceText: "Join the head back to the shell." },
  { id: "step-5", order: 5, title: "Eye stalks", strokeIds: ["06-left-stalk", "07-right-stalk"], voiceText: "Add two little eye stalks on top." },
  { id: "step-6", order: 6, title: "Eyes", strokeIds: ["08-left-eye", "09-right-eye"], voiceText: "Finish with two round eyes." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a snail in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5600, endMs: 9400, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9400, endMs: 12000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 12000, endMs: 14000, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 14000, endMs: 17800, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 17800, endMs: 21400, text: steps[5]!.voiceText },
  { id: "result", startMs: 21700, endMs: 23900, text: "It's a snail!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createSnailDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "23-animal-snail-001", slug: "easy-snail",
    name: { en: "Snail", vi: "Con ốc sên" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["snail", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a snail in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

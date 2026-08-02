import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-31T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-body", name: "Draw the body", order: 1, geometry: "ellipse",
    vector: { cx: 470, cy: 570, rx: 265, ry: 180 },
    bounds: { x: 205, y: 390, width: 530, height: 360 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with one big wide oval.", enabled: true,
  },
  {
    id: "02-tail", name: "Add the tail", order: 2, geometry: "polygon",
    vector: { points: "705,570 865,435 795,570 865,705" },
    bounds: { x: 705, y: 435, width: 160, height: 270 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 5400, durationMs: 2000, stepId: "step-2",
    voiceDescription: "Add one wide tail with a notch.", enabled: true,
  },
  {
    id: "03-belly", name: "Draw the belly line", order: 3, geometry: "path",
    vector: { d: "M250 640 Q470 760 690 660" },
    bounds: { x: 250, y: 640, width: 440, height: 120 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 26 },
    startMs: 7600, durationMs: 1800, stepId: "step-3",
    voiceDescription: "Draw one long belly curve.", enabled: true,
  },
  {
    id: "04-fin", name: "Add the fin", order: 4, geometry: "polygon",
    vector: { points: "400,690 350,800 530,745" },
    bounds: { x: 350, y: 690, width: 180, height: 110 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 20 },
    startMs: 9600, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add one flipper under the body.", enabled: true,
  },
  {
    id: "05-eye", name: "Draw the eye", order: 5, geometry: "circle",
    vector: { cx: 320, cy: 500, r: 22 },
    bounds: { x: 298, y: 478, width: 44, height: 44 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11800, durationMs: 1300, stepId: "step-5",
    voiceDescription: "Draw one little eye.", enabled: true,
  },
  {
    id: "06-mouth", name: "Draw the mouth", order: 6, geometry: "path",
    vector: { d: "M215 610 Q300 660 390 630" },
    bounds: { x: 215, y: 610, width: 175, height: 50 },
    startMs: 13300, durationMs: 1700, stepId: "step-5",
    voiceDescription: "Add one long mouth curve.", enabled: true,
  },
  {
    id: "07-left-spout", name: "Draw the left spout line", order: 7, geometry: "path",
    vector: { d: "M400 400 Q350 320 330 250" },
    bounds: { x: 316, y: 236, width: 98, height: 178 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 28 },
    startMs: 15200, durationMs: 1600, stepId: "step-6",
    voiceDescription: "Draw one water line going left.", enabled: true,
  },
  {
    id: "08-middle-spout", name: "Draw the middle spout line", order: 8, geometry: "path",
    vector: { d: "M420 395 Q420 320 420 240" },
    bounds: { x: 406, y: 226, width: 28, height: 183 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 28 },
    startMs: 17000, durationMs: 1600, stepId: "step-6",
    voiceDescription: "Draw one water line going straight up.", enabled: true,
  },
  {
    id: "09-right-spout", name: "Draw the right spout line", order: 9, geometry: "path",
    vector: { d: "M440 400 Q490 320 510 250" },
    bounds: { x: 426, y: 236, width: 98, height: 178 },
    style: { fill: "none", stroke: "#111111", strokeWidth: 28 },
    startMs: 18800, durationMs: 2300, stepId: "step-6",
    voiceDescription: "Finish with one water line going right.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Body", strokeIds: ["01-body"], voiceText: "Start with one big wide oval." },
  { id: "step-2", order: 2, title: "Tail", strokeIds: ["02-tail"], voiceText: "Add one wide tail with a notch." },
  { id: "step-3", order: 3, title: "Belly", strokeIds: ["03-belly"], voiceText: "Draw one long belly curve." },
  { id: "step-4", order: 4, title: "Fin", strokeIds: ["04-fin"], voiceText: "Add one flipper under the body." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["05-eye", "06-mouth"], voiceText: "Add one little eye and one long mouth curve." },
  { id: "step-6", order: 6, title: "Water spout", strokeIds: ["07-left-spout", "08-middle-spout", "09-right-spout"], voiceText: "Finish with three water lines on top." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a whale in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5300, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5300, endMs: 7500, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 7500, endMs: 9500, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 9500, endMs: 11700, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 11700, endMs: 15100, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 15100, endMs: 21200, text: steps[5]!.voiceText },
  { id: "result", startMs: 21800, endMs: 24200, text: "It's a whale!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createWhaleDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "21-animal-whale-001", slug: "easy-whale",
    name: { en: "Whale", vi: "Cá voi" }, category: "animals", subcategory: "aquatic",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["whale", "animal", "aquatic", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a whale in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

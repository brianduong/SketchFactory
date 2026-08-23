import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head", name: "Draw the head", order: 1, geometry: "rect",
    vector: { x: 360, y: 230, width: 280, height: 220, rx: 40 },
    bounds: { x: 360, y: 230, width: 280, height: 220 },
    startMs: 3000, durationMs: 1750, stepId: "step-1",
    voiceDescription: "Draw a rounded square head.", enabled: true,
  },
  {
    id: "02-antenna", name: "Draw the antenna", order: 2, geometry: "line",
    vector: { x1: 500, y1: 230, x2: 500, y2: 150 },
    bounds: { x: 490, y: 150, width: 20, height: 80 },
    startMs: 5000, durationMs: 1750, stepId: "step-2",
    voiceDescription: "Add a short antenna on top.", enabled: true,
  },
  {
    id: "03-antenna-ball", name: "Antenna ball", order: 3, geometry: "circle",
    vector: { cx: 500, cy: 135, r: 32 },
    bounds: { x: 468, y: 103, width: 64, height: 64 },
    startMs: 7000, durationMs: 1750, stepId: "step-2",
    voiceDescription: "Put a little ball on the antenna.", enabled: true,
  },
  {
    id: "04-eye-left", name: "Left eye", order: 4, geometry: "circle",
    vector: { cx: 440, cy: 320, r: 26 },
    bounds: { x: 414, y: 294, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 9000, durationMs: 1750, stepId: "step-3",
    voiceDescription: "Add one round eye.", enabled: true,
  },
  {
    id: "05-eye-right", name: "Right eye", order: 5, geometry: "circle",
    vector: { cx: 560, cy: 320, r: 26 },
    bounds: { x: 534, y: 294, width: 52, height: 52 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11000, durationMs: 1750, stepId: "step-3",
    voiceDescription: "Add the second eye.", enabled: true,
  },
  {
    id: "06-mouth", name: "Draw the mouth", order: 6, geometry: "line",
    vector: { x1: 430, y1: 395, x2: 570, y2: 395 },
    bounds: { x: 430, y: 385, width: 140, height: 20 },
    startMs: 13000, durationMs: 1750, stepId: "step-3",
    voiceDescription: "Draw a straight mouth.", enabled: true,
  },
  {
    id: "07-body", name: "Draw the body", order: 7, geometry: "rect",
    vector: { x: 330, y: 450, width: 340, height: 300, rx: 30 },
    bounds: { x: 330, y: 450, width: 340, height: 300 },
    startMs: 15000, durationMs: 1750, stepId: "step-4",
    voiceDescription: "Draw a big body under the head.", enabled: true,
  },
  {
    id: "08-arms", name: "Draw both arms", order: 8, geometry: "polyline",
    vector: { points: "250,650 250,450 750,450 750,650" },
    bounds: { x: 250, y: 450, width: 500, height: 200 },
    startMs: 17000, durationMs: 1750, stepId: "step-5",
    voiceDescription: "Draw both arms in one line.", enabled: true,
  },
  {
    id: "09-legs", name: "Draw both legs", order: 9, geometry: "polyline",
    vector: { points: "420,850 420,750 580,750 580,850" },
    bounds: { x: 420, y: 750, width: 160, height: 100 },
    startMs: 19000, durationMs: 1750, stepId: "step-5",
    voiceDescription: "Finish with two legs.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head"], voiceText: "Draw a rounded square head." },
  { id: "step-2", order: 2, title: "Antenna", strokeIds: ["02-antenna", "03-antenna-ball"], voiceText: "Add a short antenna with a little ball." },
  { id: "step-3", order: 3, title: "Face", strokeIds: ["04-eye-left", "05-eye-right", "06-mouth"], voiceText: "Add two round eyes and a straight mouth." },
  { id: "step-4", order: 4, title: "Body", strokeIds: ["07-body"], voiceText: "Draw a big body under the head." },
  { id: "step-5", order: 5, title: "Arms and legs", strokeIds: ["08-arms", "09-legs"], voiceText: "Finish with two arms and two legs." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw a robot in just nine strokes?" },
  { id: "step-1", startMs: 2800, endMs: 4800, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 4800, endMs: 8800, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8800, endMs: 14800, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14800, endMs: 16800, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 16800, endMs: 20950, text: steps[4]!.voiceText },
  { id: "result", startMs: 21150, endMs: 23350, text: "It's a robot!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createRobotDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "69-object-robot-001", slug: "easy-robot",
    name: { en: "Robot", vi: "Người máy" }, category: "objects", subcategory: "toy",
    difficulty: 2, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["robot", "object", "toy", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a robot in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-shell", name: "Draw the shell", order: 1, geometry: "ellipse",
    vector: { cx: 490, cy: 510, rx: 240, ry: 155 },
    bounds: { x: 250, y: 355, width: 480, height: 310 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with a wide oval shell.", enabled: true,
  },
  {
    id: "02-head", name: "Add the head", order: 2, geometry: "circle",
    vector: { cx: 790, cy: 515, r: 78 },
    bounds: { x: 712, y: 437, width: 156, height: 156 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 6000, durationMs: 1900, stepId: "step-2",
    voiceDescription: "Add one round head.", enabled: true,
  },
  {
    id: "03-back-top-leg", name: "Add the back top leg", order: 3, geometry: "ellipse",
    vector: { cx: 350, cy: 355, rx: 66, ry: 42 },
    bounds: { x: 284, y: 313, width: 132, height: 84 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 8300, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add the first oval leg.", enabled: true,
  },
  {
    id: "04-front-top-leg", name: "Add the front top leg", order: 4, geometry: "ellipse",
    vector: { cx: 645, cy: 355, rx: 66, ry: 42 },
    bounds: { x: 579, y: 313, width: 132, height: 84 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 10300, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add the second oval leg.", enabled: true,
  },
  {
    id: "05-back-bottom-leg", name: "Add the back bottom leg", order: 5, geometry: "ellipse",
    vector: { cx: 350, cy: 665, rx: 66, ry: 42 },
    bounds: { x: 284, y: 623, width: 132, height: 84 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 12300, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add the third oval leg.", enabled: true,
  },
  {
    id: "06-front-bottom-leg", name: "Add the front bottom leg", order: 6, geometry: "ellipse",
    vector: { cx: 645, cy: 665, rx: 66, ry: 42 },
    bounds: { x: 579, y: 623, width: 132, height: 84 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 14300, durationMs: 1600, stepId: "step-3",
    voiceDescription: "Add the fourth oval leg.", enabled: true,
  },
  {
    id: "07-tail", name: "Draw the tail", order: 7, geometry: "polygon",
    vector: { points: "260,485 155,515 260,550" },
    bounds: { x: 155, y: 485, width: 105, height: 65 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 22 },
    startMs: 16300, durationMs: 1500, stepId: "step-4",
    voiceDescription: "Add one little triangle tail.", enabled: true,
  },
  {
    id: "08-eye", name: "Draw the eye", order: 8, geometry: "circle",
    vector: { cx: 815, cy: 495, r: 16 },
    bounds: { x: 799, y: 479, width: 32, height: 32 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18400, durationMs: 1200, stepId: "step-5",
    voiceDescription: "Draw one little eye.", enabled: true,
  },
  {
    id: "09-smile", name: "Draw the smile", order: 9, geometry: "path",
    vector: { d: "M795 535 Q820 565 845 535" },
    bounds: { x: 795, y: 535, width: 50, height: 30 },
    startMs: 20400, durationMs: 1500, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Shell", strokeIds: ["01-shell"], voiceText: "Start with a wide oval shell." },
  { id: "step-2", order: 2, title: "Head", strokeIds: ["02-head"], voiceText: "Add one round head." },
  { id: "step-3", order: 3, title: "Legs", strokeIds: ["03-back-top-leg", "04-front-top-leg", "05-back-bottom-leg", "06-front-bottom-leg"], voiceText: "Draw four small oval legs." },
  { id: "step-4", order: 4, title: "Tail", strokeIds: ["07-tail"], voiceText: "Add one little triangle tail." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["08-eye", "09-smile"], voiceText: "Finish with one eye and a happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a turtle in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 8100, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 8100, endMs: 15900, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 15900, endMs: 18100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18100, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a turtle!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createTurtleDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "11-animal-turtle-001", slug: "easy-turtle",
    name: { en: "Turtle", vi: "Con rùa" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 9, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["turtle", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a turtle in just nine strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-23T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-wrapper", name: "Draw the cup", order: 1, geometry: "polygon",
    vector: { points: "340,590 660,590 620,850 380,850" },
    bounds: { x: 340, y: 590, width: 320, height: 260 },
    startMs: 3000, durationMs: 2300, stepId: "step-1",
    voiceDescription: "Draw the cup at the bottom.", enabled: true,
  },
  {
    id: "02-line-left", name: "First cup line", order: 2, geometry: "line",
    vector: { x1: 430, y1: 605, x2: 415, y2: 840 },
    bounds: { x: 410, y: 605, width: 25, height: 235 },
    startMs: 5600, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Draw one line down the cup.", enabled: true,
  },
  {
    id: "03-line-right", name: "Second cup line", order: 3, geometry: "line",
    vector: { x1: 570, y1: 605, x2: 585, y2: 840 },
    bounds: { x: 565, y: 605, width: 25, height: 235 },
    startMs: 8200, durationMs: 2300, stepId: "step-2",
    voiceDescription: "Add a second line down the cup.", enabled: true,
  },
  {
    id: "04-frosting", name: "Draw the frosting", order: 4, geometry: "path",
    vector: { d: "M300 590 C330 330 670 330 700 590" },
    bounds: { x: 300, y: 330, width: 400, height: 260 },
    startMs: 10800, durationMs: 2300, stepId: "step-3",
    voiceDescription: "Draw a big dome of frosting on top.", enabled: true,
  },
  {
    id: "05-swirl-top", name: "Top swirl line", order: 5, geometry: "path",
    vector: { d: "M420 460 C470 425 530 425 580 460" },
    bounds: { x: 420, y: 425, width: 160, height: 35 },
    startMs: 13400, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Add a short curve inside the frosting.", enabled: true,
  },
  {
    id: "06-swirl-bottom", name: "Bottom swirl line", order: 6, geometry: "path",
    vector: { d: "M350 530 C430 485 570 485 650 530" },
    bounds: { x: 350, y: 485, width: 300, height: 45 },
    startMs: 16000, durationMs: 2300, stepId: "step-4",
    voiceDescription: "Add a longer curve under it.", enabled: true,
  },
  {
    id: "07-cherry", name: "Add the cherry", order: 7, geometry: "circle",
    vector: { cx: 500, cy: 345, r: 45 },
    bounds: { x: 455, y: 300, width: 90, height: 90 },
    style: { fill: "#FFFDF7" },
    startMs: 18600, durationMs: 2300, stepId: "step-5",
    voiceDescription: "Finish with a cherry on top.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Cup", strokeIds: ["01-wrapper"], voiceText: "Draw the cup at the bottom." },
  { id: "step-2", order: 2, title: "Cup lines", strokeIds: ["02-line-left", "03-line-right"], voiceText: "Draw two lines down the cup." },
  { id: "step-3", order: 3, title: "Frosting", strokeIds: ["04-frosting"], voiceText: "Draw a big dome of frosting on top." },
  { id: "step-4", order: 4, title: "Swirls", strokeIds: ["05-swirl-top", "06-swirl-bottom"], voiceText: "Add two curves inside the frosting." },
  { id: "step-5", order: 5, title: "Cherry", strokeIds: ["07-cherry"], voiceText: "Finish with a cherry on top." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2800, text: "Can you draw a cupcake in just seven strokes?" },
  { id: "step-1", startMs: 2800, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5400, endMs: 10600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10600, endMs: 13200, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 13200, endMs: 18400, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18400, endMs: 21100, text: steps[4]!.voiceText },
  { id: "result", startMs: 21300, endMs: 23500, text: "It's a cupcake!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createCupcakeDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "66-object-cupcake-001", slug: "easy-cupcake",
    name: { en: "Cupcake", vi: "Bánh cupcake" }, category: "objects", subcategory: "food",
    difficulty: 1, strokeCount: 7, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["cupcake", "cake", "object", "food", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a cupcake in just seven strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

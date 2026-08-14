import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-08-14T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-front-hump", name: "Draw the first hump", order: 1, geometry: "path",
    vector: { d: "M260 650 C300 340 470 340 505 650" },
    bounds: { x: 260, y: 340, width: 245, height: 310 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with one big hump.", enabled: true,
  },
  {
    id: "02-back-hump", name: "Draw the second hump", order: 2, geometry: "path",
    vector: { d: "M505 650 C545 380 680 380 720 650" },
    bounds: { x: 505, y: 380, width: 215, height: 270 },
    startMs: 5700, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Add a second hump beside it.", enabled: true,
  },
  {
    id: "03-belly", name: "Draw the belly", order: 3, geometry: "path",
    vector: { d: "M260 650 C330 810 650 810 720 650" },
    bounds: { x: 260, y: 650, width: 460, height: 160 },
    startMs: 8100, durationMs: 2400, stepId: "step-2",
    voiceDescription: "Close the body with one curve underneath.", enabled: true,
  },
  {
    id: "04-neck-front", name: "Draw the front of the neck", order: 4, geometry: "path",
    vector: { d: "M245 655 C195 520 205 440 255 395" },
    bounds: { x: 195, y: 395, width: 60, height: 260 },
    startMs: 10700, durationMs: 2400, stepId: "step-3",
    voiceDescription: "Curve one long neck up to the front.", enabled: true,
  },
  {
    id: "05-neck-back", name: "Draw the back of the neck", order: 5, geometry: "path",
    vector: { d: "M318 640 C273 520 283 450 328 400" },
    bounds: { x: 273, y: 400, width: 55, height: 240 },
    startMs: 13300, durationMs: 2200, stepId: "step-3",
    voiceDescription: "Draw a second curve beside it.", enabled: true,
  },
  {
    id: "06-head", name: "Draw the head", order: 6, geometry: "ellipse",
    vector: { cx: 292, cy: 370, rx: 92, ry: 58 },
    bounds: { x: 200, y: 312, width: 184, height: 116 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 15700, durationMs: 2200, stepId: "step-4",
    voiceDescription: "Add one oval head on top.", enabled: true,
  },
  {
    id: "07-eye", name: "Draw the eye", order: 7, geometry: "circle",
    vector: { cx: 274, cy: 353, r: 20 },
    bounds: { x: 254, y: 333, width: 40, height: 40 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18100, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Give it one round eye.", enabled: true,
  },
  {
    id: "08-nose", name: "Add the nose", order: 8, geometry: "circle",
    vector: { cx: 215, cy: 382, r: 18 },
    bounds: { x: 197, y: 364, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 19700, durationMs: 1400, stepId: "step-5",
    voiceDescription: "Add one little nose.", enabled: true,
  },
  {
    id: "09-front-leg", name: "Draw the front leg", order: 9, geometry: "path",
    vector: { d: "M352 740 L330 862" },
    bounds: { x: 330, y: 740, width: 22, height: 122 },
    startMs: 21300, durationMs: 1500, stepId: "step-6",
    voiceDescription: "Draw one long leg.", enabled: true,
  },
  {
    id: "10-back-leg", name: "Draw the back leg", order: 10, geometry: "path",
    vector: { d: "M628 740 L650 862" },
    bounds: { x: 628, y: 740, width: 22, height: 122 },
    startMs: 23000, durationMs: 1500, stepId: "step-6",
    voiceDescription: "Finish with the second leg.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Humps", strokeIds: ["01-front-hump", "02-back-hump"], voiceText: "Start with two big humps side by side." },
  { id: "step-2", order: 2, title: "Belly", strokeIds: ["03-belly"], voiceText: "Close the body with one curve underneath." },
  { id: "step-3", order: 3, title: "Neck", strokeIds: ["04-neck-front", "05-neck-back"], voiceText: "Draw two curves for the long neck." },
  { id: "step-4", order: 4, title: "Head", strokeIds: ["06-head"], voiceText: "Add one oval head on top." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["07-eye", "08-nose"], voiceText: "Add one round eye and a little nose." },
  { id: "step-6", order: 6, title: "Legs", strokeIds: ["09-front-leg", "10-back-leg"], voiceText: "Finish with two long legs." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a camel in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 8000, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 8000, endMs: 10600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10600, endMs: 15600, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 15600, endMs: 18000, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18000, endMs: 21200, text: steps[4]!.voiceText },
  { id: "step-6", startMs: 21200, endMs: 24500, text: steps[5]!.voiceText },
  { id: "result", startMs: 24800, endMs: 26800, text: "It's a camel!" },
  { id: "cta", startMs: 27000, endMs: 28900, text: "Great job! Try it yourself." },
];

export function createCamelDrawing(): Drawing {
  return {
    schemaVersion: 1, id: "47-animal-camel-001", slug: "easy-camel",
    name: { en: "Camel", vi: "Con lạc đà" }, category: "animals", subcategory: "wildlife",
    difficulty: 1, strokeCount: 10, estimatedDrawingSeconds: 10, status: "draft",
    tags: ["camel", "animal", "wildlife", "easy drawing"], canvas: { width: 1000, height: 1000 },
    steps, strokes,
    voiceScript: {
      language: "en-US", provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85), cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a camel in just ten strokes?",
    },
    createdAt, updatedAt: new Date().toISOString(),
  };
}

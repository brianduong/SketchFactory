import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the angular head", order: 1, geometry: "polygon",
    vector: { points: "500,255 710,410 665,690 500,795 335,690 290,410" },
    bounds: { x: 290, y: 255, width: 420, height: 540 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with an angular face.", enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left pointy ear", order: 2, geometry: "polygon",
    vector: { points: "330,410 345,155 475,315" },
    bounds: { x: 330, y: 155, width: 145, height: 255 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 6000, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add one pointy ear.", enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right pointy ear", order: 3, geometry: "polygon",
    vector: { points: "525,315 655,155 670,410" },
    bounds: { x: 525, y: 155, width: 145, height: 255 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 8200, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add another pointy ear.", enabled: true,
  },
  {
    id: "04-left-eye", name: "Draw the left eye", order: 4, geometry: "circle",
    vector: { cx: 420, cy: 490, r: 18 },
    bounds: { x: 402, y: 472, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 10800, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the first eye.", enabled: true,
  },
  {
    id: "05-right-eye", name: "Draw the right eye", order: 5, geometry: "circle",
    vector: { cx: 580, cy: 490, r: 18 },
    bounds: { x: 562, y: 472, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12500, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the second eye.", enabled: true,
  },
  {
    id: "06-muzzle", name: "Draw the muzzle", order: 6, geometry: "ellipse",
    vector: { cx: 500, cy: 610, rx: 115, ry: 82 },
    bounds: { x: 385, y: 528, width: 230, height: 164 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 14200, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add a light oval muzzle.", enabled: true,
  },
  {
    id: "07-nose", name: "Add the nose", order: 7, geometry: "circle",
    vector: { cx: 500, cy: 575, r: 25 },
    bounds: { x: 475, y: 550, width: 50, height: 50 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16700, durationMs: 1200, stepId: "step-4",
    voiceDescription: "Add a little round nose.", enabled: true,
  },
  {
    id: "08-left-mouth", name: "Draw the left mouth curve", order: 8, geometry: "path",
    vector: { d: "M500 615 Q465 665 430 625" },
    bounds: { x: 430, y: 615, width: 70, height: 50 },
    startMs: 18300, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Draw one curve to the left.", enabled: true,
  },
  {
    id: "09-right-mouth", name: "Draw the right mouth curve", order: 9, geometry: "path",
    vector: { d: "M500 615 Q535 665 570 625" },
    bounds: { x: 500, y: 615, width: 70, height: 50 },
    startMs: 20200, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Draw one curve to the right.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with an angular face." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["02-left-ear", "03-right-ear"], voiceText: "Add two pointy fox ears." },
  { id: "step-3", order: 3, title: "Eyes", strokeIds: ["04-left-eye", "05-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-4", order: 4, title: "Muzzle", strokeIds: ["06-muzzle", "07-nose"], voiceText: "Add an oval muzzle and a little round nose." },
  { id: "step-5", order: 5, title: "Mouth", strokeIds: ["08-left-mouth", "09-right-mouth"], voiceText: "Finish with two simple mouth curves." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a fox in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 10200, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10500, endMs: 14000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14000, endMs: 18100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18100, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a fox!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createFoxDrawing(): Drawing {
  return {
    schemaVersion: 1,
    id: "animal-fox-001",
    slug: "easy-fox",
    name: { en: "Fox", vi: "Con cáo" },
    category: "animals",
    subcategory: "wildlife",
    difficulty: 1,
    strokeCount: 9,
    estimatedDrawingSeconds: 10,
    status: "draft",
    tags: ["fox", "animal", "wildlife", "easy drawing"],
    canvas: { width: 1000, height: 1000 },
    steps,
    strokes,
    voiceScript: {
      language: "en-US",
      provider: process.env.SKETCHFACTORY_TTS_PROVIDER ?? "kokoro",
      voice: process.env.SKETCHFACTORY_TTS_VOICE ?? "af_bella",
      rate: Number(process.env.SKETCHFACTORY_TTS_RATE ?? 175),
      speed: Number(process.env.SKETCHFACTORY_TTS_SPEED ?? 0.85),
      cues,
    },
    videoMetadata: {
      width: 1080, height: 1920, fps: 30, durationSeconds: 29,
      hook: "Can you draw a fox in just nine strokes?",
    },
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

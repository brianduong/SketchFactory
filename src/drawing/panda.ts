import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the head", order: 1, geometry: "circle",
    vector: { cx: 500, cy: 520, r: 245 },
    bounds: { x: 255, y: 275, width: 490, height: 490 },
    startMs: 3000, durationMs: 2200, stepId: "step-1",
    voiceDescription: "Start with a big circle.", enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left black ear", order: 2, geometry: "circle",
    vector: { cx: 315, cy: 330, r: 80 },
    bounds: { x: 235, y: 250, width: 160, height: 160 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 5800, durationMs: 1600, stepId: "step-2",
    voiceDescription: "Add one round black ear.", enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right black ear", order: 3, geometry: "circle",
    vector: { cx: 685, cy: 330, r: 80 },
    bounds: { x: 605, y: 250, width: 160, height: 160 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 7800, durationMs: 1600, stepId: "step-2",
    voiceDescription: "Add another round black ear.", enabled: true,
  },
  {
    id: "04-left-patch", name: "Draw the left eye patch", order: 4, geometry: "ellipse",
    vector: { cx: 415, cy: 500, rx: 55, ry: 78, transform: "rotate(-20 415 500)" },
    bounds: { x: 350, y: 420, width: 130, height: 160 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 10000, durationMs: 1400, stepId: "step-3",
    voiceDescription: "Draw the first oval eye patch.", enabled: true,
  },
  {
    id: "05-right-patch", name: "Draw the right eye patch", order: 5, geometry: "ellipse",
    vector: { cx: 585, cy: 500, rx: 55, ry: 78, transform: "rotate(20 585 500)" },
    bounds: { x: 520, y: 420, width: 130, height: 160 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 11800, durationMs: 1400, stepId: "step-3",
    voiceDescription: "Draw the second oval eye patch.", enabled: true,
  },
  {
    id: "06-left-eye", name: "Add the left eye", order: 6, geometry: "circle",
    vector: { cx: 420, cy: 500, r: 16 },
    bounds: { x: 404, y: 484, width: 32, height: 32 },
    style: { fill: "#FFFDF7", strokeWidth: 0 },
    startMs: 13600, durationMs: 1000, stepId: "step-4",
    voiceDescription: "Put one little eye inside.", enabled: true,
  },
  {
    id: "07-right-eye", name: "Add the right eye", order: 7, geometry: "circle",
    vector: { cx: 580, cy: 500, r: 16 },
    bounds: { x: 564, y: 484, width: 32, height: 32 },
    style: { fill: "#FFFDF7", strokeWidth: 0 },
    startMs: 15000, durationMs: 1000, stepId: "step-4",
    voiceDescription: "Put the other little eye inside.", enabled: true,
  },
  {
    id: "08-muzzle", name: "Draw the muzzle", order: 8, geometry: "ellipse",
    vector: { cx: 500, cy: 620, rx: 115, ry: 80 },
    bounds: { x: 385, y: 540, width: 230, height: 160 },
    style: { fill: "#FFFDF7", stroke: "#111111", strokeWidth: 24 },
    startMs: 16400, durationMs: 1800, stepId: "step-5",
    voiceDescription: "Add an oval muzzle.", enabled: true,
  },
  {
    id: "09-nose", name: "Add the nose", order: 9, geometry: "circle",
    vector: { cx: 500, cy: 590, r: 24 },
    bounds: { x: 476, y: 566, width: 48, height: 48 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 18600, durationMs: 1100, stepId: "step-5",
    voiceDescription: "Add a little round nose.", enabled: true,
  },
  {
    id: "10-smile", name: "Draw the smile", order: 10, geometry: "path",
    vector: { d: "M450 635 Q500 690 550 635" },
    bounds: { x: 450, y: 635, width: 100, height: 55 },
    startMs: 20100, durationMs: 1700, stepId: "step-5",
    voiceDescription: "Finish with one happy curve.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with a big circle." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["02-left-ear", "03-right-ear"], voiceText: "Add two round black ears." },
  { id: "step-3", order: 3, title: "Patches", strokeIds: ["04-left-patch", "05-right-patch"], voiceText: "Draw two oval eye patches." },
  { id: "step-4", order: 4, title: "Eyes", strokeIds: ["06-left-eye", "07-right-eye"], voiceText: "Put one little eye inside each patch." },
  { id: "step-5", order: 5, title: "Face", strokeIds: ["08-muzzle", "09-nose", "10-smile"], voiceText: "Finish with a muzzle, a nose, and one happy curve." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a panda in just ten strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5400, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5500, endMs: 9600, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 9800, endMs: 13300, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 13200, endMs: 16100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 16000, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a panda!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createPandaDrawing(): Drawing {
  return {
    schemaVersion: 1,
    id: "animal-panda-001",
    slug: "easy-panda",
    name: { en: "Panda", vi: "Gấu trúc" },
    category: "animals",
    subcategory: "wildlife",
    difficulty: 1,
    strokeCount: 10,
    estimatedDrawingSeconds: 10,
    status: "draft",
    tags: ["panda", "animal", "wildlife", "easy drawing"],
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
      hook: "Can you draw a panda in just ten strokes?",
    },
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

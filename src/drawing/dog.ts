import type { Drawing, DrawingStep, DrawingStroke, VoiceCue } from "../types/drawing.js";

const createdAt = "2026-07-27T00:00:00.000Z";

const strokes: DrawingStroke[] = [
  {
    id: "01-head-outline", name: "Draw the head", order: 1, geometry: "ellipse",
    vector: { cx: 500, cy: 505, rx: 230, ry: 270 },
    bounds: { x: 270, y: 235, width: 460, height: 540 },
    startMs: 3000, durationMs: 2400, stepId: "step-1",
    voiceDescription: "Start with a big oval.", enabled: true,
  },
  {
    id: "02-left-ear", name: "Add the left floppy ear", order: 2, geometry: "ellipse",
    vector: { cx: 300, cy: 430, rx: 92, ry: 175, transform: "rotate(20 300 430)" },
    bounds: { x: 195, y: 250, width: 210, height: 360 },
    startMs: 6000, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add one long floppy ear.", enabled: true,
  },
  {
    id: "03-right-ear", name: "Add the right floppy ear", order: 3, geometry: "ellipse",
    vector: { cx: 700, cy: 430, rx: 92, ry: 175, transform: "rotate(-20 700 430)" },
    bounds: { x: 595, y: 250, width: 210, height: 360 },
    startMs: 8200, durationMs: 1800, stepId: "step-2",
    voiceDescription: "Add another long floppy ear.", enabled: true,
  },
  {
    id: "04-left-eye", name: "Draw the left eye", order: 4, geometry: "circle",
    vector: { cx: 420, cy: 470, r: 18 },
    bounds: { x: 402, y: 452, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 10800, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the first eye.", enabled: true,
  },
  {
    id: "05-right-eye", name: "Draw the right eye", order: 5, geometry: "circle",
    vector: { cx: 580, cy: 470, r: 18 },
    bounds: { x: 562, y: 452, width: 36, height: 36 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 12500, durationMs: 1200, stepId: "step-3",
    voiceDescription: "Draw the second eye.", enabled: true,
  },
  {
    id: "06-muzzle", name: "Draw the muzzle", order: 6, geometry: "ellipse",
    vector: { cx: 500, cy: 590, rx: 120, ry: 82 },
    bounds: { x: 380, y: 508, width: 240, height: 164 },
    startMs: 14200, durationMs: 2000, stepId: "step-4",
    voiceDescription: "Add an oval muzzle.", enabled: true,
  },
  {
    id: "07-nose", name: "Add the nose", order: 7, geometry: "circle",
    vector: { cx: 500, cy: 565, r: 25 },
    bounds: { x: 475, y: 540, width: 50, height: 50 },
    style: { fill: "#111111", strokeWidth: 0 },
    startMs: 16700, durationMs: 1200, stepId: "step-4",
    voiceDescription: "Add a little round nose.", enabled: true,
  },
  {
    id: "08-smile", name: "Draw the smile", order: 8, geometry: "path",
    vector: { d: "M445 620 Q500 680 555 620" },
    bounds: { x: 445, y: 620, width: 110, height: 60 },
    startMs: 18300, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Draw one happy curve.", enabled: true,
  },
  {
    id: "09-tongue", name: "Add the tongue", order: 9, geometry: "ellipse",
    vector: { cx: 500, cy: 700, rx: 38, ry: 55 },
    bounds: { x: 462, y: 645, width: 76, height: 110 },
    style: { fill: "#EF6F6C", stroke: "#111111", strokeWidth: 20 },
    startMs: 20200, durationMs: 1600, stepId: "step-5",
    voiceDescription: "Finish with a little tongue.", enabled: true,
  },
];

const steps: DrawingStep[] = [
  { id: "step-1", order: 1, title: "Head", strokeIds: ["01-head-outline"], voiceText: "Start with a big oval." },
  { id: "step-2", order: 2, title: "Ears", strokeIds: ["02-left-ear", "03-right-ear"], voiceText: "Add two long floppy ears." },
  { id: "step-3", order: 3, title: "Eyes", strokeIds: ["04-left-eye", "05-right-eye"], voiceText: "Now draw two little eyes." },
  { id: "step-4", order: 4, title: "Muzzle", strokeIds: ["06-muzzle", "07-nose"], voiceText: "Add an oval muzzle and a little round nose." },
  { id: "step-5", order: 5, title: "Smile", strokeIds: ["08-smile", "09-tongue"], voiceText: "Finish with a happy smile and a little tongue." },
];

const cues: VoiceCue[] = [
  { id: "hook", startMs: 200, endMs: 2500, text: "Can you draw a dog in just nine strokes?" },
  { id: "step-1", startMs: 2700, endMs: 5600, text: steps[0]!.voiceText },
  { id: "step-2", startMs: 5800, endMs: 10200, text: steps[1]!.voiceText },
  { id: "step-3", startMs: 10500, endMs: 14000, text: steps[2]!.voiceText },
  { id: "step-4", startMs: 14000, endMs: 18100, text: steps[3]!.voiceText },
  { id: "step-5", startMs: 18100, endMs: 22000, text: steps[4]!.voiceText },
  { id: "result", startMs: 22300, endMs: 24500, text: "It's a dog!" },
  { id: "cta", startMs: 25000, endMs: 28700, text: "Great job! Now try drawing it yourself." },
];

export function createDogDrawing(): Drawing {
  return {
    schemaVersion: 1,
    id: "animal-dog-001",
    slug: "easy-dog",
    name: { en: "Dog", vi: "Con chó" },
    category: "animals",
    subcategory: "pets",
    difficulty: 1,
    strokeCount: 9,
    estimatedDrawingSeconds: 10,
    status: "draft",
    tags: ["dog", "animal", "pet", "easy drawing"],
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
      hook: "Can you draw a dog in just nine strokes?",
    },
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

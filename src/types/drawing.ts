export const DRAWING_STATUSES = [
  "draft",
  "generated",
  "reviewed",
  "approved",
  "rendered",
  "published",
  "rejected",
] as const;

export type DrawingStatus = (typeof DRAWING_STATUSES)[number];
export type GeometryType = "path" | "circle" | "ellipse" | "line" | "polyline" | "polygon" | "rect";

export interface StrokeStyle {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  lineCap?: "round" | "butt" | "square";
  lineJoin?: "round" | "bevel" | "miter";
}

export interface DrawingStroke {
  id: string;
  name: string;
  order: number;
  geometry: GeometryType;
  vector: Record<string, string | number>;
  bounds: { x: number; y: number; width: number; height: number };
  style?: StrokeStyle;
  startMs: number;
  durationMs: number;
  stepId: string;
  voiceDescription: string;
  enabled: boolean;
  semanticGroup?: string;
}

export interface DrawingStep {
  id: string;
  order: number;
  title: string;
  strokeIds: string[];
  voiceText: string;
}

export interface VoiceCue {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
}

export interface Drawing {
  schemaVersion: number;
  id: string;
  slug: string;
  name: { en: string; vi: string };
  category: string;
  subcategory: string;
  difficulty: number;
  strokeCount: number;
  estimatedDrawingSeconds: number;
  status: DrawingStatus;
  tags: string[];
  canvas: { width: number; height: number };
  steps: DrawingStep[];
  strokes: DrawingStroke[];
  voiceScript: {
    language: string;
    provider: string;
    voice: string;
    rate: number;
    cues: VoiceCue[];
  };
  videoMetadata: {
    width: number;
    height: number;
    fps: number;
    durationSeconds: number;
    hook: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ValidationIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
  strokeId?: string;
}

export interface QualityReport {
  drawingId: string;
  generatedAt: string;
  passed: boolean;
  issues: ValidationIssue[];
  artifactChecks: Record<string, boolean>;
  media?: {
    width?: number;
    height?: number;
    durationSeconds?: number;
    videoCodec?: string;
    audioCodec?: string;
  };
}

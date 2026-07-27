import type { Drawing, ValidationIssue } from "../types/drawing.js";

const ID_PATTERN = /^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateDrawing(drawing: Drawing): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const enabled = drawing.strokes.filter((stroke) => stroke.enabled);
  if (enabled.length !== drawing.strokeCount) {
    issues.push({ severity: "error", code: "STROKE_COUNT", message: `strokeCount=${drawing.strokeCount}, nhưng có ${enabled.length} nét bật.` });
  }
  if (drawing.strokeCount < 5 || drawing.strokeCount > 10) {
    issues.push({ severity: "warning", code: "STROKE_TARGET", message: "Số nét nằm ngoài mục tiêu 5–10." });
  }

  const ids = new Set<string>();
  enabled.forEach((stroke, index) => {
    if (ids.has(stroke.id)) issues.push({ severity: "error", code: "DUPLICATE_STROKE", message: "ID nét bị trùng.", strokeId: stroke.id });
    ids.add(stroke.id);
    if (!ID_PATTERN.test(stroke.id)) issues.push({ severity: "error", code: "STROKE_ID", message: "ID nét không đúng kebab-case có prefix thứ tự.", strokeId: stroke.id });
    if (stroke.order !== index + 1) issues.push({ severity: "error", code: "STROKE_ORDER", message: "Thứ tự nét phải liên tục từ 1.", strokeId: stroke.id });
    if (stroke.startMs < 0 || stroke.durationMs <= 0) issues.push({ severity: "error", code: "TIMING", message: "Timing nét không hợp lệ.", strokeId: stroke.id });
    if (stroke.geometry === "path" && typeof stroke.vector.d === "string") {
      const moveCommands = stroke.vector.d.match(/[Mm]/g)?.length ?? 0;
      const segmentCommands = stroke.vector.d.match(/[LlHhVvCcSsQqTtAa]/g)?.length ?? 0;
      if (moveCommands !== 1 || segmentCommands > 2) {
        issues.push({
          severity: "error",
          code: "COMPLEX_STROKE",
          message: "Một stroke path phải liên tục, có đúng một M/m và tối đa hai đoạn đơn.",
          strokeId: stroke.id,
        });
      }
    }
    if (stroke.semanticGroup) {
      issues.push({
        severity: "error",
        code: "GROUPED_STROKE",
        message: "Không được gom nhiều chi tiết thành một semantic stroke.",
        strokeId: stroke.id,
      });
    }
    const { x, y, width, height } = stroke.bounds;
    if (x < 100 || y < 100 || x + width > 900 || y + height > 900) {
      issues.push({ severity: "error", code: "SAFE_AREA", message: "Nét nằm ngoài safe area 100–900.", strokeId: stroke.id });
    }
    if (width < 20 || height < 20) {
      issues.push({ severity: "warning", code: "TOO_SMALL", message: "Chi tiết nhỏ hơn 20 đơn vị.", strokeId: stroke.id });
    }
    if (!drawing.steps.some((step) => step.id === stroke.stepId && step.strokeIds.includes(stroke.id))) {
      issues.push({ severity: "error", code: "STEP_LINK", message: "Nét không liên kết đúng với step.", strokeId: stroke.id });
    }
  });

  for (let i = 1; i < enabled.length; i += 1) {
    if (enabled[i]!.startMs < enabled[i - 1]!.startMs) {
      issues.push({ severity: "error", code: "TIMELINE_ORDER", message: "startMs không tăng theo stroke order.", strokeId: enabled[i]!.id });
    }
  }

  if (drawing.voiceScript.cues.length < drawing.steps.length + 2) {
    issues.push({ severity: "error", code: "VOICE_CUES", message: "Voice chưa bao phủ hook, steps và kết quả." });
  }
  const durationMs = drawing.videoMetadata.durationSeconds * 1000;
  if (drawing.voiceScript.cues.some((cue) => cue.startMs < 0 || cue.endMs <= cue.startMs || cue.endMs > durationMs)) {
    issues.push({ severity: "error", code: "VOICE_TIMING", message: "Voice cue nằm ngoài timeline video." });
  }
  if (drawing.videoMetadata.durationSeconds < 15 || drawing.videoMetadata.durationSeconds > 30) {
    issues.push({ severity: "error", code: "VIDEO_DURATION", message: "Shorts phải dài 15–30 giây." });
  }
  return issues;
}

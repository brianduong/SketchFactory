import type { VoiceCue } from "../types/drawing.js";

function timestamp(ms: number): string {
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  const millis = ms % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
}

export function renderSrt(cues: VoiceCue[]): string {
  return `${cues.map((cue, index) => `${index + 1}\n${timestamp(cue.startMs)} --> ${timestamp(cue.endMs)}\n${cue.text}`).join("\n\n")}\n`;
}

export function renderSubtitleOverlaySvg(text: string): string {
  const lines = wrapWords(text, 32);
  const startY = 1515 - (lines.length - 1) * 34;
  const escaped = lines.map((line, index) =>
    `<text x="540" y="${startY + index * 68}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="48" font-weight="700" fill="#111111">${escapeXml(line)}</text>`,
  ).join("\n");
  const boxHeight = 100 + (lines.length - 1) * 68;
  const boxY = startY - 62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
<rect x="90" y="${boxY}" width="900" height="${boxHeight}" rx="28" fill="#ffffff" fill-opacity="0.92" stroke="#eeeeee" stroke-width="3"/>
${escaped}
</svg>\n`;
}

function wrapWords(text: string, maxLength: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else current = candidate;
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

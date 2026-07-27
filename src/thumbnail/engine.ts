import type { Drawing } from "../types/drawing.js";
import { strokeElement } from "../svg/engine.js";

export function renderThumbnailSvg(drawing: Drawing): string {
  const strokes = drawing.strokes.filter((stroke) => stroke.enabled).sort((a, b) => a.order - b.order);
  const article = /^[aeiou]/i.test(drawing.name.en) ? "AN" : "A";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
<rect width="1080" height="1920" fill="#FFFDF7"/>
<rect x="0" y="0" width="1080" height="280" fill="#F4D35E"/>
<text x="540" y="120" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="64" font-weight="800" fill="#111111">DRAW ${article} ${drawing.name.en.toUpperCase()}</text>
<text x="540" y="205" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="42" font-weight="700" fill="#111111">IN ${drawing.strokeCount} STROKES</text>
<g transform="translate(90 380) scale(0.9)">${strokes.map(strokeElement).join("\n")}</g>
<rect x="150" y="1410" width="780" height="150" rx="75" fill="#111111"/>
<text x="540" y="1507" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="48" font-weight="700" fill="#ffffff">YOU CAN DRAW THIS!</text>
</svg>\n`;
}

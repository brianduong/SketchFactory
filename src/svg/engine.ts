import type { Drawing, DrawingStroke } from "../types/drawing.js";

const DEFAULT_STYLE = {
  stroke: "#111111",
  strokeWidth: 24,
  fill: "none",
  lineCap: "round",
  lineJoin: "round",
} as const;

function attrs(values: Record<string, string | number>): string {
  return Object.entries(values).map(([key, value]) => `${key}="${String(value)}"`).join(" ");
}

export function strokeElement(stroke: DrawingStroke): string {
  const style = { ...DEFAULT_STYLE, ...stroke.style };
  const visual = [
    `stroke="${style.stroke}"`,
    `stroke-width="${style.strokeWidth}"`,
    `fill="${style.fill}"`,
    `stroke-linecap="${style.lineCap}"`,
    `stroke-linejoin="${style.lineJoin}"`,
  ].join(" ");
  return `<${stroke.geometry} id="${stroke.id}" ${attrs(stroke.vector)} ${visual}/>`;
}

export function renderDrawingSvg(
  drawing: Drawing,
  options: { background?: string; onlyStrokeId?: string; videoCanvas?: boolean } = {},
): string {
  const enabled = drawing.strokes
    .filter((stroke) => stroke.enabled && (!options.onlyStrokeId || stroke.id === options.onlyStrokeId))
    .sort((a, b) => a.order - b.order);

  if (options.videoCanvas) {
    const transform = "translate(90 330) scale(0.9)";
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
${options.background ? `<rect width="1080" height="1920" fill="${options.background}"/>` : ""}
<g transform="${transform}">${enabled.map(strokeElement).join("\n")}</g>
</svg>\n`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${drawing.canvas.width}" height="${drawing.canvas.height}" viewBox="0 0 ${drawing.canvas.width} ${drawing.canvas.height}">
${options.background ? `<rect width="100%" height="100%" fill="${options.background}"/>` : ""}
<g id="drawing">${enabled.map(strokeElement).join("\n")}</g>
</svg>\n`;
}

export function renderLayeredSvg(drawing: Drawing): string {
  const groups = drawing.strokes.filter((stroke) => stroke.enabled).sort((a, b) => a.order - b.order)
    .map((stroke) => `<g id="layer-${stroke.id}" data-order="${stroke.order}" data-start-ms="${stroke.startMs}" data-duration-ms="${stroke.durationMs}">${strokeElement(stroke)}</g>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${drawing.canvas.width}" height="${drawing.canvas.height}" viewBox="0 0 ${drawing.canvas.width} ${drawing.canvas.height}">
${groups.join("\n")}
</svg>\n`;
}

export function renderVideoBase(drawing: Drawing): string {
  const hookLines = splitBalanced(drawing.videoMetadata.hook);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
<rect width="1080" height="1920" fill="#ffffff"/>
<text x="540" y="130" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="44" font-weight="700" fill="#111111">
${hookLines.map((line, index) => `<tspan x="540" dy="${index === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`).join("\n")}
</text>
<text x="540" y="1780" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="700" fill="#777777">SKETCHFACTORY · ${drawing.strokeCount} SIMPLE STROKES</text>
</svg>\n`;
}

function splitBalanced(value: string): [string, string] {
  const words = value.trim().split(/\s+/);
  let bestIndex = 1;
  let bestDifference = Number.POSITIVE_INFINITY;
  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(" ");
    const right = words.slice(index).join(" ");
    const difference = Math.abs(left.length - right.length);
    if (difference < bestDifference) {
      bestDifference = difference;
      bestIndex = index;
    }
  }
  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

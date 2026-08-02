import type { DrawingStroke } from "../../src/types/drawing.js";

export interface StrokeExtent {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Vùng thực sự bị hình học chiếm, không tính stroke width. Với path Bézier, các điểm
 * điều khiển là bao lồi nên kết quả luôn bao trọn đường cong.
 */
export function strokeExtent(stroke: DrawingStroke): StrokeExtent {
  const points = geometryPoints(stroke);
  if (!points.length) throw new Error(`Không đọc được hình học của nét "${stroke.id}".`);
  return {
    minX: Math.min(...points.map(([x]) => x)),
    minY: Math.min(...points.map(([, y]) => y)),
    maxX: Math.max(...points.map(([x]) => x)),
    maxY: Math.max(...points.map(([, y]) => y)),
  };
}

function geometryPoints(stroke: DrawingStroke): Array<[number, number]> {
  const value = (key: string): number => Number(stroke.vector[key]);
  switch (stroke.geometry) {
    case "circle": {
      const [cx, cy, r] = [value("cx"), value("cy"), value("r")];
      return [[cx - r, cy - r], [cx + r, cy + r]];
    }
    case "ellipse": {
      const [cx, cy, rx, ry] = [value("cx"), value("cy"), value("rx"), value("ry")];
      return [[cx - rx, cy - ry], [cx + rx, cy + ry]];
    }
    case "rect": {
      const [x, y, width, height] = [value("x"), value("y"), value("width"), value("height")];
      return [[x, y], [x + width, y + height]];
    }
    case "line":
      return [[value("x1"), value("y1")], [value("x2"), value("y2")]];
    case "polygon":
    case "polyline":
      return parsePairs(String(stroke.vector.points));
    case "path":
      return parsePairs(String(stroke.vector.d));
    default:
      return [];
  }
}

function parsePairs(source: string): Array<[number, number]> {
  const numbers = source.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const pairs: Array<[number, number]> = [];
  for (let index = 0; index + 1 < numbers.length; index += 2) {
    pairs.push([numbers[index]!, numbers[index + 1]!]);
  }
  return pairs;
}

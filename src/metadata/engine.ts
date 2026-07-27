import type { Drawing } from "../types/drawing.js";

export function generateMetadata(drawing: Drawing) {
  const strokeLabel = `${drawing.strokeCount} strokes`;
  const subject = drawing.name.en.toLowerCase();
  const article = /^[aeiou]/i.test(subject) ? "an" : "a";
  return {
    drawingId: drawing.id,
    youtubeShorts: {
      title: `How to Draw ${article} ${drawing.name.en} in ${drawing.strokeCount} Simple Strokes ✏️`,
      description: [
        `Learn how to draw a simple ${subject} in ${drawing.strokeCount} easy strokes.`,
        "Follow each step, pause if you need, and try it on paper or a whiteboard.",
        "",
        "What should SketchFactory draw next?",
        "",
        "Draw anything. The simple way.",
        "",
        `#HowToDraw #EasyDrawing #${drawing.name.en.replace(/\s+/g, "")}Drawing`,
      ].join("\n"),
      keywords: [
        `how to draw ${article} ${subject}`,
        `easy ${subject} drawing`,
        `simple ${subject} drawing`,
        ...drawing.tags,
        "drawing for beginners",
        "step by step drawing",
        strokeLabel,
        "SketchFactory",
      ],
      hashtags: ["#HowToDraw", "#EasyDrawing", `#${drawing.name.en.replace(/\s+/g, "")}Drawing`],
    },
    youtubeLong: {
      title: `Easy ${drawing.name.en} Drawing for Beginners | ${strokeLabel}`,
    },
    social: {
      tiktok: `Can you draw this ${subject} in ${drawing.estimatedDrawingSeconds} seconds? ✏️ ${strokeLabel}! #EasyDrawing #LearnToDraw`,
      facebook: `${article[0]!.toUpperCase()}${article.slice(1)} ${subject} anyone can draw—just ${strokeLabel}. Save this and try it on paper or a whiteboard.`,
      instagram: `Draw ${article} ${subject} with me in ${strokeLabel}. Simple enough for any beginner. ✏️`,
    },
    safety: {
      copyrightCharacter: false,
      trademarkLogo: false,
      originalMinimalDesign: true,
      requiresManualApprovalBeforePublish: true,
    },
  };
}

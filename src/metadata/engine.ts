import type { Drawing } from "../types/drawing.js";

export function generateMetadata(drawing: Drawing) {
  const strokeLabel = `${drawing.strokeCount} strokes`;
  return {
    drawingId: drawing.id,
    youtubeShorts: {
      title: `How to Draw a ${drawing.name.en} in ${strokeLabel} #Shorts`,
      description: [
        `Learn the simplest way to draw a ${drawing.name.en.toLowerCase()} in about ${drawing.estimatedDrawingSeconds} seconds.`,
        "Made for adults, teachers, creators, visual thinkers, and complete beginners.",
        "",
        "Try it, pause it, and draw along!",
        "",
        "#EasyDrawing #DrawingForKids #HowToDraw #Shorts",
      ].join("\n"),
      keywords: [...drawing.tags, "drawing for beginners", "drawing for teachers", "visual notes", "whiteboard drawing", strokeLabel],
      hashtags: ["#EasyDrawing", "#DrawingForKids", "#HowToDraw", "#Shorts"],
    },
    youtubeLong: {
      title: `Easy ${drawing.name.en} Drawing for Beginners | ${strokeLabel}`,
    },
    social: {
      tiktok: `Can you draw this ${drawing.name.en.toLowerCase()} in ${drawing.estimatedDrawingSeconds} seconds? ✏️ ${strokeLabel}! #EasyDrawing #LearnToDraw`,
      facebook: `A ${drawing.name.en.toLowerCase()} anyone can draw—just ${strokeLabel}. Save this and try it on paper or a whiteboard.`,
      instagram: `Draw a ${drawing.name.en.toLowerCase()} with me in ${strokeLabel}. Simple enough for any beginner. ✏️`,
    },
    safety: {
      copyrightCharacter: false,
      trademarkLogo: false,
      originalMinimalDesign: true,
      requiresManualApprovalBeforePublish: true,
    },
  };
}

import type { Drawing } from "../types/drawing.js";

export function generateMetadata(drawing: Drawing) {
  const strokeLabel = `${drawing.strokeCount} strokes`;
  return {
    drawingId: drawing.id,
    youtubeShorts: {
      title: `How to Draw a ${drawing.name.en} in ${strokeLabel} #Shorts`,
      description: [
        `Learn the simplest way to draw a ${drawing.name.en.toLowerCase()} in about ${drawing.estimatedDrawingSeconds} seconds.`,
        "Made for kids, parents, teachers, and complete beginners.",
        "",
        "Try it, pause it, and draw along!",
        "",
        "#EasyDrawing #DrawingForKids #HowToDraw #Shorts",
      ].join("\n"),
      keywords: [...drawing.tags, "drawing for kids", "drawing for teachers", strokeLabel],
      hashtags: ["#EasyDrawing", "#DrawingForKids", "#HowToDraw", "#Shorts"],
    },
    youtubeLong: {
      title: `Easy ${drawing.name.en} Drawing for Beginners | ${strokeLabel}`,
    },
    social: {
      tiktok: `Can you draw this ${drawing.name.en.toLowerCase()} in ${drawing.estimatedDrawingSeconds} seconds? ✏️ ${strokeLabel}! #EasyDrawing #LearnToDraw`,
      facebook: `A ${drawing.name.en.toLowerCase()} anyone can draw—just ${strokeLabel}. Save this and try it with a child or in your classroom.`,
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

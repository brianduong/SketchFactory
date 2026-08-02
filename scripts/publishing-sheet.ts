#!/usr/bin/env node
/**
 * Sinh upload sheet cho một video chưa đăng.
 *
 *   npx tsx scripts/publishing-sheet.ts --id 13-animal-lion-001
 *
 * Sheet dùng đúng metadata mà pipeline đã sinh, nên title/description/tag trong
 * docs/publishing luôn khớp với `output/reports/<id>-metadata.json`.
 */
import path from "node:path";
import { loadDrawing } from "../src/drawing/repository.js";
import { generateMetadata } from "../src/metadata/engine.js";
import { writeText } from "../src/shared/fs.js";
import { ROOT } from "../src/shared/paths.js";

function requireFlag(name: string): string {
  const index = process.argv.indexOf(`--${name}`);
  const value = index === -1 ? undefined : process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Thiếu --${name}.`);
  return value;
}

function uploadFileName(id: string, name: string): string {
  const number = id.slice(0, 2);
  return `${number}-${name.toLowerCase().replace(/\s+/g, "-")}.mp4`;
}

async function main(): Promise<void> {
  const id = requireFlag("id");
  const drawing = await loadDrawing(id);
  const metadata = generateMetadata(drawing);
  const number = Number(id.slice(0, 2));
  const shorts = metadata.youtubeShorts;
  const article = /^[aeiou]/i.test(drawing.name.en) ? "AN" : "A";
  const video = uploadFileName(id, drawing.name.en);

  const sheet = `# Video ${number} — YouTube Upload — ${drawing.name.en}

## Trạng thái đăng

- YouTube: [ ] Chưa upload
- TikTok: [ ] Chưa đánh dấu
- Facebook: [ ] Chưa đánh dấu
- Instagram: [ ] Chưa đánh dấu

## Title

${shorts.title}

## Description

${shorts.description}

## Tags

${shorts.keywords.join(", ")}

## Upload Files

- Video: \`output/upload-ready/${video}\`
- Thumbnail: \`output/thumbnails/${id}.png\`
- Subtitles: \`output/subtitles/${id}.srt\`

## YouTube Settings

- Audience: No, it's not made for kids
- Age restriction: No
- Video language: English (United States)
- Title and description language: English
- Category: Howto & Style
- Paid promotion: No
- Altered content: No
- License: Standard YouTube License
- Comments: On
- Shorts remixing: On
- Playlist: Simple Drawing Tutorials
- Initial visibility: Private

## YouTube Result

- Video ID: chưa có
- Upload status: chưa upload
- Privacy: chưa upload
- Audience: chưa đặt
- English captions: chưa upload
- Custom thumbnail: chưa đặt

## Final Checklist

- [ ] Upload file \`${video}\`
- [ ] Confirm the opening hook is fully visible on a phone
- [ ] Confirm the thumbnail says \`DRAW ${article} ${drawing.name.en.toUpperCase()}\`
- [ ] Set audience to \`No, it's not made for kids\`
- [ ] Upload the SRT subtitle file
- [ ] Wait for HD processing and YouTube Checks
- [ ] Watch the full video once on a phone before publishing

## Other Platforms

- Facebook: ${metadata.social.facebook}
- Instagram: ${metadata.social.instagram}
- TikTok: ${metadata.social.tiktok} #${drawing.name.en.replace(/\s+/g, "")}Drawing
`;

  const file = path.join(ROOT, "docs", "publishing", `${id}.md`);
  await writeText(file, sheet);
  console.log(`✅ ${path.relative(ROOT, file)}`);
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

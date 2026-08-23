#!/usr/bin/env node
/**
 * Xóa vĩnh viễn các video bản cũ đã lưu trong `.secrets/youtube-archive-*.json`.
 *
 *   npx tsx scripts/youtube-retire.ts --archive youtube-archive-color-version.json
 *   npx tsx scripts/youtube-retire.ts --archive youtube-archive-color-version.json --delete-confirm
 *
 * Không có `--delete-confirm` thì chỉ liệt kê. Xóa là KHÔNG khôi phục được: mất view,
 * bình luận và mọi link đã chia sẻ. Chỉ chạy khi người dùng yêu cầu rõ ràng.
 * Tốn 50 đơn vị quota cho mỗi video xóa.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { google } from "googleapis";
import { ROOT } from "../src/shared/paths.js";

const SECRETS_DIR = path.join(ROOT, ".secrets");
const CONFIRM = process.argv.includes("--delete-confirm");

interface ArchivedVideo {
  number: number;
  subject: string;
  videoId: string;
  deletedAt?: string;
}

interface Archive {
  note: string;
  videos: ArchivedVideo[];
}

function requireFlag(name: string): string {
  const index = process.argv.indexOf(`--${name}`);
  const value = index === -1 ? undefined : process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Thiếu --${name}.`);
  return value;
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function main(): Promise<void> {
  const archivePath = path.join(SECRETS_DIR, requireFlag("archive"));
  const archive = await readJson<Archive>(archivePath);
  const pending = archive.videos.filter((video) => !video.deletedAt);

  console.log(`${archive.note}\n`);
  console.log(`Còn ${pending.length}/${archive.videos.length} video chưa xóa.`);
  if (!pending.length) return;
  if (!CONFIRM) {
    for (const video of pending) {
      console.log(`  ${String(video.number).padStart(2, "0")} ${video.subject} — ${video.videoId}`);
    }
    console.log("\nChạy lại với --delete-confirm để xóa vĩnh viễn.");
    return;
  }

  const client = await readJson<{ installed: { client_id: string; client_secret: string } }>(
    path.join(SECRETS_DIR, "youtube-client.json"),
  );
  const token = await readJson<Record<string, unknown>>(path.join(SECRETS_DIR, "youtube-token.json"));
  const oauth = new google.auth.OAuth2(client.installed.client_id, client.installed.client_secret);
  oauth.setCredentials(token);
  const youtube = google.youtube({ version: "v3", auth: oauth });

  for (const video of pending) {
    try {
      await youtube.videos.delete({ id: video.videoId });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Video đã bị xóa tay từ trước thì coi như xong, các lỗi khác thì dừng.
      if (!/not found/i.test(message)) {
        await writeFile(archivePath, `${JSON.stringify(archive, null, 2)}\n`, { mode: 0o600 });
        throw new Error(`Dừng ở video ${video.number} ${video.subject}: ${message}`);
      }
      console.log(`   video ${video.number} không còn tồn tại, bỏ qua`);
    }
    video.deletedAt = new Date().toISOString();
    await writeFile(archivePath, `${JSON.stringify(archive, null, 2)}\n`, { mode: 0o600 });
    console.log(`🗑️  ${String(video.number).padStart(2, "0")} ${video.subject} — ${video.videoId}`);
  }

  console.log(`\nĐã xóa ${pending.length} video.`);
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

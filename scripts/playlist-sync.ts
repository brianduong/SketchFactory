#!/usr/bin/env node
/**
 * Đồng bộ playlist YouTube với `data/publishing-state.json`.
 *
 *   npx tsx scripts/playlist-sync.ts            # chỉ in ra, không ghi
 *   npx tsx scripts/playlist-sync.ts --apply    # thêm video còn thiếu
 *
 * Chỉ thêm video chưa có trong playlist, theo đúng thứ tự số, nên chạy lại nhiều lần
 * cũng không tạo mục trùng. Tốn 50 đơn vị quota cho mỗi video được thêm.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { google } from "googleapis";
import { ROOT } from "../src/shared/paths.js";

const SECRETS_DIR = path.join(ROOT, ".secrets");
const STATE_PATH = path.join(ROOT, "data", "publishing-state.json");
const APPLY = process.argv.includes("--apply");

interface PublishingState {
  youtube: { channelId: string; playlist?: { id: string; name: string } };
  videos: { number: number; animal: string; youtube: { videoId: string | null } }[];
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function main(): Promise<void> {
  const state = await readJson<PublishingState>(STATE_PATH);
  const playlistId = state.youtube.playlist?.id;
  if (!playlistId) throw new Error("publishing-state.json chưa có youtube.playlist.id.");

  const client = await readJson<{ installed: { client_id: string; client_secret: string } }>(
    path.join(SECRETS_DIR, "youtube-client.json"),
  );
  const token = await readJson<Record<string, unknown>>(path.join(SECRETS_DIR, "youtube-token.json"));
  const oauth = new google.auth.OAuth2(client.installed.client_id, client.installed.client_secret);
  oauth.setCredentials(token);
  const youtube = google.youtube({ version: "v3", auth: oauth });

  const channels = await youtube.channels.list({ part: ["id", "snippet"], mine: true });
  const channel = channels.data.items?.[0];
  if (channel?.id !== state.youtube.channelId) {
    throw new Error(`Sai kênh OAuth: ${channel?.snippet?.title} (${channel?.id}).`);
  }

  const existing = new Set<string>();
  let pageToken: string | undefined;
  do {
    const page = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId,
      maxResults: 50,
      pageToken,
    });
    for (const item of page.data.items ?? []) {
      const id = item.snippet?.resourceId?.videoId;
      if (id) existing.add(id);
    }
    pageToken = page.data.nextPageToken ?? undefined;
  } while (pageToken);

  const missing = state.videos
    .filter((video) => video.youtube.videoId && !existing.has(video.youtube.videoId))
    .sort((a, b) => a.number - b.number);

  console.log(`Playlist ${playlistId} đang có ${existing.size} video.`);
  if (!missing.length) {
    console.log("✅ Không thiếu video nào.");
    return;
  }
  console.log(`Thiếu ${missing.length} video: ${missing.map((v) => v.number).join(", ")}`);
  if (!APPLY) {
    console.log("Chạy lại với --apply để thêm.");
    return;
  }

  for (const video of missing) {
    await youtube.playlistItems.insert({
      part: ["snippet"],
      requestBody: {
        snippet: {
          playlistId,
          resourceId: { kind: "youtube#video", videoId: video.youtube.videoId! },
        },
      },
    });
    console.log(`✅ ${String(video.number).padStart(2, "0")} ${video.animal} — ${video.youtube.videoId}`);
  }

  const after = await youtube.playlists.list({ part: ["contentDetails"], id: [playlistId] });
  console.log(`\nPlaylist hiện có ${after.data.items?.[0]?.contentDetails?.itemCount} video.`);
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

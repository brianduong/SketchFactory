#!/usr/bin/env node
/**
 * Đồng bộ các playlist YouTube với `data/publishing-state.json`.
 *
 *   npx tsx scripts/playlist-sync.ts            # chỉ in ra, không ghi
 *   npx tsx scripts/playlist-sync.ts --apply    # tạo playlist còn thiếu và thêm video
 *
 * Mỗi playlist trong state khai báo `includes`: "all" nhận mọi video, còn lại nhận đúng
 * video có `category` trùng tên. Script chỉ thêm video chưa có trong playlist, theo đúng
 * thứ tự số, nên chạy lại nhiều lần cũng không tạo mục trùng. Playlist chưa có `id` sẽ
 * được tạo mới rồi ghi id ngược lại vào state. Tốn 50 đơn vị quota cho mỗi lần tạo
 * playlist và mỗi video được thêm.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { google } from "googleapis";
import { ROOT } from "../src/shared/paths.js";

const SECRETS_DIR = path.join(ROOT, ".secrets");
const STATE_PATH = path.join(ROOT, "data", "publishing-state.json");
const APPLY = process.argv.includes("--apply");

interface Playlist {
  id: string | null;
  name: string;
  includes: string;
  videoCount: number;
  note?: string;
}

interface StateVideo {
  number: number;
  subject: string;
  category: string;
  youtube: { videoId: string | null };
}

interface PublishingState {
  youtube: { channelId: string; playlists: Playlist[] };
  videos: StateVideo[];
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

function belongs(playlist: Playlist, video: StateVideo): boolean {
  return playlist.includes === "all" || playlist.includes === video.category;
}

async function main(): Promise<void> {
  const state = await readJson<PublishingState>(STATE_PATH);
  const playlists = state.youtube.playlists;
  if (!playlists?.length) throw new Error("publishing-state.json chưa có youtube.playlists.");

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

  let stateChanged = false;
  for (const playlist of playlists) {
    const wanted = state.videos
      .filter((video) => video.youtube.videoId && belongs(playlist, video))
      .sort((a, b) => a.number - b.number);
    console.log(`\n▸ ${playlist.name} (${playlist.includes}) — ${wanted.length} video đủ điều kiện.`);

    if (!playlist.id && !wanted.length) {
      console.log("Chưa có video nào thuộc nhóm này — khoan tạo playlist rỗng trên kênh.");
      continue;
    }

    if (!playlist.id) {
      if (!APPLY) {
        console.log("Playlist chưa tồn tại. Chạy lại với --apply để tạo.");
        continue;
      }
      const created = await youtube.playlists.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: { title: playlist.name, description: "Draw anything. The simple way." },
          status: { privacyStatus: "public" },
        },
      });
      playlist.id = created.data.id ?? null;
      stateChanged = true;
      console.log(`✅ Đã tạo playlist: ${playlist.id}`);
    }

    const existing = new Set<string>();
    let pageToken: string | undefined;
    do {
      const page = await youtube.playlistItems.list({
        part: ["snippet"],
        playlistId: playlist.id!,
        maxResults: 50,
        pageToken,
      });
      for (const item of page.data.items ?? []) {
        const id = item.snippet?.resourceId?.videoId;
        if (id) existing.add(id);
      }
      pageToken = page.data.nextPageToken ?? undefined;
    } while (pageToken);

    const missing = wanted.filter((video) => !existing.has(video.youtube.videoId!));
    console.log(`Playlist đang có ${existing.size} video, thiếu ${missing.length}.`);
    if (!missing.length) continue;
    console.log(`Thiếu: ${missing.map((video) => video.number).join(", ")}`);
    if (!APPLY) {
      console.log("Chạy lại với --apply để thêm.");
      continue;
    }

    for (const video of missing) {
      await youtube.playlistItems.insert({
        part: ["snippet"],
        requestBody: {
          snippet: {
            playlistId: playlist.id!,
            resourceId: { kind: "youtube#video", videoId: video.youtube.videoId! },
          },
        },
      });
      console.log(`✅ ${String(video.number).padStart(2, "0")} ${video.subject} — ${video.youtube.videoId}`);
    }

    const after = await youtube.playlists.list({ part: ["contentDetails"], id: [playlist.id!] });
    const count = after.data.items?.[0]?.contentDetails?.itemCount ?? 0;
    if (playlist.videoCount !== count) {
      playlist.videoCount = count;
      stateChanged = true;
    }
    console.log(`Playlist hiện có ${count} video.`);
  }

  if (stateChanged) {
    await writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
    console.log("\n📝 Đã ghi lại id/số lượng playlist vào publishing-state.json.");
  }
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

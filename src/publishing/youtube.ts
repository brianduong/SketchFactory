import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { chmod, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { google } from "googleapis";
import { loadDrawing } from "../drawing/repository.js";
import { generateMetadata } from "../metadata/engine.js";
import { outputPaths, ROOT } from "../shared/paths.js";

const SECRETS_DIR = path.join(ROOT, ".secrets");
const CLIENT_PATH = path.join(SECRETS_DIR, "youtube-client.json");
const TOKEN_PATH = path.join(SECRETS_DIR, "youtube-token.json");
const RECEIPTS_PATH = path.join(SECRETS_DIR, "youtube-uploads.json");
const PUBLISHING_STATE_PATH = path.join(ROOT, "data", "publishing-state.json");
const UPLOAD_DIR = path.join(ROOT, "output", "upload-ready");
const YOUTUBE_SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl";
const CALLBACK_HOST = "127.0.0.1";
const CALLBACK_PORT = 53682;
const CALLBACK_PATH = "/oauth2callback";

interface InstalledClient {
  client_id: string;
  client_secret: string;
}

interface ClientFile {
  installed?: InstalledClient;
}

interface UploadReceipt {
  drawingId: string;
  number: number;
  videoId: string;
  videoFile: string;
  uploadedAt: string;
  thumbnailSet: boolean;
  captionsSet: boolean;
  publishAt?: string;
}

type UploadReceipts = Record<string, UploadReceipt>;

interface PublishingVideoState {
  number: number;
  youtube: {
    uploaded: boolean;
    visibility: string;
    videoId: string | null;
    scheduledPublishAt?: string | null;
    thumbnailSet?: boolean;
  };
}

interface PublishingState {
  updatedAt: string;
  sequence: {
    lastYouTubeUploaded: number;
  };
  videos: PublishingVideoState[];
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function writeSecretJson(file: string, value: unknown): Promise<void> {
  await mkdir(SECRETS_DIR, { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await chmod(file, 0o600);
}

async function createOAuthClient() {
  const clientFile = await readJson<ClientFile>(CLIENT_PATH);
  const installed = clientFile.installed;
  if (!installed?.client_id || !installed.client_secret) {
    throw new Error(`OAuth client JSON không hợp lệ: ${CLIENT_PATH}`);
  }
  const redirectUri = `http://${CALLBACK_HOST}:${CALLBACK_PORT}${CALLBACK_PATH}`;
  return new google.auth.OAuth2(installed.client_id, installed.client_secret, redirectUri);
}

async function authenticatedClient() {
  const oauth = await createOAuthClient();
  let token: Record<string, unknown>;
  try {
    token = await readJson<Record<string, unknown>>(TOKEN_PATH);
  } catch {
    throw new Error("Chưa có YouTube OAuth token. Hãy chạy npm run youtube:auth trước.");
  }
  oauth.setCredentials(token);
  oauth.on("tokens", (fresh) => {
    void writeSecretJson(TOKEN_PATH, { ...token, ...fresh });
  });
  return oauth;
}

export async function authorizeYouTube(): Promise<void> {
  const oauth = await createOAuthClient();
  const state = randomBytes(24).toString("hex");
  const authUrl = oauth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [YOUTUBE_SCOPE],
    state,
  });

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      server.close();
      reject(new Error("Hết thời gian chờ OAuth sau 5 phút."));
    }, 5 * 60 * 1000);

    const server = createServer(async (request, response) => {
      try {
        const url = new URL(request.url ?? "/", `http://${CALLBACK_HOST}:${CALLBACK_PORT}`);
        if (url.pathname !== CALLBACK_PATH) {
          response.writeHead(404).end("Not found");
          return;
        }
        if (url.searchParams.get("state") !== state) {
          throw new Error("OAuth state không khớp.");
        }
        const oauthError = url.searchParams.get("error");
        if (oauthError) throw new Error(`Google từ chối OAuth: ${oauthError}`);
        const code = url.searchParams.get("code");
        if (!code) throw new Error("Google không trả OAuth code.");

        const { tokens } = await oauth.getToken(code);
        await writeSecretJson(TOKEN_PATH, tokens);
        oauth.setCredentials(tokens);
        const channel = await currentYouTubeChannel(oauth);

        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        response.end(`SketchFactory connected to YouTube channel: ${channel.title}. You can close this tab.`);
        clearTimeout(timeout);
        server.close();
        console.log(`✅ Đã kết nối kênh: ${channel.title}`);
        console.log(`Channel ID: ${channel.id}`);
        resolve();
      } catch (error) {
        clearTimeout(timeout);
        response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("OAuth failed. Return to the terminal for details.");
        server.close();
        reject(error);
      }
    });

    server.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.listen(CALLBACK_PORT, CALLBACK_HOST, () => {
      console.log("Mở URL này trong trình duyệt và cấp quyền cho đúng kênh YouTube:");
      console.log(authUrl);
      console.log("\nĐang chờ Google chuyển về máy...");
    });
  });
}

async function currentYouTubeChannel(auth: Awaited<ReturnType<typeof createOAuthClient>>) {
  const youtube = google.youtube({ version: "v3", auth });
  const response = await youtube.channels.list({ part: ["id", "snippet"], mine: true });
  const channel = response.data.items?.[0];
  if (!channel?.id) throw new Error("Tài khoản OAuth không trả về kênh YouTube nào.");
  return {
    id: channel.id,
    title: channel.snippet?.title ?? "(không có tên)",
  };
}

export async function showYouTubeChannel(): Promise<void> {
  const auth = await authenticatedClient();
  const channel = await currentYouTubeChannel(auth);
  console.log(`Channel: ${channel.title}`);
  console.log(`Channel ID: ${channel.id}`);
}

async function findNumberedVideo(number: number): Promise<string> {
  const prefix = `${String(number).padStart(2, "0")}-`;
  const matches = (await readdir(UPLOAD_DIR))
    .filter((file) => file.startsWith(prefix) && file.endsWith(".mp4"));
  if (matches.length !== 1) {
    throw new Error(`Cần đúng một MP4 có prefix ${prefix} trong ${UPLOAD_DIR}, hiện có ${matches.length}.`);
  }
  return path.join(UPLOAD_DIR, matches[0]!);
}

async function requireFile(file: string): Promise<void> {
  const info = await stat(file);
  if (!info.isFile() || info.size === 0) throw new Error(`File không hợp lệ: ${file}`);
}

async function loadReceipts(): Promise<UploadReceipts> {
  try {
    return await readJson<UploadReceipts>(RECEIPTS_PATH);
  } catch {
    return {};
  }
}

async function recordPublishingState(
  number: number,
  videoId: string,
  visibility: string,
  publishAt: string | undefined,
  thumbnailSet: boolean,
): Promise<void> {
  const state = await readJson<PublishingState>(PUBLISHING_STATE_PATH);
  const video = state.videos.find((item) => item.number === number);
  if (!video) {
    throw new Error(`Publishing state chưa có video số ${number}.`);
  }
  video.youtube.uploaded = true;
  video.youtube.visibility = publishAt ? "scheduled" : visibility;
  video.youtube.videoId = videoId;
  video.youtube.scheduledPublishAt = publishAt ?? null;
  video.youtube.thumbnailSet = thumbnailSet;
  state.sequence.lastYouTubeUploaded = Math.max(state.sequence.lastYouTubeUploaded, number);
  state.updatedAt = new Date().toISOString();
  await writeFile(PUBLISHING_STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);
}

export async function uploadYouTubeVideo(options: {
  drawingId: string;
  number: number;
  privacy: "private" | "unlisted" | "public";
  confirmChannelId: string;
  publishAt?: string;
}): Promise<void> {
  if (options.publishAt) {
    if (options.privacy !== "private") {
      throw new Error("YouTube chỉ nhận lịch publishAt khi video đang ở privacy private.");
    }
    if (Number.isNaN(Date.parse(options.publishAt))) {
      throw new Error(`publishAt không phải mốc thời gian hợp lệ: ${options.publishAt}`);
    }
    if (Date.parse(options.publishAt) <= Date.now()) {
      throw new Error(`publishAt phải nằm ở tương lai: ${options.publishAt}`);
    }
  }

  const auth = await authenticatedClient();
  const channel = await currentYouTubeChannel(auth);
  if (channel.id !== options.confirmChannelId) {
    throw new Error(`Sai kênh OAuth. Đang kết nối "${channel.title}" (${channel.id}), không phải channel đã xác nhận.`);
  }

  const drawing = await loadDrawing(options.drawingId);
  const metadata = generateMetadata(drawing).youtubeShorts;
  const videoFile = await findNumberedVideo(options.number);
  const paths = outputPaths(drawing.id);
  await Promise.all([requireFile(videoFile), requireFile(paths.thumbnail), requireFile(paths.subtitles)]);

  const youtube = google.youtube({ version: "v3", auth });
  const receipts = await loadReceipts();
  let receipt = receipts[drawing.id];
  const warnings: string[] = [];

  if (!receipt) {
    console.log(`Uploading ${path.basename(videoFile)} to "${channel.title}" as ${options.privacy}...`);
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: metadata.title,
          description: metadata.description,
          tags: metadata.keywords,
          categoryId: "26",
          defaultLanguage: "en",
          defaultAudioLanguage: "en",
        },
        status: {
          privacyStatus: options.privacy,
          ...(options.publishAt ? { publishAt: options.publishAt } : {}),
          selfDeclaredMadeForKids: false,
          containsSyntheticMedia: false,
          license: "youtube",
          embeddable: true,
          publicStatsViewable: true,
        },
      },
      media: { body: createReadStream(videoFile) },
    });
    const videoId = response.data.id;
    if (!videoId) throw new Error("YouTube upload xong nhưng không trả video ID.");
    receipt = {
      drawingId: drawing.id,
      number: options.number,
      videoId,
      videoFile: path.basename(videoFile),
      uploadedAt: new Date().toISOString(),
      thumbnailSet: false,
      captionsSet: false,
      ...(options.publishAt ? { publishAt: options.publishAt } : {}),
    };
    receipts[drawing.id] = receipt;
    await writeSecretJson(RECEIPTS_PATH, receipts);
  } else {
    console.log(`Đã có upload receipt cho ${drawing.id}; tiếp tục hoàn thiện video ${receipt.videoId}.`);
    if (options.publishAt && receipt.publishAt !== options.publishAt) {
      await youtube.videos.update({
        part: ["status"],
        requestBody: {
          id: receipt.videoId,
          status: {
            privacyStatus: "private",
            publishAt: options.publishAt,
            selfDeclaredMadeForKids: false,
            license: "youtube",
            embeddable: true,
            publicStatsViewable: true,
          },
        },
      });
      receipt.publishAt = options.publishAt;
      await writeSecretJson(RECEIPTS_PATH, receipts);
      console.log(`Đã đặt lại lịch publish: ${options.publishAt}`);
    }
  }

  if (!receipt.thumbnailSet) {
    try {
      await youtube.thumbnails.set({
        videoId: receipt.videoId,
        media: { body: createReadStream(paths.thumbnail) },
      });
      receipt.thumbnailSet = true;
      await writeSecretJson(RECEIPTS_PATH, receipts);
    } catch (error) {
      warnings.push(`Không đặt được custom thumbnail: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (!receipt.captionsSet) {
    try {
      await youtube.captions.insert({
        part: ["snippet"],
        requestBody: {
          snippet: {
            videoId: receipt.videoId,
            language: "en",
            name: "English",
            isDraft: false,
          },
        },
        media: { body: createReadStream(paths.subtitles) },
      });
      receipt.captionsSet = true;
      await writeSecretJson(RECEIPTS_PATH, receipts);
    } catch (error) {
      warnings.push(`Không upload được phụ đề: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const verified = await youtube.videos.list({ part: ["status"], id: [receipt.videoId] });
  const status = verified.data.items?.[0]?.status;

  console.log(`✅ YouTube upload hoàn tất: https://youtu.be/${receipt.videoId}`);
  console.log(`Channel: ${channel.title} (${channel.id})`);
  console.log(`Privacy requested: ${options.privacy}`);
  console.log(`Privacy đọc lại từ API: ${status?.privacyStatus}`);
  if (options.publishAt) console.log(`Lịch publish đọc lại từ API: ${status?.publishAt ?? "(chưa có)"}`);
  for (const warning of warnings) console.warn(`⚠️ ${warning}`);
  await recordPublishingState(
    options.number,
    receipt.videoId,
    options.privacy,
    options.publishAt,
    receipt.thumbnailSet,
  );
}

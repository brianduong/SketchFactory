#!/usr/bin/env node
import { authorizeYouTube, showYouTubeChannel, uploadYouTubeVideo } from "./youtube.js";

function flags(args: string[]): Map<string, string | true> {
  const result = new Map<string, string | true>();
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index]!;
    if (!token.startsWith("--")) continue;
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      result.set(token.slice(2), next);
      index += 1;
    } else {
      result.set(token.slice(2), true);
    }
  }
  return result;
}

function required(values: Map<string, string | true>, name: string): string {
  const value = values.get(name);
  if (typeof value !== "string" || !value) throw new Error(`Thiếu --${name}.`);
  return value;
}

async function main(): Promise<void> {
  const [, , command, ...args] = process.argv;
  const values = flags(args);
  switch (command) {
    case "auth":
      await authorizeYouTube();
      break;
    case "channel":
      await showYouTubeChannel();
      break;
    case "upload": {
      const number = Number(required(values, "number"));
      if (!Number.isInteger(number) || number < 1) throw new Error("--number phải là số nguyên dương.");
      const privacy = required(values, "privacy");
      if (privacy !== "private" && privacy !== "unlisted" && privacy !== "public") {
        throw new Error("--privacy phải là private, unlisted hoặc public.");
      }
      await uploadYouTubeVideo({
        drawingId: required(values, "id"),
        number,
        privacy,
        confirmChannelId: required(values, "confirm-channel"),
      });
      break;
    }
    default:
      console.log("SketchFactory YouTube CLI");
      console.log("  auth");
      console.log("  channel");
      console.log("  upload --number <n> --id <drawing-id> --privacy <private|unlisted|public> --confirm-channel <channel-id>");
      if (command) process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

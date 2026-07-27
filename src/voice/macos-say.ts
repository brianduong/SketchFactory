import { mkdir } from "node:fs/promises";
import path from "node:path";
import { runCommand } from "../shared/command.js";
import { ensureParent } from "../shared/fs.js";
import type { SynthesisRequest, VoiceProvider } from "./provider.js";

export class MacOsSayProvider implements VoiceProvider {
  readonly id = "macos-say";

  async synthesize(request: SynthesisRequest): Promise<void> {
    if (process.platform !== "darwin") {
      throw new Error("Provider macos-say chỉ chạy trên macOS. Hãy cấu hình provider TTS khác.");
    }
    await ensureParent(request.outputFile);
    await mkdir(request.tempDir, { recursive: true });
    const clips: string[] = [];
    for (const [index, cue] of request.cues.entries()) {
      const output = path.join(request.tempDir, `voice-${String(index + 1).padStart(2, "0")}.aiff`);
      await runCommand("say", ["-v", request.voice, "-r", String(request.rate), "-o", output, cue.text], true);
      clips.push(output);
    }

    const args = clips.flatMap((file) => ["-i", file]);
    const delayed = request.cues.map((cue, index) => `[${index}:a]adelay=${cue.startMs}:all=1[a${index}]`);
    const labels = request.cues.map((_, index) => `[a${index}]`).join("");
    const filter = `${delayed.join(";")};${labels}amix=inputs=${clips.length}:duration=longest:normalize=0,apad=whole_dur=${request.durationSeconds},atrim=duration=${request.durationSeconds},aresample=48000[aout]`;
    await runCommand("ffmpeg", [
      "-y", ...args,
      "-filter_complex", filter,
      "-map", "[aout]",
      "-c:a", "pcm_s16le",
      request.outputFile,
    ], true);
  }
}

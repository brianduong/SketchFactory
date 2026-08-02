import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { KokoroTTS } from "kokoro-js";
import { runCommand } from "../shared/command.js";
import { ensureParent } from "../shared/fs.js";
import type { SynthesisRequest, VoiceProvider } from "./provider.js";

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";

type KokoroVoice = Parameters<KokoroTTS["generate"]>[1] extends { voice?: infer V } ? V : never;

/**
 * Kokoro TTS chạy cục bộ qua onnxruntime. Model tải về cache của transformers.js ở lần
 * chạy đầu, các lần sau dùng lại nên không cần mạng.
 */
export class KokoroProvider implements VoiceProvider {
  readonly id = "kokoro";
  private tts: KokoroTTS | undefined;

  private async load(): Promise<KokoroTTS> {
    this.tts ??= await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "q8", device: "cpu" });
    return this.tts;
  }

  async synthesize(request: SynthesisRequest): Promise<void> {
    await ensureParent(request.outputFile);
    await mkdir(request.tempDir, { recursive: true });
    const tts = await this.load();

    const clips: string[] = [];
    for (const [index, cue] of request.cues.entries()) {
      const output = path.join(request.tempDir, `voice-${String(index + 1).padStart(2, "0")}.wav`);
      const audio = await tts.generate(cue.text, {
        voice: request.voice as KokoroVoice,
        speed: request.speed,
      });
      await writeFile(output, Buffer.from(audio.toWav()));
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

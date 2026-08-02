import type { VoiceCue } from "../types/drawing.js";

export interface SynthesisRequest {
  cues: VoiceCue[];
  outputFile: string;
  tempDir: string;
  voice: string;
  /** Tốc độ đọc của macos-say, tính bằng từ mỗi phút. */
  rate: number;
  /** Hệ số tốc độ của Kokoro: 1 là bình thường, nhỏ hơn 1 là đọc chậm. */
  speed: number;
  durationSeconds: number;
}

export interface VoiceProvider {
  readonly id: string;
  synthesize(request: SynthesisRequest): Promise<void>;
}

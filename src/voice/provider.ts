import type { VoiceCue } from "../types/drawing.js";

export interface SynthesisRequest {
  cues: VoiceCue[];
  outputFile: string;
  tempDir: string;
  voice: string;
  rate: number;
  durationSeconds: number;
}

export interface VoiceProvider {
  readonly id: string;
  synthesize(request: SynthesisRequest): Promise<void>;
}

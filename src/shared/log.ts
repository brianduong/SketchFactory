export function log(stage: string, message: string): void {
  process.stdout.write(`[${new Date().toISOString()}] [${stage}] ${message}\n`);
}

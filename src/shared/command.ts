import { spawn } from "node:child_process";

export async function runCommand(command: string, args: string[], quiet = false): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });
    child.on("error", (error) => reject(new Error(`Không thể chạy ${command}: ${error.message}`)));
    child.on("close", (code) => {
      if (code === 0) {
        if (!quiet && stderr.trim()) process.stderr.write(stderr);
        resolve(stdout);
      } else {
        reject(new Error(`${command} thất bại (exit ${code}): ${stderr.trim() || stdout.trim()}`));
      }
    });
  });
}

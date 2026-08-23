#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import path from "node:path";
import { planDrawing, loadDrawing } from "../drawing/repository.js";
import { runPipeline } from "../core/pipeline.js";
import { validateDrawing } from "../quality-control/validator.js";
import { buildQualityReport } from "../quality-control/report.js";
import { DATA_DIR, outputPaths } from "../shared/paths.js";
import { readJson, writeJson } from "../shared/fs.js";
import type { Drawing } from "../types/drawing.js";

function flags(args: string[]): Map<string, string | true> {
  const result = new Map<string, string | true>();
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index]!;
    if (!token.startsWith("--")) continue;
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      result.set(token.slice(2), next);
      index += 1;
    } else result.set(token.slice(2), true);
  }
  return result;
}

function required(values: Map<string, string | true>, name: string): string {
  const value = values.get(name);
  if (typeof value !== "string" || !value) throw new Error(`Thiếu --${name}.`);
  return value;
}

async function listDrawings(): Promise<void> {
  let files: string[] = [];
  try { files = (await readdir(DATA_DIR)).filter((file) => file.endsWith(".json")).sort(); } catch { /* Chưa có data. */ }
  if (!files.length) {
    console.log("Chưa có drawing. Chạy: npm run create -- --subject cat");
    return;
  }
  console.log("ID\tSTATUS\tSTROKES\tNAME");
  for (const file of files) {
    const drawing = await readJson<Drawing>(path.join(DATA_DIR, file));
    console.log(`${drawing.id}\t${drawing.status}\t${drawing.strokeCount}\t${drawing.name.en}`);
  }
}

async function main(): Promise<void> {
  const [, , command, ...args] = process.argv;
  const values = flags(args);
  switch (command) {
    case "create": {
      const drawing = await planDrawing(required(values, "subject"));
      await runPipeline(drawing, { force: values.has("force") });
      console.log(`\n✅ Pipeline hoàn tất: ${drawing.id}`);
      console.log(`Video: ${outputPaths(drawing.id).video}`);
      break;
    }
    case "render:short": {
      const drawing = await loadDrawing(required(values, "id"));
      await runPipeline(drawing, { force: values.has("force"), videoOnly: true });
      console.log(`✅ Video: ${outputPaths(drawing.id).video}`);
      break;
    }
    case "validate": {
      const drawing = await loadDrawing(required(values, "id"));
      const paths = outputPaths(drawing.id);
      const dataIssues = validateDrawing(drawing);
      const report = await buildQualityReport(drawing, {
        sourceJson: paths.source,
        fullSvg: paths.fullSvg,
        layeredSvg: paths.layeredSvg,
        transparentPng: paths.transparentPng,
        whitePng: paths.whitePng,
        voice: paths.audio,
        subtitles: paths.subtitles,
        shortVideo: paths.video,
        thumbnail: paths.thumbnail,
        metadata: paths.metadata,
      }, paths.video);
      await writeJson(paths.report, report);
      for (const issue of dataIssues) console.log(`${issue.severity.toUpperCase()} ${issue.code}: ${issue.message}`);
      console.log(report.passed ? "✅ QC đạt." : "❌ QC không đạt.");
      if (!report.passed) process.exitCode = 1;
      break;
    }
    case "list":
      await listDrawings();
      break;
    case "render:collection":
    case "batch":
      throw new Error(`Lệnh "${command}" đã có vị trí trong kiến trúc nhưng nằm ngoài MVP 0.1.`);
    default:
      console.log("SketchFactory CLI");
      console.log("  create --subject <ant|bat|bear|beaver|bee|butterfly|cactus|camel|car|cat|caterpillar|cow|crab|crocodile|cupcake|deer|dog|dragonfly|duck|elephant|fish|flamingo|fox|frog|giraffe|hedgehog|horse|house|icecream|jellyfish|kangaroo|koala|ladybug|lion|llama|monkey|mouse|octopus|owl|panda|peacock|penguin|pig|platypus|pufferfish|rabbit|rhino|robot|rocket|rooster|sailboat|scorpion|seahorse|sheep|sloth|snail|snake|spider|squirrel|starfish|stegosaurus|swan|toucan|trex|tulip|turtle|umbrella|unicorn|walrus|whale|zebra> [--force]");
      console.log("  render:short --id <drawing-id> [--force]");
      console.log("  validate --id <drawing-id>");
      console.log("  list");
      if (command) process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

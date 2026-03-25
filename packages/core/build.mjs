import { build } from "vite";
import { copyFile, watch } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "dist/main.css");
const dest = resolve(__dirname, "../../main.css");
const watchMode = process.argv.includes("--watch");

async function runBuild() {
  await build({ logLevel: "silent" });
  await copyFile(src, dest);
  console.log(`  main.css written`);
}

await runBuild();

if (watchMode) {
  const srcDir = resolve(__dirname, "src");
  const watcher = watch(srcDir, { recursive: true });
  console.log("  Watching src/ for changes...");
  for await (const event of watcher) {
    if (event.filename?.endsWith(".css")) {
      await runBuild();
    }
  }
}

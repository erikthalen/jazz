import { createRequire } from "node:module";
import { watch, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, "src/main.css");
const dest = resolve(__dirname, "../../jazz.css");
const watchMode = process.argv.includes("--watch");

// Load lightningcss from Vite's own dependencies — no extra install needed
const req = createRequire(import.meta.resolve("vite"));
const { bundle: lcBundle, browserslistToTargets } = req("lightningcss");

const targets = browserslistToTargets(browserslist("> 0.5%, last 2 versions, Firefox ESR, not dead"));

async function runBuild() {
  const { code, map } = lcBundle({
    filename: srcFile,
    minify: true,
    targets,
    sourceMap: true,
  });

  await writeFile(dest, code + "\n/*# sourceMappingURL=jazz.css.map */");
  await writeFile(dest + ".map", map);
  console.log("  jazz.css written");
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

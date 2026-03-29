import { createRequire } from "node:module";
import { watch, writeFile } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, "src/main.css");
const dest = resolve(__dirname, "../../jazz.css");
const watchMode = process.argv.includes("--watch");

// Load lightningcss from Vite's own dependencies — no extra install needed
const req = createRequire(import.meta.resolve("vite"));
const { bundle: lcBundle, browserslistToTargets } = req("lightningcss");

const targets = browserslistToTargets(browserslist("chrome >= 123, firefox >= 120, safari >= 17.5"));

async function runBuild() {
  const { code, map } = lcBundle({
    filename: srcFile,
    minify: true,
    targets,
    sourceMap: true,
  });

  const destDir = dirname(dest);
  const mapJson = JSON.parse(map.toString());
  mapJson.sources = mapJson.sources.map(s => relative(destDir, "/" + s));

  await writeFile(dest, code + "\n/*# sourceMappingURL=jazz.css.map */");
  await writeFile(dest + ".map", JSON.stringify(mapJson));
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

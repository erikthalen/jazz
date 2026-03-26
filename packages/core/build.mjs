import { preprocessCSS, resolveConfig } from "vite";
import { createRequire } from "node:module";
import { copyFile, mkdir, readFile, watch, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, "src/main.css");
const distFile = resolve(__dirname, "dist/main.css");
const dest = resolve(__dirname, "../../main.css");
const watchMode = process.argv.includes("--watch");

// Load lightningcss from Vite's own dependencies — no extra install needed
const req = createRequire(import.meta.resolve("vite"));
const { transform: lcTransform, browserslistToTargets } = req("lightningcss");
const browserslist = req("browserslist");

async function runBuild() {
  const code = await readFile(srcFile, "utf-8");
  const config = await resolveConfig({}, "build");
  const { code: bundled } = await preprocessCSS(code, srcFile, config);

  const targets = browserslistToTargets(browserslist("> 0.5%, last 2 versions, Firefox ESR, not dead"));

  const { code: minified } = lcTransform({
    filename: "main.css",
    code: Buffer.from(bundled),
    minify: true,
    targets,
  });

  await mkdir(resolve(__dirname, "dist"), { recursive: true });
  await writeFile(distFile, minified);
  await copyFile(distFile, dest);
  console.log("  main.css written");
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

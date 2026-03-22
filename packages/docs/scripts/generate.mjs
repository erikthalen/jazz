import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const { default: app } = await import("../dist/.server/index.js");

const routes = [
  "/",
  "/introduction",
  "/themes",
  "/components/prose",
  "/components/accordion",
  "/components/button",
  "/components/button-group",
  "/components/card",
  "/components/checkbox",
  "/components/color-input",
  "/components/dialog",
  "/components/text-field",
  "/components/kbd",
  "/components/loading",
  "/components/popover",
  "/components/progress",
  "/components/radio",
  "/components/separator",
  "/components/slider",
  "/components/switch",
  "/components/table",
  "/components/toggle",
  "/components/toggle-group",
  "/components/tooltip",
  "/icons",
  "/customization",
  "/components/badge",
  "/components/dropdown",
  "/components/select",
  "/components/toast",
  "/components/submenu",
  "/components/field",
  "/easings",
];

const outDir = new URL("../dist", import.meta.url).pathname;

for (const route of routes) {
  const response = await app.fetch(new Request(`http://localhost${route}`));
  const html = await response.text();

  const dir = route === "/" ? outDir : join(outDir, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  console.log(`  ${route}`);
}

// Copy main.css to dist
const rootCss = new URL("../../../main.css", import.meta.url).pathname;
await copyFile(rootCss, join(outDir, "main.css"));

// GitHub Pages needs this to disable Jekyll processing
await writeFile(join(outDir, ".nojekyll"), "");

console.log(`\nGenerated ${routes.length} pages → dist/`);

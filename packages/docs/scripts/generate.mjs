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
  "/components/combobox",
  "/components/datalist",
  "/components/date-input",
  "/components/dialog",
  "/components/text-field",
  "/components/textarea",
  "/components/expander",
  "/components/file-drop",
  "/components/code",
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
  "/icons.json",
  "/icons-filled.json",
  "/customization",
  "/components/badge",
  "/components/dropdown",
  "/components/select",
  "/components/toast",
  "/components/submenu",
  "/components/field",
  "/components/radio-group",
  "/blocks",
  "/blocks/richtext-editor",
  "/blocks/signup-form",
  "/blocks/sidebar",
  "/easings",
  "/typography",
  "/skills",
  "/llms.txt",
];

const outDir = new URL("../dist", import.meta.url).pathname;

for (const route of routes) {
  const response = await app.fetch(new Request(`http://localhost${route}`));
  const content = await response.text();

  if (route.includes('.')) {
    await writeFile(join(outDir, route), content);
  } else {
    const dir = route === "/" ? outDir : join(outDir, route);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), content);
  }
  console.log(`  ${route}`);
}

// Copy jazz.css to dist
const rootCss = new URL("../../../jazz.css", import.meta.url).pathname;
await copyFile(rootCss, join(outDir, "jazz.css"));

// Regenerate SKILL.md at repo root so it stays in sync with the build
const skillResponse = await app.fetch(new Request("http://localhost/skill.md"));
const skillContent = await skillResponse.text();
const repoRoot = new URL("../../..", import.meta.url).pathname;
await writeFile(join(repoRoot, "SKILL.md"), skillContent);
console.log("  SKILL.md → repo root");

// Copy minisearch ESM bundle
const miniSearchSrc = new URL("../node_modules/minisearch/dist/es/index.js", import.meta.url).pathname;
await copyFile(miniSearchSrc, join(outDir, "minisearch.js"));

// GitHub Pages needs this to disable Jekyll processing
await writeFile(join(outDir, ".nojekyll"), "");

console.log(`\nGenerated ${routes.length} pages → dist/`);

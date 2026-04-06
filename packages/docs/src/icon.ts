import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const tablerDir = resolve(
  import.meta.dirname,
  "../node_modules/@tabler/icons/icons",
);

export function icon(
  name: string,
  {
    size = 16,
    filled = false,
    attrs = "",
  }: { size?: number; filled?: boolean; attrs?: string } = {},
): string {
  const variant = filled ? "filled" : "outline";
  const file = resolve(tablerDir, variant, `${name}.svg`);
  const raw = readFileSync(file, "utf-8");

  return raw
    .replace(/\s*class="[^"]*"/, "")
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`)
    .replace(/<svg/, `<svg ${attrs}`);
}

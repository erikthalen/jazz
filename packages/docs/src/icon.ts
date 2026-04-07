import { readFileSync } from "node:fs";
import { join } from "node:path";

declare const __TABLER_ICONS_DIR__: string;
const tablerDir = __TABLER_ICONS_DIR__;

export function icon(
  name: string,
  {
    size = 16,
    filled = false,
    attrs = "",
  }: { size?: number; filled?: boolean; attrs?: string } = {},
): string {
  const variant = filled ? "filled" : "outline";
  const file = join(tablerDir, variant, `${name}.svg`);
  const raw = readFileSync(file, "utf-8");

  return raw
    .replace(/\s*class="[^"]*"/, "")
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`)
    .replace(/<svg/, `<svg ${attrs}`);
}

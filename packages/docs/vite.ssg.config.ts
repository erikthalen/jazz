import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  define: {
    "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL ?? "/"),
    __TABLER_ICONS_DIR__: JSON.stringify(
      resolve(import.meta.dirname, "node_modules/@tabler/icons/icons"),
    ),
  },
  build: {
    ssr: "src/index.ts",
    outDir: "dist/.server",
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});

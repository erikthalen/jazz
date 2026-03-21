import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL ?? "/"),
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

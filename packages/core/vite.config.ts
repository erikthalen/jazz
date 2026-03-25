import { defineConfig, type Plugin } from "vite";

function dropJs(): Plugin {
  return {
    name: "drop-js",
    generateBundle(_opts, bundle) {
      for (const key of Object.keys(bundle)) {
        if (key.endsWith(".js")) delete bundle[key];
      }
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: "src/entry.ts",
      formats: ["es"],
      fileName: "entry",
    },
    rollupOptions: {
      output: {
        assetFileNames: "main[extname]",
      },
    },
    outDir: "../..",
    emptyOutDir: false,
    cssMinify: true,
  },
  plugins: [dropJs()],
});

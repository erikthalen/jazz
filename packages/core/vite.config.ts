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
  css: {
    lightningcss: {
      targets: { chrome: 123 << 16, firefox: 120 << 16, safari: (17 << 16) | (5 << 8) },
    },
    transformer: "lightningcss",
  },
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
    outDir: "dist",
    emptyOutDir: false,
    cssMinify: "lightningcss",
  },
  plugins: [dropJs()],
});

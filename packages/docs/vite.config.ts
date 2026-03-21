import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import { resolve } from "node:path";

const coreCss = resolve(import.meta.url, "../core/dist/main.css");

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts",
    }),
    {
      name: "watch-core-css",
      configureServer(server) {
        server.watcher.add(coreCss);
      },
      handleHotUpdate({ file, server }) {
        if (file !== coreCss) return;
        for (const mod of server.moduleGraph.idToModuleMap.values()) {
          server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
  ],
});

import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

const coreCssPath = resolve(import.meta.url, "../../main.css");

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts",
    }),
    {
      name: "serve-and-watch-core-css",
      configureServer(server) {
        server.watcher.add(coreCssPath);
        server.middlewares.use("/main.css", (_req, res) => {
          res.setHeader("Content-Type", "text/css");
          res.end(readFileSync(coreCssPath, "utf-8"));
        });
      },
      handleHotUpdate({ file, server }) {
        if (file !== coreCssPath) return;
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
  ],
});

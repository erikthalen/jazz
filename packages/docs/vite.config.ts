import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const coreCssPath = fileURLToPath(new URL("../../main.css", import.meta.url));

export default defineConfig({
  plugins: [
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
    devServer({
      entry: "src/index.ts",
    }),
  ],
});

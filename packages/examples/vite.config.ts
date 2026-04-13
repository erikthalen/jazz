import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    devServer({
      entry: "src/index.ts",
    }),
  ],
});

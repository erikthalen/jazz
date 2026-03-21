import { html } from "hono/html";
import { Layout } from "../layout";

export function IconsPage(path: string) {
  return Layout({
    title: "Icons",
    path,
    content: html`
      <h1>Icons</h1>
      <p class="lead">Jazz doesn't ship icons — use any icon library you like.</p>

      <p>
        <a href="https://tabler.io/icons" target="_blank" rel="noopener">Tabler Icons</a>
        is a great source of free, open-source SVG icons. Over 5000 icons,
        consistent stroke style, and easy to copy as inline SVG or use via the
        npm package.
      </p>

      <p>
        Inline SVGs work especially well with Jazz since they inherit
        <code>currentColor</code> and scale with <code>font-size</code> — no
        extra setup needed.
      </p>
    `,
  });
}

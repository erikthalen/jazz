import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import pkg from "../../../core/package.json";

const { version } = pkg;
const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${version}/main.css`;

export async function IntroPage(path: string) {
  return Layout({
    title: "Introduction",
    path: "/introduction",
    content: html`
      <h1>Jazz</h1>
      <p class="lead">
        A minimal CSS design system. Drop in the stylesheet and use semantic
        HTML.
      </p>

      <h2 id="usage">Usage</h2>
      <p>Link the stylesheet from the CDN:</p>
      <div class="example">
        <div class="code-block">
          ${raw(await highlight(`<link rel="stylesheet" href="${cdnUrl}" />`, "html"))}
        </div>
      </div>

      <h2 id="overview">Overview</h2>
      <p>
        Jazz styles native HTML elements directly — no class names required.
      </p>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <input type="text" placeholder="Input" style="width:180px" />
            <button>Button</button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<fieldset role="group"><input type="text" placeholder="Input" />\n<button>Button</button></fieldset>',
            ),
          )}
        </div>
      </div>
    `,
  });
}

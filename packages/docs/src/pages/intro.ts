import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import pkg from "../../../core/package.json";

const { version } = pkg;
const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${version}/main.css`;

const toc = [
  { id: "usage", label: "Usage" },
  { id: "overview", label: "Overview" },
  { id: "ui-not-layout", label: "UI, not layout" },
];

export async function IntroPage(path: string) {
  return Layout({
    title: "Introduction",
    path: "/introduction",
    toc,
    content: html`
      <div class="prose">
        <h1>Jazz</h1>
        <p class="lead">
          A minimal CSS design system. Drop in the stylesheet and use semantic
          HTML.
        </p>

        <h2 id="usage">Usage</h2>
        <p>Link the stylesheet from the CDN:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<link rel="stylesheet" href="${cdnUrl}" />\n\n<!-- Optional: theme -->\n<style>\n  :root {\n    --jazz-primary-light: #111;\n    --jazz-primary-dark: #fefefe;\n  }\n</style>`,
              "html",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="overview">Overview</h2>
        <p>Jazz styles native HTML elements directly, no class names required.</p>
      </div>
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

      <div class="prose">
        <h2 id="ui-not-layout">UI, not layout</h2>
        <p>
          Jazz handles the look of interactive elements (buttons, inputs,
          popovers) but deliberately stays out of the way of how you arrange them
          on the page. CSS <code>flex</code> and <code>grid</code> are fast to
          write, easy to read, and need no abstraction on top of them.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--spacing-3);width:100%;max-width:400px;margin:auto"
          >
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email" style="grid-column:1/-1" />
            <button style="grid-column:1/-1;justify-self:end">Submit</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem">\n  <input type="text" placeholder="First name" />\n  <input type="text" placeholder="Last name" />\n  <input type="email" placeholder="Email" style="grid-column:1/-1" />\n  <button style="grid-column:1/-1;justify-self:end">Submit</button>\n</div>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}

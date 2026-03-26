import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import pkg from "../../../core/package.json";

const { version } = pkg;
const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${version}/jazz.css`;

const toc = [
  { id: "usage", label: "Usage" },
  { id: "overview", label: "Overview" },
  { id: "ui-not-layout", label: "UI, not layout" },
  { id: "philosophy", label: "Philosophy" },
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
          A CSS reset and a small UI library in one stylesheet.
        </p>
        <p>
          Jazz is somewhere between a CSS reset and a classless CSS project. It
          styles native HTML elements directly, so plain semantic markup looks
          decent with no extra work. A small set of opt-in class names covers
          the things HTML can't express on its own.
        </p>
        <p>
          It takes a lot of inspiration from <a href="https://picocss.com" target="_blank" rel="noopener">Pico CSS</a>:
          the idea that a stylesheet should improve the browser's defaults rather
          than replace them. Jazz adds a richer component set and a theming layer on top of that.
        </p>

        <h2 id="usage">Usage</h2>
        <p>Link the stylesheet from the CDN:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<link rel="stylesheet" href="${cdnUrl}" />\n\n<!-- Optional: theme -->\n<style>\n  :root {\n    --jazz-primary: light-dark(#111, #fefefe);\n  }\n</style>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="overview">Overview</h2>
        <p>
          Jazz styles native HTML elements directly, no class names required.
        </p>
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
          popovers) but deliberately stays out of the way of how you arrange
          them on the page. CSS <code>flex</code> and <code>grid</code> are fast
          to write, easy to read, and need no abstraction on top of them.
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

      <div class="prose">
        <h2 id="philosophy">Philosophy</h2>
        <p>
          Jazz is also a personal testbed for modern CSS. New features like
          anchor positioning, <code>@starting-style</code>, the Popover API, and
          <code>:has()</code> are tried out here first. The aim is to see how
          far CSS alone can get before JavaScript is needed.
        </p>
        <p>
          Because of that, Jazz leans on newer browser features and isn't
          aimed at projects that need broad compatibility. It's more of a
          place to experiment than a production-ready toolkit.
        </p>
      </div>
    `,
  });
}

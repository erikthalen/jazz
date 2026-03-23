import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "multiple", label: "Multiple items" },
  { id: "exclusive", label: "Exclusive" },
  { id: "open", label: "Open by default" },
];

export async function AccordionPage(path: string) {
  return Layout({
    title: "Accordion",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Accordion</h1>
        <p class="lead">
          Collapsible content sections using the native
          <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details style="width:100%">
            <summary>What is Jazz?</summary>
            <div>
              Jazz is a minimal CSS design system that styles native HTML
              elements directly — no utility classes or component wrappers
              needed.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details>
  <summary>What is Jazz?</summary>
  <div>
    Jazz is a minimal CSS design system that styles native
    HTML elements directly.
  </div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple items</h2>
        <p>
          Stack multiple <code>&lt;details&gt;</code> elements — they get
          automatic spacing between them.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details style="width:100%">
            <summary>Getting started</summary>
            <div>
              Import <code>@jazz/core</code> and start writing HTML.
            </div>
          </details>
          <details style="width:100%">
            <summary>Customization</summary>
            <div>
              Override CSS custom properties to match your brand.
            </div>
          </details>
          <details style="width:100%">
            <summary>Dark mode</summary>
            <div>
              Jazz responds to <code>prefers-color-scheme</code> automatically.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details>
  <summary>Getting started</summary>
  <div>...</div>
</details>
<details>
  <summary>Customization</summary>
  <div>...</div>
</details>
<details>
  <summary>Dark mode</summary>
  <div>...</div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="exclusive">Exclusive</h2>
        <p>
          Give a group the same <code>name</code> attribute — only one item can
          be open at a time.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details name="faq" style="width:100%">
            <summary>Getting started</summary>
            <div>Import <code>@jazz/core</code> and start writing HTML.</div>
          </details>
          <details name="faq" style="width:100%">
            <summary>Customization</summary>
            <div>Override CSS custom properties to match your brand.</div>
          </details>
          <details name="faq" style="width:100%">
            <summary>Dark mode</summary>
            <div>
              Jazz responds to <code>prefers-color-scheme</code> automatically.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details name="faq">
  <summary>Getting started</summary>
  <div>...</div>
</details>
<details name="faq">
  <summary>Customization</summary>
  <div>...</div>
</details>
<details name="faq">
  <summary>Dark mode</summary>
  <div>...</div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="open">Open by default</h2>
        <p>
          Add the <code>open</code> attribute to expand an item on load.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details open style="width:100%">
            <summary>This one is open</summary>
            <div>
              Use the <code>open</code> attribute to expand by default.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details open>
  <summary>This one is open</summary>
  <div>
    Use the open attribute to expand by default.
  </div>
</details>`),
          )}
        </div>
      </div>
    `,
  });
}

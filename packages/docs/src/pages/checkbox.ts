import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "with-label", label: "With label" },
  { id: "disabled", label: "Disabled" },
];

export async function CheckboxPage(path: string) {
  return Layout({
    title: "Checkbox",
    path,
    toc,
    content: html`
      <h1>Checkbox</h1>
      <p class="lead">
        A native <code>&lt;input type="checkbox"&gt;</code> for toggling
        options.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <input type="checkbox" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="checkbox" />`))}
        </div>
      </div>

      <h2 id="checked">Checked</h2>
      <div class="example">
        <div class="preview">
          <input type="checkbox" checked />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="checkbox" checked />`))}
        </div>
      </div>

      <h2 id="with-label">With label</h2>
      <p>Wrap in a <code>&lt;label&gt;</code> to make the text clickable.</p>
      <div class="example">
        <div class="preview" style="flex-direction:column;align-items:flex-start;gap:0.5rem">
          <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
            <input type="checkbox" checked />
            Accept terms and conditions
          </label>
          <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
            <input type="checkbox" />
            Subscribe to newsletter
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="checkbox" checked />
  Accept terms and conditions
</label>
<label>
  <input type="checkbox" />
  Subscribe to newsletter
</label>`),
          )}
        </div>
      </div>

      <h2 id="disabled">Disabled</h2>
      <div class="example">
        <div class="preview" style="gap:0.75rem">
          <input type="checkbox" disabled />
          <input type="checkbox" disabled checked />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<input type="checkbox" disabled />
<input type="checkbox" disabled checked />`),
          )}
        </div>
      </div>
    `,
  });
}

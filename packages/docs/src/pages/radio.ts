import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled" },
];

export async function RadioPage(path: string) {
  return Layout({
    title: "Radio",
    path,
    toc,
    content: html`
      <h1>Radio</h1>
      <p class="lead">
        A native <code>&lt;input type="radio"&gt;</code> for selecting one
        option from a group.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <div style="display:flex;flex-direction:column;gap:0.5rem">
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer">
              <input type="radio" name="density" value="default" />
              Default
            </label>
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer">
              <input type="radio" name="density" value="comfortable" checked />
              Comfortable
            </label>
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer">
              <input type="radio" name="density" value="compact" />
              Compact
            </label>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="radio" name="density" value="default" />
  Default
</label>
<label>
  <input type="radio" name="density" value="comfortable" checked />
  Comfortable
</label>
<label>
  <input type="radio" name="density" value="compact" />
  Compact
</label>`),
          )}
        </div>
      </div>

      <h2 id="disabled">Disabled</h2>
      <div class="example">
        <div class="preview">
          <div style="display:flex;flex-direction:column;gap:0.5rem">
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:not-allowed;opacity:0.4">
              <input type="radio" name="density-disabled" disabled />
              Default
            </label>
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:not-allowed;opacity:0.4">
              <input type="radio" name="density-disabled" disabled checked />
              Comfortable
            </label>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="radio" name="density" disabled />
  Default
</label>
<label>
  <input type="radio" name="density" disabled checked />
  Comfortable
</label>`),
          )}
        </div>
      </div>
    `,
  });
}

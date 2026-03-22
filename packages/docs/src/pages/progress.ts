import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "indeterminate", label: "Indeterminate" },
  { id: "labeled", label: "Labeled" },
];

export async function ProgressPage(path: string) {
  return Layout({
    title: "Progress",
    path,
    toc,
    content: html`
      <h1>Progress</h1>
      <p class="lead">
        Displays a completion state using the native
        <code>&lt;progress&gt;</code> element.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <progress value="40" max="100" style="width:100%"></progress>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<progress value="40" max="100"></progress>`))}
        </div>
      </div>

      <h2 id="indeterminate">Indeterminate</h2>
      <p>
        Omit the <code>value</code> attribute to show an indeterminate state.
      </p>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <progress style="width:100%"></progress>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<progress></progress>`))}
        </div>
      </div>

      <h2 id="labeled">Labeled</h2>
      <p>Wrap in a <code>&lt;label class="field"&gt;</code> to pair with a text label.</p>
      <div class="example">
        <div class="preview">
          <label class="field" style="width:100%">
            <span>Uploading…</span>
            <progress value="65" max="100"></progress>
            <small>65%</small>
          </label>
          <label class="field" style="width:100%">
            <span>Processing</span>
            <progress></progress>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Uploading…</span>
  <progress value="65" max="100"></progress>
  <small>65%</small>
</label>

<label class="field">
  <span>Processing</span>
  <progress></progress>
</label>`),
          )}
        </div>
      </div>
    `,
  });
}

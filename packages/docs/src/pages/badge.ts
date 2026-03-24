import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "secondary", label: "Secondary" },
  { id: "destructive", label: "Destructive" },
  { id: "outline", label: "Outline" },
  { id: "loading", label: "Loading" },
];

export async function BadgePage(path: string) {
  return Layout({
    title: "Badge",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Badge</h1>
        <p class="lead">
          Small status labels using <code>&lt;span class="badge"&gt;</code>.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="badge">Badge</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge">Badge</span>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="secondary">Secondary</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="badge secondary">Secondary</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge secondary">Secondary</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="destructive">Destructive</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="badge destructive">Destructive</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="badge destructive">Destructive</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="outline">Outline</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="badge outline">Outline</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge outline">Outline</span>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="loading">Loading</h2>
        <p>
          Add <code>aria-busy="true"</code> to inject a spinner. Works on any
          variant.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="badge" aria-busy="true">Syncing</span>
          <span class="badge secondary" aria-busy="true">Uploading</span>
          <span class="badge outline" aria-busy="true">Processing</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="badge" aria-busy="true">Syncing</span>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}

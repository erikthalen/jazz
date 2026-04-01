import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "colors", label: "Colors" },
  { id: "outline", label: "Outline" },
  { id: "with-icon", label: "With icon" },
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
        <div class="preview" style="gap:0.5rem">
          <span class="badge">Badge</span>
          <span class="badge secondary">Secondary</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge">Badge</span>\n
<span class="badge secondary">Secondary</span>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="colors">Colors</h2>
        <p>
          One modifier class per Jazz color seed: <code>primary</code>,
          <code>constructive</code>, <code>destructive</code>, and
          <code>color1</code> through <code>color6</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem;flex-wrap:wrap;flex-direction:column;">
          <span class="badge primary">Primary</span>
          <span class="badge constructive">Constructive</span>
          <span class="badge destructive">Destructive</span>
          <span class="badge color1">Color 1</span>
          <span class="badge color2">Color 2</span>
          <span class="badge color3">Color 3</span>
          <span class="badge color4">Color 4</span>
          <span class="badge color5">Color 5</span>
          <span class="badge color6">Color 6</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge primary">Primary</span>
<span class="badge constructive">Constructive</span>
<span class="badge destructive">Destructive</span>
<span class="badge color1">Color 1</span>`),
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
        <h2 id="with-icon">With icon</h2>
        <p>Drop an <code>&lt;svg&gt;</code> inside — it sizes automatically.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="badge constructive">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            Verified
          </span>
          <span class="badge destructive">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            Failed
          </span>
          <span class="badge outline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            Info
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge constructive">
  <svg><!-- icon --></svg>
  Verified
</span>`),
          )}
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

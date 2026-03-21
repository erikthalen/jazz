import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "secondary", label: "Secondary" },
  { id: "destructive", label: "Destructive" },
  { id: "outline", label: "Outline" },
];

export async function BadgePage(path: string) {
  return Layout({
    title: "Badge",
    path,
    toc,
    content: html`
      <h1>Badge</h1>
      <p class="lead">
        Small status labels using <code>&lt;span class="badge"&gt;</code>.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <span class="badge">Badge</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge">Badge</span>`))}
        </div>
      </div>

      <h2 id="secondary">Secondary</h2>
      <div class="example">
        <div class="preview">
          <span class="badge secondary">Secondary</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge secondary">Secondary</span>`))}
        </div>
      </div>

      <h2 id="destructive">Destructive</h2>
      <div class="example">
        <div class="preview">
          <span class="badge destructive">Destructive</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge destructive">Destructive</span>`))}
        </div>
      </div>

      <h2 id="outline">Outline</h2>
      <div class="example">
        <div class="preview">
          <span class="badge outline">Outline</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge outline">Outline</span>`))}
        </div>
      </div>
    `,
  });
}

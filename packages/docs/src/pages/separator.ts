import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

export async function SeparatorPage(path: string) {
  return Layout({
    title: "Separator",
    path,
    toc: [],
    content: html`
      <h1>Separator</h1>
      <p class="lead">
        A horizontal divider using the native <code>&lt;hr&gt;</code> element.
      </p>

      <div class="example">
        <div class="preview preview-padded" style="flex-direction:column;gap:1rem;width:100%">
          <p>Above the separator</p>
          <hr style="width:100%" />
          <p>Below the separator</p>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<p>Above the separator</p>
<hr />
<p>Below the separator</p>`))}
        </div>
      </div>
    `,
  });
}

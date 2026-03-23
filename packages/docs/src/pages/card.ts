import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-header-footer", label: "With header & footer" },
];

export async function CardPage(path: string) {
  return Layout({
    title: "Card",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Card</h1>
        <p class="lead">
          A surface for grouping related content using the native
          <code>&lt;article&gt;</code> element.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%">
            <p>This is a simple card with some content inside.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <p>This is a simple card with some content inside.</p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-header-footer">With header &amp; footer</h2>
        <p>
          Add a <code>&lt;header&gt;</code> and/or <code>&lt;footer&gt;</code> for
          a structured layout with dividers.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%">
            <header>Header</header>
            <div>Body</div>
            <footer>Footer</footer>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <header>Header</header>
  Body
  <footer>Footer</footer>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}

import { html } from "hono/html";
import { Layout, blocks } from "../layout";

export async function BlocksPage(path: string) {
  return Layout({
    title: "Blocks",
    path,
    content: html`
      <div class="prose">
        <h1>Blocks</h1>
        <p class="lead">
          Larger compositions built entirely from Jazz components, showing how
          they combine into real UI patterns.
        </p>
      </div>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--spacing-4);margin-top:var(--spacing-6)"
      >
        ${blocks.map(
          (b) => html`
            <a href="${b.path}" style="text-decoration:none">
              <article style="height:100%;cursor:pointer">
                <strong>${b.label}</strong>
              </article>
            </a>
          `,
        )}
      </div>
    `,
  });
}

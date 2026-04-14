import { html } from "hono/html";
import { Layout, examples } from "../layout";

export function HomePage() {
  return Layout({
    title: "Home",
    path: "/",
    content: html`
      <div class="prose" style="max-width:600px;margin-bottom:3rem">
        <h1>Jazz Examples</h1>
        <p>
          Real-world usage patterns showing how Jazz works alongside other tools
          and frameworks.
        </p>
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;background:var(--jazz-neutral-200);border:1px solid var(--jazz-neutral-200);border-radius:8px;overflow:hidden"
      >
        ${examples.map(
          (e) => html`
            <a
              href="${e.path}"
              style="display:block;padding:1.5rem;background:var(--jazz-background-color);text-decoration:none;color:inherit"
            >
              <strong style="display:block;margin-bottom:0.375rem"
                >${e.label}</strong
              >
              <span style="font-size:0.875rem;color:var(--jazz-neutral-600)"
                >${e.description}</span
              >
            </a>
          `,
        )}
      </div>
    `,
  });
}

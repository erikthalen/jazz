import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import coreCss from "../../core/dist/main.css?raw";
import docsCss from "./docs.css?raw";

type TocItem = { id: string; label: string };

type LayoutProps = {
  title: string;
  path: string;
  toc?: TocItem[];
  content: HtmlEscapedString | Promise<HtmlEscapedString>;
};

const components = [
  { label: "Accordion", path: "/components/accordion" },
  { label: "Color Input", path: "/components/color-input" },
  { label: "Button", path: "/components/button" },
  { label: "Button Group", path: "/components/button-group" },
  { label: "Card", path: "/components/card" },
  { label: "Checkbox", path: "/components/checkbox" },
  { label: "Dialog", path: "/components/dialog" },
  { label: "Form", path: "/components/form" },
  { label: "Kbd", path: "/components/kbd" },
  { label: "Separator", path: "/components/separator" },
  { label: "Slider", path: "/components/slider" },
  { label: "Switch", path: "/components/switch" },
  { label: "Table", path: "/components/table" },
  { label: "Popover", path: "/components/popover" },
  { label: "Progress", path: "/components/progress" },
  { label: "Radio", path: "/components/radio" },
  { label: "Tooltip", path: "/components/tooltip" },
  { label: "Loading", path: "/components/loading" },
];

function head(title: string) {
  return html`
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Jazz</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>😎</text></svg>" />
    <style>${raw(coreCss + "\n" + docsCss)}</style>
    ${import.meta.env.DEV ? raw('<script type="module" src="/@vite/client"></script>') : ""}
    <script>
      const stored = localStorage.getItem('jazz-theme');
      const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'jazz-dark' : 'jazz-light';
      document.documentElement.className = stored || preferred;
    </script>
    <script defer>
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.code-block').forEach(block => {
          const btn = document.createElement('button')
          btn.className = 'code-copy-btn ghost square'
          btn.setAttribute('aria-label', 'Copy code')
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
          btn.onclick = async () => {
            const code = block.querySelector('code')?.innerText ?? ''
            await navigator.clipboard.writeText(code)
            btn.setAttribute('data-copied', '')
            setTimeout(() => btn.removeAttribute('data-copied'), 1500)
          }
          block.appendChild(btn)
        })
      })
    </script>
  `;
}

function header(path: string) {
  return html`
    <header class="docs-header">
      <a href="/" class="docs-logo">Jazz</a>
      <nav>
        <a href="/introduction" class="button ghost" ${path.startsWith("/introduction") || (path !== "/" && !path.startsWith("/components") && !path.startsWith("/themes")) ? "" : ""}>Docs</a>
        <a href="/components/button" class="button ghost">Components</a>
      </nav>
      <button class="theme-toggle ghost square" aria-label="Toggle theme" onclick="
        const next = document.documentElement.className === 'jazz-light' ? 'jazz-dark' : 'jazz-light';
        document.documentElement.className = next;
        localStorage.setItem('jazz-theme', next);
        this.querySelector('.theme-icon-light').hidden = next === 'jazz-light';
        this.querySelector('.theme-icon-dark').hidden = next === 'jazz-dark';
      ">
        <svg class="theme-icon-light" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        <svg class="theme-icon-dark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      </button>
    </header>
  `;
}

export function HomeLayout({ title, path, content }: Omit<LayoutProps, "toc">) {
  return html`<!doctype html>
    <html lang="en">
      <head>${head(title)}</head>
      <body>
        ${header(path)}
        <main class="home-content">${content}</main>
      </body>
    </html>`;
}

export function Layout({ title, path, toc, content }: LayoutProps) {
  return html`<!doctype html>
    <html lang="en">
      <head>${head(title)}</head>
      <body>
        ${header(path)}
        <div class="docs-layout">
          <aside class="docs-sidebar">
            <div class="sidebar-section">
              <p class="sidebar-label">Sections</p>
              <nav>
                <a href="/introduction" ${path === "/introduction" ? 'aria-current="page"' : ""}>
                  Introduction
                </a>
                <a href="/themes" ${path === "/themes" ? 'aria-current="page"' : ""}>
                  Themes
                </a>
                <a href="/components/prose" ${path === "/components/prose" ? 'aria-current="page"' : ""}>
                  Prose
                </a>
              </nav>
            </div>
            <div class="sidebar-section">
              <p class="sidebar-label">Components</p>
              <nav>
                ${components.map(
                  (c) => html`
                    <a
                      href="${c.path}"
                      ${path === c.path ? 'aria-current="page"' : ""}
                      >${c.label}</a
                    >
                  `,
                )}
              </nav>
            </div>
          </aside>

          <main class="docs-content"><div class="prose">${content}</div></main>

          ${toc && toc.length > 0
            ? html`
                <aside class="docs-toc">
                  <p class="sidebar-label">On This Page</p>
                  <nav>
                    ${toc.map(
                      (item) => html`<a href="#${item.id}">${item.label}</a>`,
                    )}
                  </nav>
                </aside>
              `
            : ""}
        </div>
      </body>
    </html>`;
}

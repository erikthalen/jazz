import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import docsCss from "./docs.css?raw";

const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");
export const url = (path: string) => b + path;

type TocItem = { id: string; label: string };

type LayoutProps = {
  title: string;
  path: string;
  toc?: TocItem[];
  content: HtmlEscapedString | Promise<HtmlEscapedString>;
};

export const blocks: { label: string; path: string; description: string }[] = [
  {
    label: "Richtext Editor",
    path: "/blocks/richtext-editor",
    description:
      "A full-featured text editor with formatting toolbar and keyboard shortcuts.",
  },
  {
    label: "Signup Form",
    path: "/blocks/signup-form",
    description:
      "A clean authentication form with email, password, and validation states.",
  },
  {
    label: "Sidebar",
    path: "/blocks/sidebar",
    description:
      "An app navigation sidebar with grouped links, expandable sections, and a user menu.",
  },
];

export const components: { label: string; path: string; badge?: string }[] = [
  { label: "Accordion", path: "/components/accordion" },
  { label: "Badge", path: "/components/badge" },
  { label: "Button", path: "/components/button" },
  { label: "Button Group", path: "/components/button-group" },
  { label: "Card", path: "/components/card" },
  { label: "Checkbox", path: "/components/checkbox" },
  { label: "Code", path: "/components/code" },
  { label: "Color Input", path: "/components/color-input" },
  { label: "Combobox", path: "/components/combobox", badge: "WIP" },
  { label: "Datalist", path: "/components/datalist" },
  { label: "Date Input", path: "/components/date-input" },
  { label: "Dialog", path: "/components/dialog" },
  { label: "Dropdown", path: "/components/dropdown" },
  { label: "Empty State", path: "/components/empty" },
  { label: "Expander", path: "/components/expander" },
  { label: "Field", path: "/components/field" },
  { label: "File Drop", path: "/components/file-drop" },
  { label: "Kbd", path: "/components/kbd" },
  { label: "Loading", path: "/components/loading" },
  { label: "Popover", path: "/components/popover" },
  { label: "Progress", path: "/components/progress" },
  { label: "Radio", path: "/components/radio" },
  { label: "Radio Group", path: "/components/radio-group" },
  { label: "Select", path: "/components/select" },
  { label: "Submenu", path: "/components/submenu" },
  { label: "Separator", path: "/components/separator" },
  { label: "Slider", path: "/components/slider" },
  { label: "Switch", path: "/components/switch" },
  { label: "Table", path: "/components/table" },
  { label: "Text Field", path: "/components/text-field" },
  { label: "Textarea", path: "/components/textarea" },
  { label: "Toast", path: "/components/toast", badge: "WIP" },
  { label: "Toggle", path: "/components/toggle" },
  { label: "Toggle Group", path: "/components/toggle-group" },
  { label: "Tooltip", path: "/components/tooltip" },
];

function head(title: string) {
  return html`
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Jazz</title>
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>😎</text></svg>"
    />
    <link rel="stylesheet" href="${url("/jazz.css")}" />
    <style>
      ${raw(docsCss)}
    </style>
    ${import.meta.env.DEV
      ? raw('<script type="module" src="/@vite/client"></script>')
      : ""}
    <script>
      function applyColorScheme(scheme) {
        let s = document.getElementById("jazz-theme-style");
        if (!s) {
          s = document.createElement("style");
          s.id = "jazz-theme-style";
          document.head.appendChild(s);
        }
        s.textContent = ":root { color-scheme: " + scheme + "; }";
        document.documentElement.dataset.theme = scheme;
      }
      const stored = localStorage.getItem("jazz-theme");
      const preferred = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      applyColorScheme(stored || preferred);
      document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("theme-toggle-input");
        if (toggle) toggle.checked = (stored || preferred) === "dark";
      });
      localStorage.removeItem("jazz-primary-dark");
      const storedColor = localStorage.getItem("jazz-primary");
      if (storedColor) {
        document.documentElement.style.setProperty("--jazz-primary", storedColor);
      }
    </script>
    <script defer>
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".code-block").forEach((block) => {
          const btn = document.createElement("button");
          btn.className = "code-copy-btn ghost square";
          btn.setAttribute("aria-label", "Copy code");
          btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
          btn.onclick = async () => {
            const code = block.querySelector("code")?.innerText ?? "";
            await navigator.clipboard.writeText(code);
            btn.setAttribute("data-copied", "");
            setTimeout(() => btn.removeAttribute("data-copied"), 1500);
          };
          block.appendChild(btn);
        });
      });
    </script>
  `;
}

function header(path: string) {
  return html`
    <header class="docs-header">
      <label class="toggle square docs-burger" aria-label="Toggle navigation">
        <input type="checkbox" id="sidebar-toggle" class="sidebar-toggle" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </label>
      <a href="${url("/")}" class="docs-logo"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M9 17v-13h10v13" />
          <path d="M9 8h10" />
        </svg>
        Jazz</a
      >
      <nav>
        <a href="${url("/introduction")}" class="button ghost">Docs</a>
        <a href="${url("/components/button")}" class="button ghost"
          >Components</a
        >
        <a href="${url("/blocks")}" class="button ghost">Blocks</a>
      </nav>
      <label class="toggle ghost square theme-toggle" aria-label="Toggle theme">
        <input
          type="checkbox"
          id="theme-toggle-input"
          onchange="
          const next = this.checked ? 'dark' : 'light';
          applyColorScheme(next);
          localStorage.setItem('jazz-theme', next);
        "
        />
        <svg
          data-unchecked
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </label>
      <button
        class="ghost square"
        popovertarget="color-picker"
        aria-label="Change primary color"
        style="anchor-name:--color-picker"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
          />
        </svg>
      </button>
      <menu id="color-picker" popover class="color-picker-popover">
        ${(
          [
            "dodgerblue",
            "#7c3aed",
            "#db2777",
            "#dc2626",
            "#ea580c",
            "#16a34a",
            "#0891b2",
          ] as const
        ).map(
          (color) => html`
            <li>
              <button
                class="color-swatch-btn"
                style="background:${color}"
                aria-label="${color}"
                onclick="
                const val = 'light-dark(${color}, color-mix(in oklab, ${color}, white 20%))';
                document.documentElement.style.setProperty('--jazz-primary', val);
                localStorage.setItem('jazz-primary', val);
                document.getElementById('color-picker').hidePopover();
              "
              ></button>
            </li>
          `,
        )}
        <li>
          <button
            class="color-swatch-btn"
            style="background:linear-gradient(135deg, #111 50%, #fff 50%);outline:1px solid var(--jazz-neutral-200);outline-offset:-1px"
            aria-label="Black / White"
            onclick="
              const val = 'light-dark(#111111, #ffffff)';
              document.documentElement.style.setProperty('--jazz-primary', val);
              localStorage.setItem('jazz-primary', val);
              document.getElementById('color-picker').hidePopover();
            "
          ></button>
        </li>
      </menu>
      <a
        href="https://github.com/erikthalen/jazz"
        target="_blank"
        rel="noopener"
        class="button ghost square"
        aria-label="GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </a>
    </header>
  `;
}

export function HomeLayout({ title, path, content }: Omit<LayoutProps, "toc">) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        ${head(title)}
      </head>
      <body>
        ${header(path)}
        <main class="home-content">${content}</main>
      </body>
    </html>`;
}

export function Layout({ title, path, toc, content }: LayoutProps) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        ${head(title)}
      </head>
      <body>
        ${header(path)}
        <label
          for="sidebar-toggle"
          class="sidebar-backdrop"
          aria-hidden="true"
        ></label>
        <div class="docs-layout">
          <aside class="docs-sidebar">
            <div class="sidebar-section">
              <p class="sidebar-label">Sections</p>
              <nav>
                <a
                  href="${url("/introduction")}"
                  ${path === "/introduction" ? 'aria-current="page"' : ""}
                >
                  Introduction
                </a>

                <a
                  href="${url("/customization")}"
                  ${path === "/customization" ? 'aria-current="page"' : ""}
                >
                  Customization
                </a>
                <a
                  href="${url("/themes")}"
                  ${path === "/themes" ? 'aria-current="page"' : ""}
                >
                  Themes
                </a>
                <a
                  href="${url("/icons")}"
                  ${path === "/icons" ? 'aria-current="page"' : ""}
                >
                  Icons
                </a>
                <a
                  href="${url("/components/prose")}"
                  ${path === "/components/prose" ? 'aria-current="page"' : ""}
                >
                  Prose
                </a>
                <a
                  href="${url("/easings")}"
                  ${path === "/easings" ? 'aria-current="page"' : ""}
                >
                  Easings
                </a>
                <a
                  href="${url("/typography")}"
                  ${path === "/typography" ? 'aria-current="page"' : ""}
                >
                  Typography
                </a>

                <a
                  href="${url("/skills")}"
                  ${path === "/skills" ? 'aria-current="page"' : ""}
                >
                  Skills <span class="badge">WIP</span>
                </a>
                <a href="${url("/llms.txt")}" target="_blank" rel="noopener">
                  llms.txt
                </a>
              </nav>
            </div>
            <div class="sidebar-section">
              <p class="sidebar-label">Components</p>
              <nav>
                ${components.map(
                  (c) => html`
                    <a
                      href="${url(c.path)}"
                      ${path === c.path ? 'aria-current="page"' : ""}
                      >${c.label}${c.badge
                        ? html` <span class="badge">${c.badge}</span>`
                        : ""}</a
                    >
                  `,
                )}
              </nav>
            </div>
            <div class="sidebar-section">
              <p class="sidebar-label">Blocks</p>
              <nav>
                ${blocks.map(
                  (b) => html`
                    <a
                      href="${url(b.path)}"
                      ${path === b.path ? 'aria-current="page"' : ""}
                      >${b.label}</a
                    >
                  `,
                )}
              </nav>
            </div>
          </aside>

          <main class="docs-content">${content}</main>

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

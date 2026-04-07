import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import docsCss from "./docs.css?raw";
import { IconsSearchDialog } from "./pages/icons-dialog";

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
  {
    label: "Complex Menu",
    path: "/blocks/complex-menu",
    description:
      "A multi-section dropdown with keyboard shortcuts, checkable items, and nested submenus.",
  },
  {
    label: "Admin Dashboard",
    path: "/blocks/admin-dashboard",
    description:
      "A task management dashboard with sidebar navigation, filterable data table, and row actions.",
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
  { label: "Menu", path: "/components/menu" },
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
        if (scheme === "system") {
          if (s) s.remove();
          localStorage.removeItem("jazz-theme");
        } else {
          if (!s) {
            s = document.createElement("style");
            s.id = "jazz-theme-style";
            document.head.appendChild(s);
          }
          s.textContent = ":root { color-scheme: " + scheme + "; }";
          localStorage.setItem("jazz-theme", scheme);
        }
        document.documentElement.dataset.theme = scheme;
        document.querySelectorAll('input[name="theme"]').forEach(function (r) {
          r.checked = r.value === scheme;
        });
      }
      applyColorScheme(localStorage.getItem("jazz-theme") || "system");
      document.addEventListener("DOMContentLoaded", function () {
        applyColorScheme(localStorage.getItem("jazz-theme") || "system");
      });
      localStorage.removeItem("jazz-primary-dark");
      const storedColor = localStorage.getItem("jazz-primary");
      if (storedColor) {
        document.documentElement.style.setProperty(
          "--jazz-primary",
          storedColor,
        );
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

      <a href="${url("/")}" class="docs-logo">
        <svg height="24" viewBox="0 0 1247 443" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.000207007 315.392C20.4798 319.829 38.3998 322.048 53.7598 322.048H59.3918C67.2425 321.365 72.5331 318.293 75.2638 312.832C78.3358 307.37 79.8718 299.861 79.8718 290.304V15.3596L167.424 7.6796L218.624 33.2796V331.776C218.624 399.701 189.781 436.224 132.096 441.344C121.514 442.368 111.445 442.88 101.888 442.88C93.3545 442.88 85.3331 442.538 77.8238 441.856C70.3145 441.173 63.6585 440.32 57.8558 439.296L6.14379 413.696L-0.000207007 315.392ZM84.9918 19.9676V290.304C84.9918 301.568 83.1145 310.442 79.3598 316.928C75.6051 323.072 69.1198 326.485 59.9038 327.168H53.7598C46.9331 327.168 38.9118 326.656 29.6958 325.632C20.4798 324.608 12.4585 323.413 5.63179 322.048L11.2638 409.088C16.0425 409.77 21.6745 410.453 28.1598 411.136C34.6451 411.818 41.9838 412.16 50.1758 412.16C59.7331 412.16 69.8025 411.648 80.3838 410.624C134.997 406.186 162.304 371.37 162.304 306.176V13.3116L84.9918 19.9676ZM463.456 399.872L444.512 338.944L404.064 342.528L378.976 432.128L291.936 439.808L240.736 414.208L352.864 14.3356L437.344 7.1676L488.544 32.7676L602.72 418.304L514.656 425.472L463.456 399.872ZM356.96 19.4556L248.416 408.064L323.168 401.92L348.768 312.32L439.904 304.128L467.04 394.752L544.352 388.096L433.248 12.7996L356.96 19.4556ZM366.688 237.568C373.173 216.405 378.464 196.266 382.56 177.152C386.997 158.037 390.752 138.922 393.824 119.808H395.872C398.602 138.581 402.016 157.013 406.112 175.104C410.549 192.853 415.84 211.968 421.984 232.448L366.688 237.568ZM611.372 411.136V334.848L729.644 125.952L673.836 130.56L622.636 104.96V20.9916L857.644 -0.000396729L907.82 25.5996V96.2556L788.012 309.76L861.228 303.616L912.428 329.216V415.232L662.572 436.736L611.372 411.136ZM709.676 322.048L852.012 69.6316V5.63159L627.756 25.5996V99.3276L756.78 88.0636L616.492 336.384V406.016L856.108 385.024V309.248L709.676 322.048ZM945.372 411.136V334.848L1063.64 125.952L1007.84 130.56L956.636 104.96V20.9916L1191.64 -0.000396729L1241.82 25.5996V96.2556L1122.01 309.76L1195.23 303.616L1246.43 329.216V415.232L996.572 436.736L945.372 411.136ZM1043.68 322.048L1186.01 69.6316V5.63159L961.756 25.5996V99.3276L1090.78 88.0636L950.492 336.384V406.016L1190.11 385.024V309.248L1043.68 322.048Z" />
        </svg>
      </a>

      <nav>
        <a href="${url("/introduction")}" class="button ghost">Docs</a>
        <a href="${url("/components/button")}" class="button ghost">
          Components
        </a>
        <a href="${url("/blocks")}" class="button ghost">Blocks</a>
        <button
          class="ghost"
          onclick="document.getElementById('icons-dialog').showModal()"
        >
          Icons
        </button>
      </nav>
      <button
        class="ghost square theme-toggle"
        popovertarget="theme-menu"
        aria-label="Toggle theme"
        style="anchor-name:--theme-menu"
        data-tooltip="Theme"
        data-placement="bottom"
      >
        <svg
          data-scheme="light"
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
          data-scheme="dark"
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
        <svg
          data-scheme="system"
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
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </button>
      <div
        id="theme-menu"
        popover
        class="theme-menu-popover"
        data-placement="bottom right"
      >
        <menu>
          <li>
            <label>
              <input
                type="radio"
                name="theme"
                value="light"
                onchange="applyColorScheme(this.value);document.getElementById('theme-menu').hidePopover()"
              />
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
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                />
              </svg>
              Light
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme"
                value="dark"
                onchange="applyColorScheme(this.value);document.getElementById('theme-menu').hidePopover()"
              />
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
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              Dark
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme"
                value="system"
                onchange="applyColorScheme(this.value);document.getElementById('theme-menu').hidePopover()"
              />
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
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              System
            </label>
          </li>
        </menu>
      </div>
      <div data-tooltip="Color scheme" data-placement="bottom">
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
      </div>
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
        data-tooltip="Github"
        data-placement="bottom"
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
    <html lang="en" data-theme="system">
      <head>
        ${head(title)}
      </head>
      <body>
        ${header(path)}
        <main class="home-content">${content}</main>
        ${raw(IconsSearchDialog())}
      </body>
    </html>`;
}

export function Layout({ title, path, toc, content }: LayoutProps) {
  return html`<!doctype html>
    <html lang="en" data-theme="system">
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
            <menu>
              <li><small>Sections</small></li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/introduction")}"
                    ${path === "/introduction" ? 'aria-current="page"' : ""}
                    >Introduction</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/customization")}"
                    ${path === "/customization" ? 'aria-current="page"' : ""}
                    >Customization</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/themes")}"
                    ${path === "/themes" ? 'aria-current="page"' : ""}
                    >Themes</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/icons")}"
                    ${path === "/icons" ? 'aria-current="page"' : ""}
                    >Icons</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/components/prose")}"
                    ${path === "/components/prose" ? 'aria-current="page"' : ""}
                    >Prose</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/easings")}"
                    ${path === "/easings" ? 'aria-current="page"' : ""}
                    >Easings</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/typography")}"
                    ${path === "/typography" ? 'aria-current="page"' : ""}
                    >Typography</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/skills")}"
                    ${path === "/skills" ? 'aria-current="page"' : ""}
                    >Skills</a
                  ></small
                >
              </li>
              <li>
                <small
                  ><a
                    class="button ghost"
                    href="${url("/llms.txt")}"
                    target="_blank"
                    rel="noopener"
                    >llms.txt</a
                  ></small
                >
              </li>
              <li><small>Components</small></li>
              ${components.map(
                (c) =>
                  html`<li>
                    <small
                      ><a
                        class="button ghost"
                        href="${url(c.path)}"
                        ${path === c.path ? 'aria-current="page"' : ""}
                        >${c.label}${c.badge
                          ? html` <span class="badge">${c.badge}</span>`
                          : ""}</a
                      ></small
                    >
                  </li>`,
              )}
              <li><small>Blocks</small></li>
              ${blocks.map(
                (b) =>
                  html`<li>
                    <small
                      ><a
                        class="button ghost"
                        href="${url(b.path)}"
                        ${path === b.path ? 'aria-current="page"' : ""}
                        >${b.label}</a
                      ></small
                    >
                  </li>`,
              )}
            </menu>
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
        ${raw(IconsSearchDialog())}
      </body>
    </html>`;
}

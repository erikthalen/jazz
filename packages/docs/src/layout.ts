import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import docsCss from "./docs.css?raw";
import { IconsSearchDialog } from "./pages/icons-dialog";
import { SearchDialog } from "./pages/search-dialog";
import { icon } from "./icon";
import { SchemePicker } from "./components/scheme-picker";
import { ThemePicker } from "./components/theme-picker";
import { SidebarNav } from "./components/sidebar-nav";
import { TableOfContents } from "./components/table-of-contents";

const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");
export const url = (path: string) => b + path;

type TocItem = { id: string; label: string };

type LayoutProps = {
  title: string;
  path: string;
  toc?: TocItem[];
  wide?: boolean;
  content: HtmlEscapedString | Promise<HtmlEscapedString>;
};

const slug = (p: string) => "/" + p.split("/").pop();

export const sections: { label: string; path: string }[] = [
  { label: "Introduction", path: "/getting-started/introduction" },
  { label: "Customization", path: "/getting-started/customization" },
  { label: "Themes", path: "/getting-started/themes" },
  { label: "Icons", path: "/getting-started/icons" },
  { label: "Easings", path: "/getting-started/easings" },
  { label: "Skills", path: "/getting-started/skills" },
];

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

export const components: {
  label: string;
  path: string;
  badge?: string;
  badgeClass?: string;
}[] = [
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
  { label: "Focus Group", path: "/components/focus-group" },
  { label: "Kbd", path: "/components/kbd" },
  { label: "Loading", path: "/components/loading" },
  { label: "Menu", path: "/components/menu" },
  { label: "Popover", path: "/components/popover" },
  { label: "Progress", path: "/components/progress" },
  { label: "Prose", path: "/components/prose" },
  { label: "Radio", path: "/components/radio" },
  { label: "Radio Group", path: "/components/radio-group" },
  { label: "Select", path: "/components/select" },
  { label: "Submenu", path: "/components/submenu" },
  { label: "Separator", path: "/components/separator" },
  { label: "Slider", path: "/components/slider" },
  { label: "Switch", path: "/components/switch" },
  { label: "Table", path: "/components/table" },
  {
    label: "Tabs",
    path: "/components/tabs",
    badge: "0.0.2",
    badgeClass: "constructive",
  },
  { label: "Text Field", path: "/components/text-field" },
  { label: "Textarea", path: "/components/textarea" },
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
      href="data:image/svg+xml,<svg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='512' height='512' rx='80' fill='%23FFFFFF'/><path d='M260.215 378.287C257.518 378.287 256.169 376.932 256.169 374.22L256.169 332.09C256.169 330.029 256.709 328.403 257.787 327.21L281.74 303.135C283.034 301.942 283.682 300.207 283.682 297.93L283.682 138.354C283.682 135.643 285.031 134.287 287.728 134.287L347.123 134.287C349.82 134.287 351.169 135.643 351.169 138.354L351.169 336.97C351.169 337.946 351.061 338.868 350.845 339.735C350.63 340.494 350.09 341.308 349.227 342.175L315.726 375.847C314.108 377.474 312.489 378.287 310.871 378.287L260.215 378.287Z' fill='black'/><path d='M252.08 134.287C254.806 134.287 256.169 135.643 256.169 138.354L256.169 180.485C256.169 182.545 255.624 184.172 254.534 185.364L230.329 209.439C229.021 210.632 228.367 212.367 228.367 214.645L228.367 374.22C228.367 376.932 227.004 378.287 224.278 378.287L164.258 378.287C161.532 378.287 160.169 376.932 160.169 374.22L160.169 175.605C160.169 174.629 160.278 173.707 160.496 172.839C160.714 172.08 161.259 171.267 162.132 170.399L195.985 136.727C197.621 135.1 199.256 134.287 200.891 134.287L252.08 134.287Z' fill='black'/></svg>"
    />
    <link rel="stylesheet" href="${url("/jazz.css")}" />
    <style>
      ${raw(docsCss)}
    </style>
    ${import.meta.env.DEV
      ? raw('<script type="module" src="/@vite/client"></script>')
      : ""}
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var sidebar = document.querySelector(".docs-sidebar");
        if (!sidebar) return;
        var saved = sessionStorage.getItem("sidebar-scroll");
        if (saved) sidebar.scrollTop = parseInt(saved, 10);
        window.addEventListener("pagehide", function () {
          sessionStorage.setItem("sidebar-scroll", sidebar.scrollTop);
        });
      });
    </script>
    <script defer>
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".code-block").forEach((block) => {
          const btn = document.createElement("button");
          btn.className = "code-copy-btn ghost square";
          btn.setAttribute("aria-label", "Copy code");
          btn.setAttribute("data-tooltip", "left");
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

async function fetchStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/erikthalen/jazz");
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

async function header(path: string) {
  const stars = await fetchStars();

  return html`
    <header class="docs-header">
      <a href="${url("/")}" class="docs-logo" aria-label="Jazz homepage">
        <svg
          height="24"
          viewBox="0 0 401 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M208.831 511.996C203.142 511.996 200.298 509.152 200.298 503.463L200.298 415.058C200.298 410.735 201.436 407.322 203.711 404.819L254.228 354.302C256.959 351.798 258.324 348.158 258.324 343.379L258.324 8.53331C258.324 2.84446 261.169 4.03482e-05 266.857 4.08455e-05L392.126 5.17969e-05C397.815 5.22942e-05 400.659 2.84447 400.659 8.53332L400.659 425.298C400.659 427.346 400.432 429.281 399.976 431.101C399.521 432.694 398.384 434.401 396.563 436.221L325.908 506.877C322.494 510.29 319.081 511.996 315.668 511.996L208.831 511.996Z"
            fill="var(--jazz-neutral-1000)"
          />
          <path
            d="M191.828 0.00359467C197.517 0.00359516 200.361 2.84805 200.361 8.5369L200.361 96.9416C200.361 101.265 199.224 104.678 196.948 107.182L146.431 157.698C143.7 160.202 142.335 163.842 142.335 168.621L142.335 503.467C142.335 509.156 139.491 512 133.802 512L8.53331 512C2.84447 512 4.87818e-05 509.156 4.92792e-05 503.467L8.57139e-05 86.7017C8.5893e-05 84.6537 0.227637 82.7195 0.682739 80.899C1.13784 79.3062 2.27561 77.5995 4.09605 75.779L74.7516 5.12354C78.1649 1.71023 81.5782 0.00358503 84.9915 0.00358533L191.828 0.00359467Z"
            fill="var(--jazz-neutral-1000)"
          />
        </svg>
      </a>

      <nav>
        <label
          class="toggle square docs-burger"
          aria-label="Toggle navigation"
          data-tooltip="right"
        >
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

        <a
          href="${url("/getting-started/introduction")}"
          class="button ghost"
          ${sections.some((s) => slug(s.path) === slug(path))
            ? html`aria-current="page"`
            : ""}
        >
          ${raw(icon("book"))} Getting started
        </a>
        <a
          href="${url("/components/button")}"
          class="button ghost"
          ${path.startsWith("/components/") ? html`aria-current="page"` : ""}
        >
          ${raw(icon("components"))} Components
        </a>
        <a
          href="${url("/blocks")}"
          class="button ghost"
          ${path === "/blocks" || path.startsWith("/blocks/")
            ? 'aria-current="page"'
            : ""}
        >
          ${raw(icon("layout"))} Blocks
        </a>
        <button
          class="ghost"
          onclick="document.getElementById('icons-dialog').showModal()"
        >
          ${raw(icon("icons"))} Icons
        </button>
      </nav>

      <div style="display: flex; gap: 1rem; margin-left: auto;">
        <button
          class="search-field outlined"
          style="min-width: 150px"
          onclick="document.getElementById('search-dialog').showModal()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          Search

          <kbd>⌘F</kbd>
        </button>

        ${SchemePicker()} ${ThemePicker()}

        <a
          id="github-link"
          href="https://github.com/erikthalen/jazz"
          target="_blank"
          rel="noopener"
          class="button secondary ${stars === null ? "square" : ""}"
          aria-label="GitHub"
          data-tooltip="bottom"
        >
          ${raw(icon("brand-github"))}
          <small id="github-stars" ${stars === null ? " hidden" : ""}>
            ${stars ?? ""}
          </small>
        </a>
      </div>

      <!-- <script>
        fetch("https://api.github.com/repos/erikthalen/jazz")
          .then(r => r.json())
          .then(({ stargazers_count: n }) => {
            if (!n) return;
            const link = document.getElementById("github-link");
            const small = document.getElementById("github-stars");
            small.textContent = n;
            small.removeAttribute("hidden");
            link.classList.remove("square");
          })
          .catch(() => {});
      </script> -->
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
        ${raw(IconsSearchDialog())} ${raw(SearchDialog())}
      </body>
    </html>`;
}

export function Layout({ title, path, toc, wide, content }: LayoutProps) {
  return html`<!doctype html>
    <html lang="en" data-theme="system">
      <head>
        ${head(title)}
      </head>

      <body>
        ${header(path)}

        <div class="docs-layout${wide ? " docs-layout-wide" : ""}">
          <aside class="docs-sidebar">${SidebarNav(path)}</aside>

          <main class="docs-content">${content}</main>

          ${TableOfContents(toc)}
        </div>
        ${raw(IconsSearchDialog())} ${raw(SearchDialog())}
      </body>
    </html>`;
}

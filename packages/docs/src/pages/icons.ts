import { html } from "hono/html";
import { Layout, url } from "../layout";
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { join, basename, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tablerDir = join(__dirname, "../../node_modules/@tabler/icons/icons");

function loadIcons(
  style: "outline" | "filled",
): { name: string; paths: string }[] {
  const dir = join(tablerDir, style);
  const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
  return files.map((file) => {
    const name = basename(file, ".svg");
    const svg = readFileSync(join(dir, file), "utf-8");
    const inner = svg
      .replace(/<svg[^>]*>/s, "")
      .replace("</svg>", "")
      .replace(/<path stroke="none"[^/]*\/>/g, "")
      .trim();
    return { name, paths: inner };
  });
}

function buildData(style: "outline" | "filled"): string {
  const data: Record<string, string> = {};
  for (const { name, paths } of loadIcons(style)) {
    data[name] = paths;
  }
  return JSON.stringify(data);
}

export function IconsData(): string {
  return buildData("outline");
}
export function IconsFilledData(): string {
  return buildData("filled");
}

export function IconsPage(path: string) {
  const outlineTotal = readdirSync(join(tablerDir, "outline")).filter((f) =>
    f.endsWith(".svg"),
  ).length;
  const filledTotal = readdirSync(join(tablerDir, "filled")).filter((f) =>
    f.endsWith(".svg"),
  ).length;
  const dataUrl = url("/icons.json");
  const filledDataUrl = url("/icons-filled.json");

  return Layout({
    title: "Icons",
    path,
    content: html`
      <div class="prose">
        <h1>Icons</h1>
        <p class="lead">
          Jazz doesn't ship icons. The examples below use
          <a href="https://tabler.io/icons" target="_blank" rel="noopener"
            >Tabler Icons</a
          >
          — over 5000 free, open-source SVG icons with a consistent stroke
          style.
        </p>
        <p>
          Inline SVGs work especially well with Jazz since they inherit
          <code>currentColor</code> and scale with <code>font-size</code>. Click
          any icon to copy its SVG.
        </p>
      </div>

      <div class="icons-search-bar">
        <label>
          <svg
            data-prefix
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            id="icon-search"
            placeholder="Search..."
            autocomplete="off"
          />
          <span data-suffix id="icon-count" aria-live="polite"
            >${outlineTotal}</span
          >
        </label>
        <label
          style="display:flex;align-items:center;gap:0.5rem;white-space:nowrap"
        >
          <input type="checkbox" class="switch" id="icon-style-switch" />
          Filled
        </label>
      </div>

      <ul class="icons-grid" id="icons-grid"></ul>

      <div id="icons-hint" class="icons-empty-state">
        <div class="icons-empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
        <strong>Search ${outlineTotal} icons</strong>
        <span>Type a name to find icons from the Tabler icon set.</span>
      </div>

      <div id="icons-empty" style="display:none" class="icons-empty-state">
        <div class="icons-empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
            <path d="M6 10l8 0" />
          </svg>
        </div>
        <strong>No icons found</strong>
        <span>Try a different search term.</span>
      </div>

      <script type="module">
        import MiniSearch from "${url("/minisearch.js")}";

        const URLS = {
          outline: "${dataUrl}",
          filled: "${filledDataUrl}",
        };
        const TOTALS = {
          outline: ${outlineTotal},
          filled: ${filledTotal},
        };
        const SVG_ATTRS = {
          outline:
            'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"',
          filled: 'fill="currentColor"',
        };

        const search = document.getElementById("icon-search");
        const grid = document.getElementById("icons-grid");
        const count = document.getElementById("icon-count");
        const hint = document.getElementById("icons-hint");
        const empty = document.getElementById("icons-empty");
        const styleSwitch = document.getElementById("icon-style-switch");

        const cache = {}; // { outline: data, filled: data }
        const indexes = {}; // { outline: MiniSearch, filled: MiniSearch }
        const promises = {}; // in-flight fetches

        function fetchData(style) {
          if (promises[style]) return promises[style];
          promises[style] = fetch(URLS[style])
            .then((r) => r.json())
            .then((json) => {
              cache[style] = json;
              const ms = new MiniSearch({
                fields: ["name"],
                storeFields: ["name"],
                tokenize: (s) => s.split(/[-s]+/),
              });
              ms.addAll(Object.keys(json).map((name) => ({ id: name, name })));
              indexes[style] = ms;
            });
          return promises[style];
        }

        function currentStyle() {
          return styleSwitch.checked ? "filled" : "outline";
        }

        function render(q) {
          const style = currentStyle();
          const data = cache[style];
          const ms = indexes[style];
          if (!data || !ms) return;

          hint.style.display = q ? "none" : "";

          if (!q) {
            grid.innerHTML = "";
            empty.style.display = "none";
            count.textContent = TOTALS[style];
            return;
          }

          const results = ms.search(q, { prefix: true, fuzzy: 0.2 });
          const attrs = SVG_ATTRS[style];

          empty.style.display = results.length === 0 ? "" : "none";
          count.textContent = results.length + " / " + TOTALS[style];

          grid.innerHTML = results
            .map(
              ({ id: name }) =>
                '<li class="icon-item" data-name="' +
                name +
                '" data-tooltip="' +
                name +
                '">' +
                '<button class="icon-copy-btn ghost square" data-icon="' +
                name +
                '" data-style="' +
                style +
                '">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" ' +
                attrs +
                ">" +
                data[name] +
                "</svg></button></li>",
            )
            .join("");
        }

        function setQuery(q, style) {
          const u = new URL(location.href);
          if (q) u.searchParams.set("q", q);
          else u.searchParams.delete("q");
          if (style === "filled") u.searchParams.set("style", "filled");
          else u.searchParams.delete("style");
          history.replaceState(null, "", u);
          fetchData(style).then(() => render(q));
        }

        // Restore from URL on load
        const params = new URL(location.href).searchParams;
        const initQ = params.get("q") || "";
        const initFilled = params.get("style") === "filled";
        if (initFilled) styleSwitch.checked = true;
        if (initQ) {
          search.value = initQ;
          setQuery(initQ, initFilled ? "filled" : "outline");
        }

        search.addEventListener("focus", () => fetchData(currentStyle()), {
          once: true,
        });
        search.addEventListener("input", function () {
          setQuery(this.value.trim().toLowerCase(), currentStyle());
        });

        styleSwitch.addEventListener("change", function () {
          const style = currentStyle();
          const q = search.value.trim().toLowerCase();
          count.textContent = TOTALS[style];
          setQuery(q, style);
        });

        grid.addEventListener("click", (e) => {
          const btn = e.target.closest(".icon-copy-btn");
          if (!btn) return;
          const name = btn.dataset.icon;
          const style = btn.dataset.style;
          const paths = cache[style]?.[name];
          if (!paths) return;
          const attrs = SVG_ATTRS[style];
          const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
            attrs +
            ">" +
            paths +
            "</svg>";
          navigator.clipboard.writeText(svg).then(() => {
            btn.setAttribute("data-copied", "");
            setTimeout(() => btn.removeAttribute("data-copied"), 1500);
          });
        });
      </script>
    `,
  });
}

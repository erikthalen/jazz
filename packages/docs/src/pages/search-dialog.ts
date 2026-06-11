import { html, raw } from "hono/html";
import { components, sections, blocks } from "../layout";
import { icon } from "../icon";

const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");
const minisearchUrl = `${b}/minisearch.js`;

type SearchItem = {
  id: number;
  title: string;
  description: string;
  path: string;
  type: string;
  badgeClass: string;
};

function renderItem(base: string, item: SearchItem) {
  return html` <li>
    <a href="${base}${item.path}" class="search-result">
      <span class="search-result-body">
        <span class="search-result-title">${item.title}</span>
        <span class="search-result-desc">${item.description}</span>
      </span>
      <span class="badge ${item.badgeClass}">${item.type}</span>
    </a>
  </li>`;
}

export function SearchDialog() {
  const items: SearchItem[] = [
    ...sections.map((s, i) => ({
      id: i,
      title: s.label,
      description: s.description,
      path: s.path,
      type: "guide",
      badgeClass: "color2",
    })),
    ...components.map((c, i) => ({
      id: sections.length + i,
      title: c.label,
      description: c.description,
      path: c.path,
      type: "component",
      badgeClass: "color4",
    })),
    ...blocks.map((bl, i) => ({
      id: sections.length + components.length + i,
      title: bl.label,
      description: bl.description,
      path: bl.path,
      type: "block",
      badgeClass: "color5",
    })),
  ];

  return html`<dialog id="search-dialog" class="search-dialog" scroll-lock>
    <article>
      <header>
        <label>
          ${raw(icon("search", { attrs: "data-prefix" }))}
          <input
            type="search"
            id="search-input"
            placeholder="Search components, guides..."
            autocomplete="off"
            autofocus
          />
          <kbd data-suffix>Esc</kbd>
        </label>
      </header>
      <div id="search-results" class="search-results">
        <ul class="search-list" id="search-list">
          ${raw(items.map((item) => renderItem(b, item)).join(""))}
        </ul>
        <section class="empty" id="search-empty" hidden>
          ${raw(icon("search-off"))}
          <h3>No results</h3>
          <p>Try a different search term.</p>
        </section>
      </div>
    </article>
    <script type="module">
      import MiniSearch from "${minisearchUrl}";

      const BASE = ${raw(JSON.stringify(b))};
      const items = ${raw(JSON.stringify(items))};

      const ms = new MiniSearch({
        fields: ["title"],
        storeFields: ["title", "description", "path", "type"],
      });
      ms.addAll(items);

      const dialog = document.getElementById("search-dialog");
      const input = document.getElementById("search-input");
      const list = document.getElementById("search-list");
      const empty = document.getElementById("search-empty");

      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });

      dialog.addEventListener("close", () => {
        input.value = "";
        renderAll();
      });

      list.addEventListener("click", (e) => {
        if (e.target.closest("a")) dialog.close();
      });

      function show(results) {
        const hasResults = results.length > 0;
        list.hidden = !hasResults;
        empty.hidden = hasResults;
        if (hasResults) {
          list.innerHTML = results
            .map(
              (r) =>
                '<li><a href="' +
                BASE +
                r.path +
                '" class="search-result">' +
                '<span class="search-result-body">' +
                '<span class="search-result-title">' +
                r.title +
                "</span>" +
                '<span class="search-result-desc">' +
                r.description +
                "</span>" +
                "</span>" +
                '<span class="badge">' +
                r.type +
                "</span>" +
                "</a></li>",
            )
            .join("");
        }
      }

      function renderAll() {
        show(items);
      }

      function renderResults(q) {
        show(ms.search(q, { prefix: true, fuzzy: 0.2 }));
      }

      input.addEventListener("input", function () {
        const q = this.value.trim();
        if (q) renderResults(q);
        else renderAll();
      });

      document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "f") {
          e.preventDefault();
          dialog.showModal();
          input.select();
        }
      });
    </script>
  </dialog>`;
}

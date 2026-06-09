import { html, raw } from "hono/html";
import { icon } from "../icon";

type TocItem = { id: string; label: string };

export function TableOfContents(toc: TocItem[] | undefined) {
  if (!toc || toc.length === 0) return "";

  return html`
    <aside class="docs-toc">
      <p class="sidebar-label">${raw(icon("list-tree"))} On This Page</p>
      <nav>
        ${toc.map((item) => html`<a href="#${item.id}">${item.label}</a>`)}
      </nav>
    </aside>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const nav = document.querySelector(".docs-toc nav");
        if (!nav) return;

        const links = Array.from(nav.querySelectorAll("a[href^='#']"));
        const headings = links
          .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
          .filter(Boolean);

        const visible = new Set();

        function updateActive() {
          links.forEach(function (a) {
            const isActive = visible.has(a.getAttribute("href").slice(1));
            a.ariaCurrent = isActive ? "true" : null;
            a.style.setProperty("anchor-name", "");
          });

          const active = links.filter(function (a) {
            return visible.has(a.getAttribute("href").slice(1));
          });

          if (active.length === 1) {
            active[0].style.setProperty("anchor-name", "--toc-start, --toc-end");
          } else if (active.length > 1) {
            active[0].style.setProperty("anchor-name", "--toc-start");
            active[active.length - 1].style.setProperty("anchor-name", "--toc-end");
          }
        }

        const observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              entry.isIntersecting
                ? visible.add(entry.target.id)
                : visible.delete(entry.target.id);
            });
            updateActive();
          },
          { rootMargin: "0px 0px -20% 0px", threshold: 0 }
        );

        headings.forEach(function (h) { observer.observe(h); });
      });
    </script>
  `;
}

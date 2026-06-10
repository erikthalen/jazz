import { html, raw } from "hono/html";
import { icon } from "../icon";

type TocItem = { id: string; label: string };

export function TableOfContents(toc: TocItem[] | undefined) {
  if (!toc || toc.length === 0) return "";

  return html`
    <aside class="docs-toc">
      <p class="sidebar-label">${raw(icon("list-tree"))} On This Page</p>
      <nav x-data="toc">
        ${toc.map((item) => html`<a href="#${item.id}">${item.label}</a>`)}
      </nav>
    </aside>

    <script type="module">
      import Alpine from "alpinejs";

      Alpine.data("toc", () => ({
        visible: new Set(),
        links: [],

        updateActive() {
          this.links.forEach((a) => {
            const isActive = this.visible.has(a.getAttribute("href").slice(1));
            a.ariaCurrent = isActive ? "true" : null;
            a.style.setProperty("anchor-name", "");
          });

          const active = this.links.filter((a) => {
            return this.visible.has(a.getAttribute("href").slice(1));
          });

          if (active.length === 1) {
            active
              .at(0)
              .style.setProperty("anchor-name", "--toc-start, --toc-end");
          } else if (active.length > 1) {
            active.at(0).style.setProperty("anchor-name", "--toc-start");
            active.at(-1).style.setProperty("anchor-name", "--toc-end");
          }
        },

        init() {
          this.links = [...this.$root.children];

          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                entry.isIntersecting
                  ? this.visible.add(entry.target.id)
                  : this.visible.delete(entry.target.id);
              }

              this.updateActive();
            },
            { rootMargin: "0px 0px -20% 0px", threshold: 0 },
          );

          for (const link of this.links) {
            const heading = document.getElementById(
              link.getAttribute("href").slice(1),
            );

            if (heading) {
              observer.observe(heading);
            }
          }
        },
      }));
    </script>
  `;
}

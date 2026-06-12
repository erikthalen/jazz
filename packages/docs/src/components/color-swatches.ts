import { html } from "hono/html";

const colors = [
  { color: "dodgerblue", name: "Blue" },
  { color: "#7c3aed", name: "Violet" },
  { color: "#db2777", name: "Pink" },
  { color: "#dc2626", name: "Red" },
  { color: "#ea580c", name: "Orange" },
  { color: "#16a34a", name: "Green" },
  { color: "#0891b2", name: "Cyan" },
  { color: "light-dark(#111111, #ffffff)", name: "Mono", display: "linear-gradient(135deg, #111 50%, #fff 50%)" },
] as const;

export function ColorSwatches() {
  return html`
    <div class="home-color-swatches">
      ${colors.map(
        (c) => html`
          <button
            class="home-swatch-btn"
            aria-label="${c.name}"
            data-color="${"display" in c ? c.color : `light-dark(${c.color}, color-mix(in oklab, ${c.color}, white 20%))`}"
            style="--swatch: ${"display" in c ? c.display : c.color}"
            onclick="
              const val = this.dataset.color;
              document.documentElement.style.setProperty('--ui-primary', val);
              localStorage.setItem('ui-primary', val);
              syncSwatch();
            "
          ></button>
        `,
      )}
    </div>
  `;
}

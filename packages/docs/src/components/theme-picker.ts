import { html, raw } from "hono/html";
import { icon } from "../icon";

export function ThemePicker() {
  return html`
    <script>
      localStorage.removeItem("jazz-primary-dark");
      const storedColor = localStorage.getItem("jazz-primary");
      if (storedColor) {
        document.documentElement.style.setProperty(
          "--jazz-primary",
          storedColor,
        );
      }
      function syncSwatch() {
        var stored = localStorage.getItem("jazz-primary");
        document.querySelectorAll(".color-swatch-btn").forEach(function (b) {
          b.classList.toggle("secondary", b.dataset.primary === stored);
          b.classList.toggle("ghost", b.dataset.primary !== stored);
        });
        document.querySelectorAll(".home-swatch-btn").forEach(function (b) {
          b.classList.toggle("active", b.dataset.color === stored);
        });
      }
      document.addEventListener("DOMContentLoaded", function () {
        syncSwatch();
      });
    </script>

    <button
      class="secondary"
      popovertarget="color-picker"
      style="anchor-name:--color-picker"
    >
      ${raw(icon("palette"))} <small>Theme</small>
    </button>

    <menu id="color-picker" popover class="color-picker-popover">
      ${(
        [
          { color: "dodgerblue", name: "Blue" },
          { color: "#7c3aed", name: "Violet" },
          { color: "#db2777", name: "Pink" },
          { color: "#dc2626", name: "Red" },
          { color: "#ea580c", name: "Orange" },
          { color: "#16a34a", name: "Green" },
          { color: "#0891b2", name: "Cyan" },
        ] as const
      ).map(
        ({ color, name }) => html`
          <li>
            <button
              class="color-swatch-btn ghost"
              style="--swatch-color:${color}"
              aria-label="${name}"
              data-primary="light-dark(${color}, color-mix(in oklab, ${color}, white 20%))"
              onclick="
              const val = 'light-dark(${color}, color-mix(in oklab, ${color}, white 20%))';
              document.documentElement.style.setProperty('--jazz-primary', val);
              localStorage.setItem('jazz-primary', val);
              document.getElementById('color-picker').hidePopover();
              syncSwatch();
            "
            >
              <span class="swatch-circle"></span>
              <span class="swatch-name">${name}</span>
            </button>
          </li>
        `,
      )}
      <li>
        <button
          class="color-swatch-btn ghost"
          style="--swatch-color:linear-gradient(135deg, #111 50%, #fff 50%)"
          aria-label="Mono"
          data-primary="light-dark(#111111, #ffffff)"
          onclick="
            const val = 'light-dark(#111111, #ffffff)';
            document.documentElement.style.setProperty('--jazz-primary', val);
            localStorage.setItem('jazz-primary', val);
            document.getElementById('color-picker').hidePopover();
            syncSwatch();
          "
        >
          <span
            class="swatch-circle"
            style="box-shadow:0 0 0 1px var(--jazz-neutral-300) inset"
          ></span>
          <span class="swatch-name">Mono</span>
        </button>
      </li>
      <li class="color-picker-custom">
        <label class="field">
          <span>Custom</span>
          <input
            type="color"
            value="#6366f1"
            oninput="
            document.documentElement.style.setProperty('--jazz-primary', this.value);
            localStorage.setItem('jazz-primary', this.value);
          "
          />
        </label>
      </li>
    </menu>
  `;
}

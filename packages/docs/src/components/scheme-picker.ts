import { html, raw } from "hono/html";
import { icon } from "../icon";

export function SchemePicker() {
  return html`
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
    </script>
    <fieldset role="group">
      <label class="toggle square" aria-label="Light" data-tooltip="bottom">
        <input
          type="radio"
          name="theme"
          value="light"
          onchange="applyColorScheme(this.value)"
        />
        ${raw(icon("sun"))}
      </label>
      <label class="toggle square" aria-label="Dark" data-tooltip="bottom">
        <input
          type="radio"
          name="theme"
          value="dark"
          onchange="applyColorScheme(this.value)"
        />
        ${raw(icon("moon"))}
      </label>
      <label
        class="toggle square"
        aria-label="System"
        data-tooltip="bottom"
      >
        <input
          type="radio"
          name="theme"
          value="system"
          onchange="applyColorScheme(this.value)"
        />
        ${raw(icon("device-desktop"))}
      </label>
    </fieldset>
  `;
}

import { html } from "hono/html";

export default () => html`
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

  <style>
    .code-copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      color: var(--ui-neutral-400);
    }

    .code-copy-btn[data-copied] {
      color: var(--ui-constructive-400);
    }
  </style>
`;

import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "duration", label: "Duration" },
];

export async function ToastPage(path: string) {
  return Layout({
    title: "Toast",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Toast <sup class="badge">WIP</sup></h1>
          <p>
            Temporary notification messages using the native
            <code>&lt;output&gt;</code> element — a semantic live region with
            implicit <code>aria-live="polite"</code>. CSS handles the animation
            lifecycle; the View Transitions API smoothly repositions existing
            toasts when new ones arrive.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div style="display:flex;gap:var(--spacing-2)">
            <button onclick="toast('File saved')">Save</button>
            <button onclick="toast('Link copied to clipboard')">
              Copy link
            </button>
            <button onclick="toast('Changes discarded')" class="ghost">
              Discard
            </button>
          </div>
          <output id="toasts"></output>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button onclick="toast('File saved')">Save</button>

<output id="toasts"></output>

<script>
  let toastId = 0

  function toast(text) {
    const out = document.querySelector('output')
    const p = document.createElement('p')
    p.textContent = text

    const add = () => out.appendChild(p)

    if (document.startViewTransition) {
      const vt = document.startViewTransition(add)
      vt.finished.then(() => {
        p.style.viewTransitionName = 'toast-' + toastId++
      })
    } else {
      add()
    }

    p.addEventListener('animationend', () => {
      const remove = () => p.remove()
      document.startViewTransition
        ? document.startViewTransition(remove)
        : remove()
    })
  }
<\/script>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="duration">Duration</h2>
        <p>
          Control display time with the
          <code>--toast-duration</code> CSS custom property (default
          <code>3s</code>).
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button onclick="toast('This one lingers', 6)">Show 6s toast</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `toast('This one lingers', 6)\n\n// The second arg sets --toast-duration on the element`,
            ),
          )}
        </div>
      </div>

      <script>
        let toastId = 0;

        function toast(text, seconds) {
          const out = document.getElementById("toasts");
          const p = document.createElement("p");
          p.textContent = text;
          if (seconds) p.style.setProperty("--toast-duration", seconds + "s");

          const add = () => out.appendChild(p);

          if (document.startViewTransition) {
            const vt = document.startViewTransition(add);
            vt.finished.then(() => {
              p.style.viewTransitionName = "toast-" + toastId++;
            });
          } else {
            add();
          }

          p.addEventListener("animationend", () => {
            const remove = () => p.remove();
            document.startViewTransition
              ? document.startViewTransition(remove)
              : remove();
          });
        }
      </script>
    `,
  });
}

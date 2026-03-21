import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "mixed", label: "Mixed" },
  { id: "with-input", label: "With input" },
  { id: "side-by-side", label: "Side by side" },
];

export async function ButtonGroupPage(path: string) {
  return Layout({
    title: "Button Group",
    path,
    toc,
    content: html`
      <h1>Button Group</h1>
      <p class="lead">
        Group related actions using <code>&lt;button&gt;</code>s inside a
        <code>&lt;fieldset role="group"&gt;</code>.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
</fieldset>`),
          )}
        </div>
      </div>

      <h2 id="mixed">Mixed</h2>
      <p>Combine icon buttons and labeled buttons in the same group.</p>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button class="ghost square" aria-label="Back">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
            <button class="ghost square" aria-label="More">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost square" aria-label="Back">←</button>
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
  <button class="ghost square" aria-label="More">···</button>
</fieldset>`),
          )}
        </div>
      </div>

      <h2 id="with-input">With input</h2>
      <p>Inputs stretch to fill the available space.</p>
      <div class="example">
        <div class="preview">
          <fieldset role="group" style="width:320px">
            <input type="text" placeholder="Search..." />
            <button class="ghost square" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <input type="text" placeholder="Search..." />
  <button class="ghost square" aria-label="Search">
    …
  </button>
</fieldset>`),
          )}
        </div>
      </div>
      <h2 id="side-by-side">Side by side</h2>
      <p>Place two groups next to each other to build toolbar-style layouts.</p>
      <div class="example">
        <div class="preview">
          <div style="display:flex;gap:0.5rem">
            <fieldset role="group">
              <button class="ghost square" aria-label="Align left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
              </button>
              <button class="ghost square" aria-label="Align center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
              </button>
              <button class="ghost square" aria-label="Align right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
              </button>
            </fieldset>
            <fieldset role="group">
              <button class="ghost square" aria-label="Bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
              </button>
              <button class="ghost square" aria-label="Italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
              </button>
              <button class="ghost square" aria-label="Underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
              </button>
            </fieldset>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display:flex;gap:0.5rem">
  <fieldset role="group">
    <button class="ghost square">…</button>
    <button class="ghost square">…</button>
    <button class="ghost square">…</button>
  </fieldset>
  <fieldset role="group">
    <button class="ghost square">…</button>
    <button class="ghost square">…</button>
    <button class="ghost square">…</button>
  </fieldset>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

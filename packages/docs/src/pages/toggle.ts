import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "square", label: "Square" },
  { id: "fill", label: "Fill" },
  { id: "ghost", label: "Ghost" },
  { id: "conditional-content", label: "Conditional content" },
  { id: "disabled", label: "Disabled" },
];

const bookmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;
const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

export async function TogglePage(path: string) {
  return Layout({
    title: "Toggle",
    path,
    toc,
    content: html`
      <h1>Toggle</h1>
      <p class="lead">
        A pressable label that wraps a checkbox — looks like a button, works
        like a toggle.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <label class="toggle">
            <input type="checkbox" />
            ${raw(bookmarkIcon)} Bookmark
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <h2 id="checked">Checked</h2>
      <p>Works with or without an icon.</p>
      <div class="example">
        <div class="preview" style="gap: 0.5rem; flex-wrap: wrap">
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(bookmarkIcon)} Bookmark
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(starIcon)} Star
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(heartIcon)} Like
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            Follow
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" checked />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <h2 id="square">Square</h2>
      <p>
        Add <code>.square</code> for an icon-only toggle with equal padding.
      </p>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle square" aria-label="Bookmark">
            <input type="checkbox" />
            ${raw(bookmarkIcon)}
          </label>
          <label class="toggle square" aria-label="Star">
            <input type="checkbox" checked />
            ${raw(starIcon)}
          </label>
          <label class="toggle square" aria-label="Like">
            <input type="checkbox" />
            ${raw(heartIcon)}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle square" aria-label="Bookmark">
  <input type="checkbox" />
  <svg>...</svg>
</label>`),
          )}
        </div>
      </div>

      <h2 id="ghost">Ghost</h2>
      <p>Add <code>.ghost</code> to remove the outline.</p>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle ghost">
            <input type="checkbox" />
            ${raw(bookmarkIcon)}
            Bookmark
          </label>
          <label class="toggle ghost">
            <input type="checkbox" checked />
            ${raw(starIcon)}
            Star
          </label>
          <label class="toggle ghost square" aria-label="Like">
            <input type="checkbox" />
            ${raw(heartIcon)}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle ghost">
  <input type="checkbox" />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <h2 id="fill">Fill</h2>
      <p>Add <code>.fill</code> to fill the SVG icon when checked.</p>
      <div class="example">
        <div class="preview" style="gap: 0.5rem; flex-wrap: wrap">
          <label class="toggle fill">
            <input type="checkbox" checked />
            ${raw(bookmarkIcon)} Bookmark
          </label>
          <label class="toggle fill">
            <input type="checkbox" checked />
            ${raw(starIcon)} Star
          </label>
          <label class="toggle fill square">
            <input type="checkbox" checked />
            ${raw(heartIcon)}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle fill">
  <input type="checkbox" checked />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <h2 id="conditional-content">Conditional content</h2>
      <p>
        Children with <code>data-checked</code> or
        <code>data-unchecked</code> are shown only in the matching state.
      </p>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle">
            <input type="checkbox" />
            <span data-unchecked>Follow</span>
            <span data-checked>Following</span>
          </label>
          <label class="toggle square" aria-label="Mute">
            <input type="checkbox" />

            ${raw(
              `<svg data-unchecked xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /></svg>`,
            )}
            ${raw(
              `<svg data-checked xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /><path d="M16 10l4 4m0 -4l-4 4" /></svg>`,
            )}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" />
  <span data-unchecked>Follow</span>
  <span data-checked>Following</span>
</label>`),
          )}
        </div>
      </div>
      <p>Combine with <code>.ghost</code> for icon-only toggles like a theme switcher.</p>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle ghost square" aria-label="Toggle theme">
            <input type="checkbox" />
            <svg data-unchecked xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <svg data-checked xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle ghost square" aria-label="Toggle theme">
  <input type="checkbox" />
  <svg data-unchecked><!-- sun --></svg>
  <svg data-checked><!-- moon --></svg>
</label>`),
          )}
        </div>
      </div>

      <h2 id="disabled">Disabled</h2>
      <div class="example">
        <div class="preview">
          <label class="toggle">
            <input type="checkbox" disabled />
            ${raw(bookmarkIcon)} Bookmark
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" disabled />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>
    `,
  });
}

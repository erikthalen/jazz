import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "disabled", label: "Disabled" },
];

const bookmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`
const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`

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
            ${raw(bookmarkIcon)}
            Bookmark
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
            ${raw(bookmarkIcon)}
            Bookmark
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(starIcon)}
            Star
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(heartIcon)}
            Like
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

      <h2 id="disabled">Disabled</h2>
      <div class="example">
        <div class="preview">
          <label class="toggle">
            <input type="checkbox" disabled />
            ${raw(bookmarkIcon)}
            Bookmark
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

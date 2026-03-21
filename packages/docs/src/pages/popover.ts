import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-card", label: "With card" },
  { id: "menu", label: "Menu" },
];

export async function PopoverPage(path: string) {
  return Layout({
    title: "Popover",
    path,
    toc,
    content: html`
      <h1>Popover</h1>
      <p class="lead">
        A floating panel anchored to a trigger using the native
        <code>popover</code> API and CSS anchor positioning.
      </p>

      <h2 id="default">Default</h2>
      <p>
        Connect a <code>popovertarget</code> button to a
        <code>[popover]</code> element by matching IDs. The button acts as the
        CSS anchor automatically — no extra markup needed.
      </p>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="popover-demo">Open</button>
          <div id="popover-demo" popover style="padding: 1rem">
            <p>This is a popover.</p>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Open</button>

<div id="my-popover" popover>
  Content
</div>`),
          )}
        </div>
      </div>

      <h2 id="with-card">With card</h2>
      <p>
        Use an <code>&lt;article&gt;</code> inside for structured content with
        header and footer sections.
      </p>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="popover-card">Options</button>
          <div id="popover-card" popover>
            <article>
              <header><strong>Settings</strong></header>
              <div style="display:flex;flex-direction:column;gap:0.5rem">
                <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
                  <input type="checkbox" checked /> Notifications
                </label>
                <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
                  <input type="checkbox" /> Dark mode
                </label>
              </div>
              <footer>
                <button popovertarget="popover-card" popovertargetaction="hide">Close</button>
              </footer>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Options</button>

<div id="my-popover" popover>
  <article>
    <header><strong>Settings</strong></header>
    <div>...</div>
    <footer>
      <button popovertarget="my-popover"
              popovertargetaction="hide">Close</button>
    </footer>
  </article>
</div>`),
          )}
        </div>
      </div>

      <h2 id="menu">Menu</h2>
      <p>Combine ghost buttons, separators, and a destructive action.</p>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="popover-menu">Actions</button>
          <div id="popover-menu" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div id="my-popover" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

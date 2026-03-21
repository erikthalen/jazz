import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "outline", label: "Outline" },
  { id: "secondary", label: "Secondary" },
  { id: "ghost", label: "Ghost" },
  { id: "destructive", label: "Destructive" },
  { id: "link", label: "Link" },
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "loading", label: "Loading" },
];

export async function ButtonPage(path: string) {
  return Layout({
    title: "Button",
    path,
    toc,
    content: html`
      <h1>Button</h1>
      <p class="lead">
        Trigger an action using a native <code>&lt;button&gt;</code> element.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <button>Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight("<button>Click me</button>"))}
        </div>
      </div>

      <h2 id="outline">Outline</h2>
      <div class="example">
        <div class="preview">
          <button class="outline">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="outline">Click me</button>'))}
        </div>
      </div>

      <h2 id="secondary">Secondary</h2>
      <div class="example">
        <div class="preview">
          <button class="secondary">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="secondary">Click me</button>'))}
        </div>
      </div>

      <h2 id="ghost">Ghost</h2>
      <div class="example">
        <div class="preview">
          <button class="ghost">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="ghost">Click me</button>'))}
        </div>
      </div>

      <h2 id="destructive">Destructive</h2>
      <div class="example">
        <div class="preview">
          <button class="destructive">Delete</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="destructive">Delete</button>'))}
        </div>
      </div>

      <h2 id="link">Link</h2>
      <div class="example">
        <div class="preview">
          <button class="link">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="link">Click me</button>'))}
        </div>
      </div>

      <h2 id="round">Round</h2>
      <div class="example">
        <div class="preview">
          <button class="round">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-user"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<button class="round"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg></button>',
            ),
          )}
        </div>
      </div>

      <h2 id="square">Square</h2>
      <p>
        Add <code>.square</code> for equal padding — useful for icon buttons.
      </p>
      <div class="example">
        <div class="preview">
          <button class="square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-upload"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 9l5 -5l5 5" />
              <path d="M12 4l0 12" />
            </svg>
          </button>
          <button class="square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-settings"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065"
              />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<button class="square"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg></button>',
            ),
          )}
        </div>
      </div>

      <h2 id="loading">Loading</h2>
      <p>
        Set <code>aria-busy="true"</code> to show an animated spinner before the
        label.
      </p>
      <div class="example">
        <div class="preview">
          <button aria-busy="true">Please wait…</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight('<button aria-busy="true">Please wait…</button>'),
          )}
        </div>
      </div>
    `,
  });
}

import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "combinations", label: "Combinations" },
];

export async function KbdPage(path: string) {
  return Layout({
    title: "Kbd",
    path,
    toc,
    content: html`
      <h1>Kbd</h1>
      <p class="lead">
        Represents a keyboard input using the native
        <code>&lt;kbd&gt;</code> element.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <kbd>⌘</kbd>
          <kbd>⇧</kbd>
          <kbd>⌥</kbd>
          <kbd>⌃</kbd>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<kbd>⌘</kbd>
<kbd>⇧</kbd>
<kbd>⌥</kbd>
<kbd>⌃</kbd>`))}
        </div>
      </div>

      <h2 id="combinations">Combinations</h2>
      <p>Use <code>+</code> between <code>&lt;kbd&gt;</code> elements to show key combinations.</p>
      <div class="example">
        <div class="preview">
          <kbd>⌘</kbd> + <kbd>K</kbd>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<kbd>⌘</kbd> + <kbd>K</kbd>`))}
        </div>
      </div>
    `,
  });
}

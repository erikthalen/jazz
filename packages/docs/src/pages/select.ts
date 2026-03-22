import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled" },
];

export async function SelectPage(path: string) {
  return Layout({
    title: "Select",
    path,
    toc,
    content: html`
      <h1>Select</h1>
      <p class="lead">
        A styled native <code>&lt;select&gt;</code> element. Accessible and
        keyboard-navigable out of the box.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <select>
            <option>Apple</option>
            <option>Banana</option>
            <option>Cherry</option>
            <option>Mango</option>
          </select>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<select>
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
  <option>Mango</option>
</select>`),
          )}
        </div>
      </div>

      <h2 id="disabled">Disabled</h2>
      <div class="example">
        <div class="preview">
          <select disabled>
            <option>Apple</option>
            <option>Banana</option>
          </select>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<select disabled>...</select>`))}
        </div>
      </div>
    `,
  });
}

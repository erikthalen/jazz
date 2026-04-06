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
      <div class="prose">
        <hgroup>
          <h1>Select</h1>
          <p>
            A styled native <code>&lt;select&gt;</code> element. Accessible and
            keyboard-navigable out of the box.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
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

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
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

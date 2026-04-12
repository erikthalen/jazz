import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "placement", label: "Placement" },
];

export async function TooltipPage(path: string) {
  return Layout({
    title: "Tooltip",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tooltip</h1>
          <p>
            Show a tooltip using the <code>aria-label</code> attribute. Appears
            on hover and on keyboard focus.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" aria-label="Add to library">Hover or focus</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<button aria-label="Add to library">Hover or focus</button>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="placement">Placement</h2>
        <p>
          Use <code>data-placement</code> to control which side the tooltip
          appears on. Defaults to <code>top</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:1rem">
          <button class="outlined" aria-label="Top" data-placement="top">
            Top
          </button>
          <button class="outlined" aria-label="Bottom" data-placement="bottom">
            Bottom
          </button>
          <button class="outlined" aria-label="Left" data-placement="left">
            Left
          </button>
          <button class="outlined" aria-label="Right" data-placement="right">
            Right
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<button aria-label="Top" data-placement="top">Top</button>
<button aria-label="Bottom" data-placement="bottom">Bottom</button>
<button aria-label="Left" data-placement="left">Left</button>
<button aria-label="Right" data-placement="right">Right</button>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}

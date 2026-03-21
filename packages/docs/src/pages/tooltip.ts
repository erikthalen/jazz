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
      <h1>Tooltip</h1>
      <p class="lead">
        Show a tooltip on hover using the <code>data-tooltip</code> attribute.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <button class="outline" data-tooltip="Add to library">Hover</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<button data-tooltip="Add to library">Hover</button>`,
            ),
          )}
        </div>
      </div>

      <h2 id="placement">Placement</h2>
      <p>
        Use <code>data-placement</code> to control which side the tooltip
        appears on. Defaults to <code>top</code>.
      </p>
      <div class="example">
        <div class="preview" style="gap:1rem">
          <button class="outline" data-tooltip="Top" data-placement="top">Top</button>
          <button class="outline" data-tooltip="Bottom" data-placement="bottom">Bottom</button>
          <button class="outline" data-tooltip="Left" data-placement="left">Left</button>
          <button class="outline" data-tooltip="Right" data-placement="right">Right</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<button data-tooltip="Top" data-placement="top">Top</button>
<button data-tooltip="Bottom" data-placement="bottom">Bottom</button>
<button data-tooltip="Left" data-placement="left">Left</button>
<button data-tooltip="Right" data-placement="right">Right</button>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}

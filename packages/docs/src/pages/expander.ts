import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [{ id: "default", label: "Default" }];

const loremIpsum = `Jazz is a minimal CSS design system that styles native HTML elements
directly — no utility classes, no component wrappers, no build step required.
It ships as a single stylesheet and works with any framework or none at all.
Colors, spacing, and easing are all driven by CSS custom properties, so
theming is a matter of overriding a handful of variables. Dark mode is
handled automatically via color-scheme. Every component is built from
semantic HTML and progressively enhanced with modern CSS features like
:has(), @starting-style, the Popover API, and anchor positioning.`;

export async function ExpanderPage(path: string) {
  return Layout({
    title: "Expander",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Expander</h1>
        <p class="lead">
          Reveal hidden content by transitioning from a user-defined height to
          <code>height: auto</code>. Set the closed height via
          <code>--height</code>.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="expander">
            <p style="--height: 4.5rem;">${loremIpsum}</p>
            <label>
              <input type="checkbox" />
              Show more
            </label>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="expander">
  <p style="--height: 4.5rem">Long content...</p>
  <label>
    <input type="checkbox" />
    Show more
  </label>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'overriding-styles', label: 'Overriding styles' },
  { id: 'example', label: 'Example' },
]

export async function CustomizationPage(path: string) {
  return Layout({
    title: 'Customization',
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Customization</h1>
          <p>
            @erikt/ui uses <code>@layer</code> to stay out of your way. Any styles you
            write outside of a layer automatically win over @erikt/ui's defaults.
          </p>
        </hgroup>

        <h2 id="how-it-works">How it works</h2>
        <p>
          All @erikt/ui styles are scoped inside <code>@layer ui</code>. The CSS
          cascade gives unlayered styles the highest priority, so you can override
          anything simply by writing regular CSS — no <code>!important</code>, no
          increased specificity needed.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await highlight(
            `/* erikt/ui internals — low priority */\n` +
            `@layer ui {\n` +
            `  button { border-radius: 8px; }\n` +
            `}\n` +
            `\n` +
            `/* your styles — always win */\n` +
            `button { border-radius: 0; }`,
            80, 'css'
          ))}
        </div>
      </div>

      <div class="prose">
        <h2 id="overriding-styles">Overriding styles</h2>
        <p>
          Write your overrides in a plain stylesheet, after the @erikt/ui import. You
          can target any element or class @erikt/ui exposes.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await highlight(
            `<link rel="stylesheet" href="ui.css" />\n` +
            `<link rel="stylesheet" href="your-styles.css" />`,
            80, 'html'
          ))}
        </div>
      </div>
      <div class="prose">
        <p>
          Or inline in a <code>&lt;style&gt;</code> tag, or inside your own
          <code>@layer</code> as long as it is declared after
          <code>erikt/ui</code> in the layer order.
        </p>

        <h2 id="example">Example</h2>
        <p>
          Here is a button with @erikt/ui's default styling next to one with
          <code>border-radius: 0</code> applied via a local override.
        </p>
      </div>

      <div class="example">
        <div class="preview" style="gap: 1rem; flex-direction: column; align-items: flex-start">
          <div style="display: flex; gap: 0.5rem; align-items: center">
            <button>Default</button>
            <button class="outlined">Default</button>
            <button class="ghost">Default</button>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center">
            <style>
              .btn-sharp { border-radius: 0; }
            </style>
            <button class="btn-sharp">Sharp</button>
            <button class="outlined btn-sharp">Sharp</button>
            <button class="ghost btn-sharp">Sharp</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(await highlight(
            `/* your-styles.css */\n` +
            `button { border-radius: 0; }`,
            80, 'css'
          ))}
        </div>
      </div>

      <div class="prose">
        <p>
          The same technique works for any property — spacing, font sizes,
          colors, transitions, and so on. @erikt/ui's token system (CSS custom
          properties like <code>--ui-primary</code>) gives you an additional
          lever: changing a token updates every component that references it at
          once. See <a href="/themes">Themes</a> for details.
        </p>
      </div>
    `,
  })
}

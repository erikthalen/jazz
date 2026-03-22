import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'primary-scale', label: 'Primary scale' },
  { id: 'neutral-scale', label: 'Neutral scale' },
  { id: 'constructive-scale', label: 'Constructive scale' },
  { id: 'destructive-scale', label: 'Destructive scale' },
  { id: 'customizing', label: 'Customizing' },
  { id: 'dark-mode', label: 'Dark mode' },
]

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function colorScale(name: string) {
  return html`
    <div class="color-scale">
      ${steps.map(
        (step) => html`
          <div class="color-swatch">
            <div
              class="color-swatch-block"
              style="background: var(--jazz-${name}-${step})"
            ></div>
            <span>${step}</span>
          </div>
        `,
      )}
    </div>
  `
}

export async function ThemesPage(path: string) {
  return Layout({
    title: 'Themes',
    path,
    toc,
    content: html`
      <h1>Themes</h1>
      <p class="lead">
        Jazz is themed entirely through CSS custom properties — override the
        seed colors to match your brand.
      </p>

      <h2 id="primary-scale">Primary scale</h2>
      <p>
        Used for interactive elements like buttons and focus rings. The palette
        is derived from <code>--jazz-primary-light</code> in light mode and
        <code>--jazz-primary-dark</code> in dark mode — useful when a color
        needs adjusting between themes (e.g. slightly lighter in dark mode for
        contrast). Both fall back to <code>--jazz-primary</code> if unset.
      </p>
      ${colorScale('primary')}

      <h2 id="neutral-scale">Neutral scale</h2>
      <p>
        Used for text, borders, and backgrounds. Override
        <code>--jazz-neutral</code> to adjust neutral tones.
      </p>
      ${colorScale('neutral')}

      <h2 id="constructive-scale">Constructive scale</h2>
      <p>
        Used for success and positive states. Override
        <code>--jazz-constructive</code>.
      </p>
      ${colorScale('constructive')}

      <h2 id="destructive-scale">Destructive scale</h2>
      <p>
        Used for errors and danger states. Override
        <code>--jazz-destructive</code>.
      </p>
      ${colorScale('destructive')}

      <h2 id="customizing">Customizing</h2>
      <p>
        Override seed colors on <code>:root</code> after importing the
        stylesheet. Use <code>--jazz-primary</code> for a single color across
        both themes, or set <code>--jazz-primary-light</code> and
        <code>--jazz-primary-dark</code> independently for per-theme control:
      </p>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `:root {
  /* Same primary for both themes */
  --jazz-primary: #6366f1;

  /* Or tune per-theme */
  --jazz-primary-light: #4f46e5;
  --jazz-primary-dark: #818cf8;

  --jazz-neutral: #6b7280;
}`,
              'css',
            ),
          )}
        </div>
      </div>

      <h2 id="dark-mode">Dark mode</h2>
      <p>
        Jazz responds to <code>prefers-color-scheme: dark</code> automatically.
        You can also force a mode by adding a class to any container element:
      </p>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<html class="jazz-light">...</html>
<html class="jazz-dark">...</html>`,
            ),
          )}
        </div>
      </div>
    `,
  })
}

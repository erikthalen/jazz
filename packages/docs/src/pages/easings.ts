import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'ease-glide', label: 'Glide' },
  { id: 'ease-snap', label: 'Snap' },
  { id: 'ease-heavy', label: 'Heavy' },
]

function easingDemo(variable: string) {
  return html`
    <div class="easing-demo">
      <div class="easing-track" style="container-type:inline-size">
        <div class="easing-dot" style="transition-timing-function:${variable}"></div>
      </div>
    </div>
  `
}

export async function EasingsPage(path: string) {
  return Layout({
    title: 'Easings',
    path,
    toc,
    content: html`
      <h1>Easings</h1>
      <p class="lead">
        Custom easing curves for natural-feeling transitions and animations.
      </p>
      <label>
        <input type="checkbox" class="switch" />
        Animate
      </label>

      <h2 id="ease-glide">Glide</h2>
      <p>
        Smooth deceleration with a soft landing. Works well for most UI
        transitions — drawers, modals, expanding content.
      </p>
      <div class="example">
        <div class="preview">
          ${easingDemo('var(--ease-glide)')}
        </div>
        <div class="code-block">
          ${raw(await highlight(`.element {\n  transition: transform 300ms var(--ease-glide);\n}`, 'css'))}
        </div>
      </div>

      <h2 id="ease-snap">Snap</h2>
      <p>
        Fast out with a slight overshoot that snaps into place. Great for
        elements that should feel responsive and decisive — toggles, selections.
      </p>
      <div class="example">
        <div class="preview">
          ${easingDemo('var(--ease-snap)')}
        </div>
        <div class="code-block">
          ${raw(await highlight(`.element {\n  transition: transform 300ms var(--ease-snap);\n}`, 'css'))}
        </div>
      </div>

      <h2 id="ease-heavy">Heavy</h2>
      <p>
        Dramatic elastic overshoot for elements that need weight and impact.
        Use sparingly for things that should demand attention.
      </p>
      <div class="example">
        <div class="preview">
          ${easingDemo('var(--ease-heavy)')}
        </div>
        <div class="code-block">
          ${raw(await highlight(`.element {\n  transition: transform 300ms var(--ease-heavy);\n}`, 'css'))}
        </div>
      </div>
    `,
  })
}

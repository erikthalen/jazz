import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'button', label: 'Button' },
  { id: 'custom', label: 'Custom element' },
]

export async function LoadingPage(path: string) {
  return Layout({
    title: 'Loading',
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Loading</h1>
        <p class="lead">
          An animated SVG spinner injected via CSS whenever <code>aria-busy="true"</code> is set.
        </p>

        <h2 id="button">Button</h2>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;align-items:center;justify-contents:center;gap:1rem">
          <button id="loading-btn" aria-busy="true">Saving…</button>
          <label style="display:flex;align-items:center;gap:0.5rem">
            <input type="checkbox" checked onchange="this.checked ? document.getElementById('loading-btn').setAttribute('aria-busy', 'true') : document.getElementById('loading-btn').removeAttribute('aria-busy')" />
            Loading
          </label>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button aria-busy="true">Saving…</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="custom">Custom element</h2>
        <p>Any element with <code>aria-busy="true"</code> gets a spinner via <code>::before</code>.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width: 1rem; height: 1rem;" aria-busy="true"></div>
        </div>
        <div class="code-block">
          ${raw(await highlight('<div style="width: 1rem; height: 1rem;" aria-busy="true"></div>'))}
        </div>
      </div>
    `,
  })
}

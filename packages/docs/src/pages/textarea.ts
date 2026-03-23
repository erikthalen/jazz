import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [{ id: 'default', label: 'Default' }]

export async function TextareaPage(path: string) {
  return Layout({
    title: 'Textarea',
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Textarea</h1>
        <p class="lead">Auto-growing textarea using <code>field-sizing: content</code>.</p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <textarea placeholder="Write something..." style="width:100%"></textarea>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<textarea placeholder="Write something..."></textarea>`))}
        </div>
      </div>
    `,
  })
}

import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'text', label: 'Text' },
  { id: 'email', label: 'Email' },
  { id: 'field', label: 'Field' },
  { id: 'focus', label: 'Focus state' },
]

export async function FormPage(path: string) {
  return Layout({
    title: 'Form',
    path,
    toc,
    content: html`
      <h1>Form</h1>
      <p class="lead">Styled native form inputs — no classes needed.</p>

      <h2 id="text">Text</h2>
      <div class="example">
        <div class="preview preview-padded">
          <input type="text" placeholder="First name" />
        </div>
        <div class="code-block">
          ${raw(await highlight('<input type="text" placeholder="First name" />'))}
        </div>
      </div>

      <h2 id="email">Email</h2>
      <div class="example">
        <div class="preview preview-padded">
          <input type="email" placeholder="you@example.com" />
        </div>
        <div class="code-block">
          ${raw(await highlight('<input type="email" placeholder="you@example.com" />'))}
        </div>
      </div>

      <h2 id="field">Field</h2>
      <p>
        Wrap an input in <code>.field</code> to add a <code>&lt;label&gt;</code>
        and a <code>&lt;small&gt;</code> description. The required asterisk
        appears automatically when the input has the <code>required</code>
        attribute.
      </p>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Required Field</span>
            <input type="text" placeholder="This field is required" required />
            <small>This field must be filled out.</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Required Field</span>
  <input type="text" placeholder="..." required />
  <small>This field must be filled out.</small>
</label>`),
          )}
        </div>
      </div>

      <h2 id="focus">Focus state</h2>
      <p>On focus the outline shifts to <code>currentColor</code> for a high-contrast indicator.</p>
      <div class="example">
        <div class="preview preview-padded">
          <input type="text" placeholder="Click to focus" />
        </div>
        <div class="code-block">
          ${raw(await highlight('<input type="text" placeholder="Click to focus" />'))}
        </div>
      </div>
    `,
  })
}

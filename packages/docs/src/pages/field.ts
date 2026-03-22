import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'default', label: 'Default' },
  { id: 'required', label: 'Required' },
  { id: 'with-progress', label: 'With progress' },
  { id: 'with-slider', label: 'With slider' },
  { id: 'form', label: 'Form' },
]

export async function FieldPage(path: string) {
  return Layout({
    title: 'Field',
    path,
    toc,
    content: html`
      <h1>Field</h1>
      <p class="lead">
        A <code>label.field</code> wrapper that stacks a label, any form
        control, and an optional description. Works with any input type,
        select, or progress.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
            <small>We'll never share your email.</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Email</span>
  <input type="email" placeholder="you@example.com" />
  <small>We'll never share your email.</small>
</label>`),
          )}
        </div>
      </div>

      <h2 id="required">Required</h2>
      <p>
        Add <code>required</code> to the input and a
        <code>*</code> appears automatically on the label.
      </p>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Username</span>
            <input type="text" placeholder="johndoe" required />
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Username</span>
  <input type="text" placeholder="johndoe" required />
</label>`),
          )}
        </div>
      </div>

      <h2 id="with-progress">With progress</h2>
      <div class="example">
        <div class="preview preview-padded" style="display:flex;flex-direction:column;gap:1rem;width:100%">
          <label class="field" style="width:100%">
            <span>Uploading…</span>
            <progress value="65" max="100"></progress>
            <small>65%</small>
          </label>
          <label class="field" style="width:100%">
            <span>Processing</span>
            <progress></progress>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Uploading…</span>
  <progress value="65" max="100"></progress>
  <small>65%</small>
</label>

<label class="field">
  <span>Processing</span>
  <progress></progress>
</label>`),
          )}
        </div>
      </div>
      <h2 id="with-slider">With slider</h2>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Volume</span>
            <input type="range" value="60" />
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Volume</span>
  <input type="range" value="60" />
</label>`),
          )}
        </div>
      </div>
      <h2 id="form">Form</h2>
      <div class="example">
        <div class="preview preview-padded">
          <form style="display:flex;flex-direction:column;gap:var(--spacing-4);width:100%;max-width:400px;margin:auto;" onsubmit="return false">
            <label class="field">
              <span>Name</span>
              <input type="text" placeholder="Evil Rabbit" required />
            </label>
            <label class="field">
              <span>Email</span>
              <input type="email" placeholder="john@example.com" required />
              <small>We'll never share your email with anyone.</small>
            </label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-4)">
              <label class="field">
                <span>Phone</span>
                <input type="tel" placeholder="+1 (555) 123-4567" />
              </label>
              <label class="field">
                <span>Country</span>
                <select>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </label>
            </div>
            <label class="field">
              <span>Address</span>
              <input type="text" placeholder="123 Main St" />
            </label>
            <div style="display:flex;gap:var(--spacing-2)">
              <button class="ghost">Cancel</button>
              <button>Submit</button>
            </div>
          </form>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<form>
  <label class="field">
    <span>Name</span>
    <input type="text" placeholder="Evil Rabbit" required />
  </label>

  <label class="field">
    <span>Email</span>
    <input type="email" placeholder="john@example.com" required />
    <small>We'll never share your email with anyone.</small>
  </label>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
    <label class="field">
      <span>Phone</span>
      <input type="tel" placeholder="+1 (555) 123-4567" />
    </label>
    <label class="field">
      <span>Country</span>
      <select>
        <option>United States</option>
        <option>United Kingdom</option>
        <option>Canada</option>
      </select>
    </label>
  </div>

  <label class="field">
    <span>Address</span>
    <input type="text" placeholder="123 Main St" />
  </label>

  <div>
    <button class="ghost">Cancel</button>
    <button>Submit</button>
  </div>
</form>`),
          )}
        </div>
      </div>
    `,
  })
}

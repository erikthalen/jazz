import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'default', label: 'Default' },
  { id: 'required', label: 'Required' },
  { id: 'with-textarea', label: 'With textarea' },
  { id: 'with-progress', label: 'With progress' },
  { id: 'with-slider', label: 'With slider' },
  { id: 'with-checkbox', label: 'With checkbox' },
  { id: 'with-radio', label: 'With radio' },
  { id: 'form', label: 'Form' },
]

export async function FieldPage(path: string) {
  return Layout({
    title: 'Field',
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Field</h1>
        <p class="lead">
          A <code>label.field</code> wrapper that stacks a label, any form
          control, and an optional description. Works with any input type,
          select, or progress.
        </p>

        <h2 id="default">Default</h2>
      </div>
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

      <div class="prose">
        <h2 id="required">Required</h2>
        <p>
          Add <code>required</code> to the input and a
          <code>*</code> appears automatically on the label.
        </p>
      </div>
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

      <div class="prose">
        <h2 id="with-textarea">With textarea</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Message</span>
            <textarea placeholder="Write something..."></textarea>
            <small>Max 500 characters.</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Message</span>
  <textarea placeholder="Write something..."></textarea>
  <small>Max 500 characters.</small>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-progress">With progress</h2>
      </div>
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
      <div class="prose">
        <h2 id="with-slider">With slider</h2>
      </div>
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
      <div class="prose">
        <h2 id="with-checkbox">With checkbox</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="field">
            <span>Notifications</span>
            <label><input type="checkbox" checked /> Email</label>
            <label><input type="checkbox" /> SMS</label>
            <label><input type="checkbox" /> Push</label>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Notifications</span>
  <label><input type="checkbox" checked /> Email</label>
  <label><input type="checkbox" /> SMS</label>
  <label><input type="checkbox" /> Push</label>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-radio">With radio</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="field">
            <span>Plan</span>
            <label><input type="radio" name="field-plan" checked /> Free</label>
            <label><input type="radio" name="field-plan" /> Pro</label>
            <label><input type="radio" name="field-plan" /> Enterprise</label>
            <small>You can upgrade at any time.</small>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Plan</span>
  <label><input type="radio" name="plan" checked /> Free</label>
  <label><input type="radio" name="plan" /> Pro</label>
  <label><input type="radio" name="plan" /> Enterprise</label>
  <small>You can upgrade at any time.</small>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="form">Form</h2>
      </div>
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
              <div class="field">
                <span>Country</span>
                <button type="button" class="outline" popovertarget="field-country-dropdown" style="justify-content:space-between">
                  <span>United States</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div id="field-country-dropdown" popover onchange="document.querySelector('[popovertarget='+this.id+'] span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
                  <menu>
                    <li><label><input type="radio" name="field-country" value="us" checked /> United States</label></li>
                    <li><label><input type="radio" name="field-country" value="uk" /> United Kingdom</label></li>
                    <li><label><input type="radio" name="field-country" value="ca" /> Canada</label></li>
                  </menu>
                </div>
              </div>
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
    <div class="field">
      <span>Country</span>
      <button type="button" class="outline" popovertarget="country-dropdown"
        style="justify-content:space-between">
        <span>United States</span>
        <svg><!-- chevron --></svg>
      </button>
      <div id="country-dropdown" popover
        onchange="document.querySelector(\`[popovertarget=\${this.id}] span\`).textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
        <menu>
          <li><label><input type="radio" name="country" value="us" checked /> United States</label></li>
          <li><label><input type="radio" name="country" value="uk" /> United Kingdom</label></li>
          <li><label><input type="radio" name="country" value="ca" /> Canada</label></li>
        </menu>
      </div>
    </div>
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

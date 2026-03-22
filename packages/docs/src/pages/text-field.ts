import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'text', label: 'Text' },
  { id: 'with-icon', label: 'With icon' },
]

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
const emailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
const cardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const infoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`

export async function TextFieldPage(path: string) {
  return Layout({
    title: 'Text Field',
    path,
    toc,
    content: html`
      <h1>Form</h1>
      <p class="lead">Styled native form inputs — no classes needed.</p>

      <h2 id="text">Text</h2>
      <div class="example">
        <div class="preview preview-padded">
          <input type="text" placeholder="First name" style="width:100%" />
        </div>
        <div class="code-block">
          ${raw(await highlight('<input type="text" placeholder="First name" />'))}
        </div>
      </div>

      <h2 id="with-icon">With icon</h2>
      <p>
        Wrap an input and one or more <code>&lt;svg&gt;</code> icons in a
        <code>&lt;label&gt;</code>. Icons before the input appear on the left,
        icons after appear on the right.
      </p>
      <div class="example">
        <div class="preview preview-padded" style="display:flex;flex-direction:column;gap:1rem">
          <label style="width:100%">
            ${raw(searchIcon)}
            <input type="search" placeholder="Search..." />
          </label>
          <label style="width:100%">
            ${raw(emailIcon)}
            <input type="email" placeholder="Enter your email" />
          </label>
          <label style="width:100%">
            ${raw(cardIcon)}
            <input type="text" placeholder="Card number" />
            ${raw(checkIcon)}
          </label>
          <label style="width:100%">
            <input type="text" placeholder="Card number" />
            ${raw(starIcon)}
            ${raw(infoIcon)}
          </label>
          <label style="width:100%">
            <input type="text" placeholder="Search..." />
            <kbd>⌘K</kbd>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- leading icon -->
<label>
  <svg>...</svg>
  <input type="search" placeholder="Search..." />
</label>

<!-- trailing icon -->
<label>
  <svg>...</svg>
  <input type="text" placeholder="Card number" />
  <svg>...</svg>
</label>

<!-- multiple trailing icons -->
<label>
  <input type="text" placeholder="Card number" />
  <svg>...</svg>
  <svg>...</svg>
</label>

<!-- kbd shortcut hint -->
<label>
  <input type="text" placeholder="Search..." />
  <kbd>⌘K</kbd>
</label>`),
          )}
        </div>
      </div>

    `,
  })
}

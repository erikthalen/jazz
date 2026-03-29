import { components } from '../layout'
import pkg from '../../../core/package.json'

const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${pkg.version}/jazz.css`

export function SkillPage() {
  const componentList = components
    .map(c => `- \`${c.label}\`${c.badge ? ` (${c.badge})` : ''}`)
    .join('\n')

  return `---
name: jazz
description: Teaches agents how to use the Jazz CSS design system. Use when writing HTML/CSS for a project that uses Jazz, or when asked to add UI components with Jazz.
---

# Jazz CSS Design System

Jazz is a single CSS file that styles native HTML elements directly. No class names required for most things. Link the stylesheet and write semantic HTML.

Docs: https://erikthalen.github.io/jazz/

## Setup

\`\`\`html
<link rel="stylesheet" href="${cdnUrl}" />
\`\`\`

## Core idea

Jazz styles native elements. A \`<button>\` is already a styled button. An \`<input>\` is already a styled input. No wrapper divs or base classes needed.

\`\`\`html
<button>Click me</button>
<input type="text" placeholder="Type here" />
<select><option>Option</option></select>
\`\`\`

## Layout

Jazz does not provide layout utilities. Use CSS \`flex\` and \`grid\` directly.

\`\`\`html
<div style="display:flex;gap:1rem">
  <button>Cancel</button>
  <button>Submit</button>
</div>
\`\`\`

## Button variants

\`\`\`html
<button>Primary</button>
<button class="outline">Outline</button>
<button class="ghost">Ghost</button>
<button class="secondary">Secondary</button>
<button class="destructive">Delete</button>
<button class="square">...</button>
<button class="round">Pill</button>
\`\`\`

## Button group (joined buttons or input+button)

\`\`\`html
<fieldset role="group">
  <button class="ghost">Week</button>
  <button class="ghost">Month</button>
  <button class="ghost">Year</button>
</fieldset>

<fieldset role="group">
  <input type="text" placeholder="Search" />
  <button>Go</button>
</fieldset>
\`\`\`

## Text field with adornments (icons, kbd hints)

\`\`\`html
<label>
  <svg><!-- icon --></svg>
  <input type="search" placeholder="Search" />
  <kbd>⌘K</kbd>
</label>
\`\`\`

## Field (label + input + description)

\`\`\`html
<label class="field">
  <span>Email</span>
  <input type="email" placeholder="you@example.com" />
  <small>We'll never share your email.</small>
</label>
\`\`\`

Add \`required\` to the input and a \`*\` appears on the label automatically.

## Checkbox and radio

\`\`\`html
<label>
  <input type="checkbox" />
  Enable notifications
</label>

<label>
  <input type="radio" name="size" />
  Large
</label>
\`\`\`

## Switch

\`\`\`html
<label>
  <input type="checkbox" class="switch" />
  Dark mode
</label>
\`\`\`

## Toggle (button-style checkbox/radio)

\`\`\`html
<label class="toggle">
  <input type="checkbox" />
  Bold
</label>
\`\`\`

## Select

\`\`\`html
<select>
  <option>Option A</option>
  <option>Option B</option>
</select>
\`\`\`

## Slider

\`\`\`html
<input type="range" min="0" max="100" value="50" />
\`\`\`

Note: Jazz uses a \`--pct\` CSS custom property for the fill. Set it via JS:
\`\`\`js
el.style.setProperty('--pct', (el.value - el.min) / (el.max - el.min))
el.addEventListener('input', () =>
  el.style.setProperty('--pct', (el.value - el.min) / (el.max - el.min))
)
\`\`\`

## Progress

\`\`\`html
<progress value="65" max="100"></progress>
<progress></progress>
\`\`\`

## Badge

\`\`\`html
<span class="badge">Default</span>
<span class="badge secondary">Secondary</span>
<span class="badge destructive">Error</span>
<span class="badge outline">Outline</span>
\`\`\`

## Card

\`\`\`html
<article>Content</article>

<article>
  <header>Title</header>
  <p>Body</p>
  <footer>Actions</footer>
</article>
\`\`\`

## Accordion

\`\`\`html
<details>
  <summary>Question</summary>
  <p>Answer</p>
</details>
\`\`\`

## Dialog / modal

\`\`\`html
<dialog id="my-dialog">
  <article>
    <header>Title</header>
    <p>Content</p>
    <footer>
      <button class="ghost" onclick="document.getElementById('my-dialog').close()">Cancel</button>
      <button>Confirm</button>
    </footer>
  </article>
</dialog>
<button onclick="document.getElementById('my-dialog').showModal()">Open</button>
\`\`\`

## Dropdown / popover menu

\`\`\`html
<button popovertarget="my-menu">Options</button>
<div id="my-menu" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Delete</button></li>
  </menu>
</div>
\`\`\`

## Tooltip

\`\`\`html
<button data-tooltip="Save changes">Save</button>
<button data-tooltip="Left side" data-placement="left">Info</button>
\`\`\`

## Table

\`\`\`html
<table>
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Alice</td><td>Active</td></tr>
  </tbody>
</table>
\`\`\`

## Prose (typography)

\`\`\`html
<div class="prose">
  <h1>Title</h1>
  <p>Body text with correct spacing.</p>
  <ul><li>List item</li></ul>
</div>
\`\`\`

## Textarea

\`\`\`html
<textarea placeholder="Write something..."></textarea>
\`\`\`

## Separator

\`\`\`html
<hr />
<hr data-label="or" />
\`\`\`

## Expander (truncated text with show more)

\`\`\`html
<div class="expander">
  <p>Long text that gets truncated...</p>
  <label>
    <input type="checkbox" />
    Show more
  </label>
</div>
\`\`\`

Control the number of visible lines with \`--lines\` (default: 3):
\`\`\`html
<div class="expander" style="--lines:5">...</div>
\`\`\`

## File Drop

\`\`\`html
<div class="file-drop">
  Drop files here or click to browse
  <input type="file" />
</div>
\`\`\`

## Loading indicator

Add \`aria-busy="true"\` to any element to show a spinner before it:

\`\`\`html
<p aria-busy="true">Loading...</p>
<button aria-busy="true">Saving</button>
\`\`\`

## Radio Group (fieldset with legend)

\`\`\`html
<fieldset>
  <legend>Notification preference</legend>
  <label><input type="radio" name="notif" /> Email</label>
  <label><input type="radio" name="notif" /> SMS</label>
  <small>Choose how you want to be notified.</small>
</fieldset>
\`\`\`

Add \`required\` to an input and a \`*\` appears on the legend automatically.

## Toggle Group (toolbar-style buttons)

Use \`<label class="toggle">\` inside \`<fieldset role="group">\`. Radio for mutually exclusive, checkbox for independent:

\`\`\`html
<fieldset role="group">
  <label class="toggle square" aria-label="Align left">
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align center">
    <input type="radio" name="align" checked />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align right">
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
</fieldset>
\`\`\`

## Code and Kbd

\`\`\`html
<p>Use <code>flex</code> for layout.</p>
<kbd>⌘</kbd><kbd>K</kbd>
\`\`\`

## Toast (notification)

Append children to an \`<output>\` element fixed in the corner. Each child auto-animates in and out:

\`\`\`html
<output id="toasts"></output>
\`\`\`

\`\`\`js
const p = document.createElement('p')
p.textContent = 'Saved!'
document.getElementById('toasts').appendChild(p)
\`\`\`

Control duration with \`--toast-duration\` (default: 3s).

## Color Input

\`\`\`html
<input type="color" value="#3b82f6" />
\`\`\`

## Date Input

\`\`\`html
<input type="date" />
<input type="time" />
<input type="datetime-local" />
\`\`\`

## Datalist (autocomplete input)

\`\`\`html
<input list="fruits" placeholder="Pick a fruit" />
<datalist id="fruits">
  <option value="Apple" />
  <option value="Banana" />
  <option value="Cherry" />
</datalist>
\`\`\`

## Theming

Override seed variables on \`:root\` after the stylesheet. All color scales are derived automatically via \`color-mix()\`:

\`\`\`css
:root {
  --jazz-primary: dodgerblue;               /* or light-dark(blue, lightblue) */
  --jazz-neutral: #8b8c93;
  --jazz-constructive: #5dbb55;             /* success/positive actions */
  --jazz-destructive: #ef5655;             /* danger/error actions */
  --jazz-color1: crimson;                  /* accent colors 1-6 */
  --jazz-color2: gold;
}
\`\`\`

## Dark mode

Jazz responds to \`prefers-color-scheme\` automatically (via \`color-scheme: light dark\`). To force a theme, set \`color-scheme\` on the root:

\`\`\`css
:root { color-scheme: dark; }
:root { color-scheme: light; }
\`\`\`

Or inline:

\`\`\`html
<html style="color-scheme:dark">...</html>
\`\`\`

## Spacing tokens

\`--spacing-1\` through \`--spacing-8\` (multiples of \`--spacing: 0.25em\`).

## Easing tokens

- \`--ease-glide\` — smooth deceleration, good for most transitions
- \`--ease-snap\` — fast with a slight overshoot, great for toggles
- \`--ease-heavy\` — dramatic elastic overshoot

## Available components

${componentList}
`
}

import { components } from '../layout'
import pkg from '../../../core/package.json'

const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${pkg.version}/main.css`

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
<button popovertarget="menu" style="anchor-name:--menu">Options</button>
<div id="menu" popover>
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

## Theming

\`\`\`css
:root {
  --jazz-primary-light: #4f46e5;
  --jazz-primary-dark: #818cf8;
  --jazz-neutral: #6b7280;
}
\`\`\`

## Dark mode

\`\`\`html
<html class="jazz-dark">...</html>
<html class="jazz-light">...</html>
\`\`\`

## Spacing tokens

\`--spacing-1\` through \`--spacing-8\` (multiples of \`--spacing: 0.25rem\`).

## Easing tokens

- \`--ease-glide\` — smooth deceleration, good for most transitions
- \`--ease-snap\` — fast with a slight overshoot, great for toggles
- \`--ease-heavy\` — dramatic elastic overshoot

## Available components

${componentList}
`
}

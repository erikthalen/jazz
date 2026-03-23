import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'headings', label: 'Headings' },
  { id: 'paragraphs', label: 'Paragraphs' },
  { id: 'lists', label: 'Lists' },
  { id: 'spacing', label: 'Spacing' },
]

export async function ProsePage(path: string) {
  return Layout({
    title: 'Prose',
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Prose</h1>
        <p class="lead">
          Add <code>.prose</code> to any container to give headings and paragraphs
          consistent vertical spacing.
        </p>

        <h2 id="headings">Headings</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="paragraphs">Paragraphs</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose">
          <p>
            Jazz is a minimal CSS design system. It styles native HTML elements
            directly — no class names required for most components.
          </p>
          <p>
            Drop in the stylesheet and start writing semantic HTML. The defaults
            are sensible, and everything is customizable via CSS variables.
          </p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="lists">Lists</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose">
          <p>There are a few points to note regarding this.</p>
          <ul>
            <li>It is a long established fact that a reader will be distracted by the readable content of a page.</li>
            <li>There are many variations of passages of Lorem Ipsum available.</li>
            <li>The majority have suffered alteration in some form.</li>
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>There are a few points to note.</p>
  <ul>
    <li>First item.</li>
    <li>Second item.</li>
    <li>Third item.</li>
  </ul>
</div>`),
          )}
        </div>
      </div>
      <div class="example">
        <div class="preview preview-padded prose">
          <p>Follow these steps to get started.</p>
          <ol>
            <li>Import the stylesheet into your project.</li>
            <li>Write semantic HTML as you normally would.</li>
            <li>Override CSS variables to match your brand.</li>
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>Follow these steps to get started.</p>
  <ol>
    <li>Import the stylesheet into your project.</li>
    <li>Write semantic HTML as you normally would.</li>
    <li>Override CSS variables to match your brand.</li>
  </ol>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="spacing">Spacing</h2>
        <p>
          Vertical spacing between elements is controlled by
          <code>--jazz-typography-spacing-vertical</code>, which defaults to
          <code>1rem</code>.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(`:root {
  --jazz-typography-spacing-vertical: 1.5rem;
}`, 'css'),
          )}
        </div>
      </div>
    `,
  })
}

import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'default', label: 'Default' },
  { id: 'with-filename', label: 'With filename' },
  { id: 'with-field', label: 'With field' },
]

export async function FileDropPage(path: string) {
  return Layout({
    title: 'File Drop',
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>File Drop</h1>
        <p class="lead">
          A styled file input drop zone using <code>label.file-drop</code>.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="file-drop" style="width:100%">
            <input type="file" />
            Drag files here or choose from folder
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="file-drop">
  <input type="file" />
  Drag files here or choose from folder
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-filename">With filename</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="file-drop" style="width:100%">
            <input type="file" onchange="this.nextElementSibling.textContent = this.files[0]?.name ?? 'Drag files here or choose from folder'" />
            <span>Drag files here or choose from folder</span>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="file-drop">
  <input type="file"
    onchange="this.nextElementSibling.textContent =
      this.files[0]?.name ?? 'Drag files here or choose from folder'" />
  <span>Drag files here or choose from folder</span>
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-field">With field</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="field" style="width:100%">
            <span>Attachment</span>
            <label class="file-drop">
              <input type="file" />
              Drag files here or choose from folder
            </label>
            <small>Max 10 MB.</small>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Attachment</span>
  <label class="file-drop">
    <input type="file" />
    Drag files here or choose from folder
  </label>
  <small>Max 10 MB.</small>
</div>`),
          )}
        </div>
      </div>
    `,
  })
}

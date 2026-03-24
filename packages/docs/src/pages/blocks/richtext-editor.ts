import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

export async function RichtextEditorPage(path: string) {
  return Layout({
    title: "Richtext Editor",
    path,
    content: html`
      <div class="prose">
        <h1>Richtext Editor</h1>
        <p class="lead">
          A document editor toolbar composed from Button Group, Select, and
          ghost icon buttons.
        </p>
      </div>

      <div class="example">
      <div class="preview">
      <section style="max-width:500px">
        <!-- Block type -->
        <button
          class="outline"
          id="rte-format-btn"
          popovertarget="rte-format-menu"
          style="justify-content:space-between;min-width:8rem"
        >
          <span>Paragraph</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div id="rte-format-menu" popover onchange="document.getElementById('rte-format-btn').querySelector('span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
          <menu>
            <li>
              <label
                ><input
                  type="radio"
                  name="rte-block"
                  value="p"
                  checked
                />Paragraph</label
              >
            </li>
            <li>
              <label
                ><input type="radio" name="rte-block" value="h1" />Heading
                1</label
              >
            </li>
            <li>
              <label
                ><input type="radio" name="rte-block" value="h2" />Heading
                2</label
              >
            </li>
            <li>
              <label
                ><input type="radio" name="rte-block" value="h3" />Heading
                3</label
              >
            </li>
            <li>
              <label
                ><input
                  type="radio"
                  name="rte-block"
                  value="blockquote"
                />Blockquote</label
              >
            </li>
          </menu>
        </div>

        <!-- Formatting -->
        <fieldset role="group">
          <label class="toggle square" title="Bold">
            <input type="checkbox" /><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-bold"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7" />
              <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
            </svg>
          </label>
          <label class="toggle square" title="Italic">
            <input type="checkbox" /><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-italic"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 5l6 0" />
              <path d="M7 19l6 0" />
              <path d="M14 5l-4 14" />
            </svg>
          </label>
          <label class="toggle square" title="Underline">
            <input type="checkbox" /><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-underline"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 5v5a5 5 0 0 0 10 0v-5" />
              <path d="M5 19h14" />
            </svg>
          </label>
          <label class="toggle square" title="Strikethrough">
            <input type="checkbox" /><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-strikethrough"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path
                d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"
              />
            </svg>
          </label>
        </fieldset>

        <!-- Insert -->
        <fieldset role="group">
          <button class="ghost square" title="Image" onclick="document.getElementById('rte-image-dialog').showModal()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-photo"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path
                d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12"
              />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
            </svg>
          </button>
          <button class="ghost square" title="Blockquote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-quote"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"
              />
              <path
                d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"
              />
            </svg>
          </button>
          <button class="ghost square" title="Inline code">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-code"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 8l-4 4l4 4" />
              <path d="M17 8l4 4l-4 4" />
              <path d="M14 4l-4 16" />
            </svg>
          </button>
        </fieldset>

        <!-- Alignment & lists -->
        <fieldset role="group">
          <button
            class="ghost square"
            title="Text alignment"
            id="rte-align-btn"
            popovertarget="rte-align-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l10 0" />
              <path d="M4 18l14 0" />
            </svg>
          </button>
          <button class="ghost square" title="Bullet list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-list"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M21 6a1 1 0 0 1 -1 1h-10a1 1 0 1 1 0 -2h10a1 1 0 0 1 1 1"
              />
              <path
                d="M21 12a1 1 0 0 1 -1 1h-10a1 1 0 0 1 0 -2h10a1 1 0 0 1 1 1"
              />
              <path
                d="M21 18a1 1 0 0 1 -1 1h-10a1 1 0 0 1 0 -2h10a1 1 0 0 1 1 1"
              />
              <path
                d="M7 5.995v.02c0 1.099 -.895 1.99 -2 1.99s-2 -.891 -2 -1.99v-.02c0 -1.099 .895 -1.99 2 -1.99s2 .891 2 1.99"
              />
              <path
                d="M7 11.995v.02c0 1.099 -.895 1.99 -2 1.99s-2 -.891 -2 -1.99v-.02c0 -1.099 .895 -1.99 2 -1.99s2 .891 2 1.99"
              />
              <path
                d="M7 17.995v.02c0 1.099 -.895 1.99 -2 1.99s-2 -.891 -2 -1.99v-.02c0 -1.099 .895 -1.99 2 -1.99s2 .891 2 1.99"
              />
            </svg>
          </button>
          <button class="ghost square" title="Numbered list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-list-numbers"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 6h9" />
              <path d="M11 12h9" />
              <path d="M12 18h8" />
              <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
              <path d="M6 10v-6l-2 2" />
            </svg>
          </button>
        </fieldset>
        <div id="rte-align-menu" popover>
          <menu>
            <li>
              <label>
                <input
                  type="radio"
                  name="rte-align"
                  value="justifyLeft"
                  checked
                />
                <span style="display:flex;align-items:center;gap:0.5rem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M4 12l10 0" />
                    <path d="M4 18l14 0" />
                  </svg>
                  Align left
                </span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="rte-align" value="justifyCenter" />
                <span style="display:flex;align-items:center;gap:0.5rem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M8 12l8 0" />
                    <path d="M6 18l12 0" />
                  </svg>
                  Align center
                </span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="rte-align" value="justifyRight" />
                <span style="display:flex;align-items:center;gap:0.5rem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M14 12l6 0" />
                    <path d="M6 18l14 0" />
                  </svg>
                  Align right
                </span>
              </label>
            </li>
          </menu>
        </div>

        <textarea style="margin-top:var(--spacing-3)"></textarea>
      </section>
      </div>
      <div class="code-block">
        ${raw(await highlight(`<!-- Block type dropdown -->
<button class="outline" id="format-btn" popovertarget="format-menu">
  <span>Paragraph</span> <svg>...</svg>
</button>
<div id="format-menu" popover onchange="document.getElementById('format-btn').querySelector('span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
  <menu>
    <li><label><input type="radio" name="block" value="p" checked />Paragraph</label></li>
    <li><label><input type="radio" name="block" value="h1" />Heading 1</label></li>
    <li><label><input type="radio" name="block" value="h2" />Heading 2</label></li>
    <li><label><input type="radio" name="block" value="h3" />Heading 3</label></li>
    <li><label><input type="radio" name="block" value="blockquote" />Blockquote</label></li>
  </menu>
</div>

<!-- Formatting toggles -->
<fieldset role="group">
  <label class="toggle square" title="Bold"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Italic"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Underline"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Strikethrough"><input type="checkbox" /><svg>...</svg></label>
</fieldset>

<!-- Insert -->
<fieldset role="group">
  <button class="ghost square" title="Image" onclick="document.getElementById('image-dialog').showModal()"><svg>...</svg></button>
  <button class="ghost square" title="Blockquote"><svg>...</svg></button>
  <button class="ghost square" title="Inline code"><svg>...</svg></button>
</fieldset>

<!-- Alignment & lists -->
<fieldset role="group">
  <button class="ghost square" title="Text alignment" popovertarget="align-menu"><svg>...</svg></button>
  <button class="ghost square" title="Bullet list"><svg>...</svg></button>
  <button class="ghost square" title="Numbered list"><svg>...</svg></button>
</fieldset>
<div id="align-menu" popover>
  <menu>
    <li><label><input type="radio" name="align" value="justifyLeft" checked /><svg>...</svg> Align left</label></li>
    <li><label><input type="radio" name="align" value="justifyCenter" /><svg>...</svg> Align center</label></li>
    <li><label><input type="radio" name="align" value="justifyRight" /><svg>...</svg> Align right</label></li>
  </menu>
</div>

<textarea></textarea>

<!-- Insert image dialog -->
<dialog id="image-dialog" closedby="any">
  <article>
    <header><h3>Insert image</h3></header>
    <form id="image-form" method="dialog">
      <label class="file-drop">
        <input type="file" accept="image/*" />
        <span>Drag image here or choose from folder</span>
      </label>
    </form>
    <footer>
      <button type="button" class="outline">Cancel</button>
      <button type="submit" form="image-form">Insert</button>
    </footer>
  </article>
</dialog>`, 120))}
      </div>
      </div>
      <dialog id="rte-image-dialog" closedby="any">
        <article>
          <header>
            <h3>Insert image</h3>
          </header>
          <form
            id="rte-image-form"
            method="dialog"
            onsubmit="const file=this.querySelector('input[type=file]').files[0];if(file){const url=URL.createObjectURL(file);document.getElementById('rte-body').focus();document.execCommand('insertImage',false,url)}"
          >
            <label class="file-drop">
              <input type="file" accept="image/*" />
              <span>Drag image here or choose from folder</span>
            </label>
          </form>
          <footer style="display:flex;gap:var(--spacing-2);justify-content:flex-end">
            <button type="button" class="outline" onclick="document.getElementById('rte-image-dialog').close()">Cancel</button>
            <button type="submit" form="rte-image-form">Insert</button>
          </footer>
        </article>
      </dialog>
    `,
  });
}

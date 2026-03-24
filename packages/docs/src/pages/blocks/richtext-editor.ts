import { html } from "hono/html";
import { Layout } from "../../layout";

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

      <article style="margin-top:var(--spacing-6);overflow:visible">
        <!-- Toolbar -->
        <header
          style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-1);padding:var(--spacing-2) var(--spacing-3)"
        >
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
          <div
            id="rte-format-menu"
            popover
            onchange="document.getElementById('rte-format-btn').querySelector('span').textContent=event.target.closest('label').textContent.trim();this.hidePopover();document.getElementById('rte-body').focus();document.execCommand('formatBlock',false,event.target.value)"
          >
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
            <label
              class="toggle ghost"
              title="Bold"
              onmousedown="event.preventDefault();document.execCommand('bold')"
            >
              <input type="checkbox" /><svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
            <label
              class="toggle ghost"
              title="Italic"
              style="font-style:italic"
              onmousedown="event.preventDefault();document.execCommand('italic')"
            >
              <input type="checkbox" /><svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
            <label
              class="toggle ghost"
              title="Underline"
              onmousedown="event.preventDefault();document.execCommand('underline')"
            >
              <input type="checkbox" /><svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
            <label
              class="toggle ghost"
              title="Strikethrough"
              onmousedown="event.preventDefault();document.execCommand('strikeThrough')"
            >
              <input type="checkbox" /><svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
            <button class="ghost square" title="Image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </button>
            <button
              class="ghost square"
              title="Blockquote"
              onmousedown="event.preventDefault();document.execCommand('formatBlock',false,'blockquote')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                />
              </svg>
            </button>
            <button class="ghost square" title="Inline code">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </button>
          </fieldset>

          <!-- Alignment & lists -->
          <fieldset role="group">
            <button
              class="ghost square"
              title="Align left"
              onmousedown="event.preventDefault();document.execCommand('justifyLeft')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="15" x2="3" y1="12" y2="12" />
                <line x1="17" x2="3" y1="18" y2="18" />
              </svg>
            </button>
            <button
              class="ghost square"
              title="Bullet list"
              onmousedown="event.preventDefault();document.execCommand('insertUnorderedList')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="9" x2="21" y1="6" y2="6" />
                <line x1="9" x2="21" y1="12" y2="12" />
                <line x1="9" x2="21" y1="18" y2="18" />
                <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
                <circle
                  cx="4"
                  cy="12"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
                <circle
                  cx="4"
                  cy="18"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </button>
            <button
              class="ghost square"
              title="Numbered list"
              onmousedown="event.preventDefault();document.execCommand('insertOrderedList')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="10" x2="21" y1="6" y2="6" />
                <line x1="10" x2="21" y1="12" y2="12" />
                <line x1="10" x2="21" y1="18" y2="18" />
                <path d="M4 6h1v4" />
                <path d="M4 10h2" />
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
              </svg>
            </button>
          </fieldset>
        </header>

        <!-- Editor body -->
        <div
          id="rte-body"
          contenteditable="true"
          style="outline:none;min-height:240px;line-height:1.7"
        >
          <p>
            Start typing here, or select any text and use the toolbar to apply
            formatting.
          </p>
        </div>

        <!-- Status bar -->
        <footer style="padding:var(--spacing-2) var(--spacing-4)">
          <small id="rte-status" style="color:var(--jazz-neutral-400)">P</small>
        </footer>
      </article>

      <script>
        document.addEventListener("selectionchange", () => {
          const sel = window.getSelection();
          if (!sel?.rangeCount) return;
          const node = sel.getRangeAt(0).startContainer;
          const el = node.nodeType === 3 ? node.parentElement : node;
          const body = document.getElementById("rte-body");
          if (!body?.contains(el)) return;
          const block = [...body.children].find((c) => c.contains(el)) || el;
          const tag = block?.tagName?.toLowerCase() || "p";
          document.getElementById("rte-status").textContent = tag.toUpperCase();
          const labels = {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            blockquote: "Blockquote",
          };
          const btn = document
            .getElementById("rte-format-btn")
            ?.querySelector("span");
          if (btn && labels[tag]) btn.textContent = labels[tag];
          const radio = document.querySelector(
            '#rte-format-menu [value="' + tag + '"]',
          );
          if (radio) radio.checked = true;
        });
      </script>
    `,
  });
}

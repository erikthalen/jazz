import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "mixed", label: "Mixed" },
  { id: "with-input", label: "With input" },
  { id: "quantity", label: "Quantity" },
];

export async function ButtonGroupPage(path: string) {
  return Layout({
    title: "Button Group",
    path,
    toc,
    content: html`
      <h1>Button Group</h1>
      <p class="lead">
        Group related actions using <code>&lt;button&gt;</code>s inside a
        <code>&lt;fieldset role="group"&gt;</code>.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
</fieldset>`),
          )}
        </div>
      </div>

      <h2 id="mixed">Mixed</h2>
      <p>Combine icon buttons and labeled buttons in the same group.</p>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button
              class="ghost square"
              aria-label="Back"
              data-tooltip="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
            <button
              class="ghost square"
              aria-label="More"
              popovertarget="mixed-more-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>
          </fieldset>
          <div id="mixed-more-menu" popover>
            <menu>
              <li><button class="ghost">Move to folder</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Export</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost square" aria-label="Back" data-tooltip="Go back">←</button>
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
  <button
    class="ghost square"
    aria-label="More"
    popovertarget="more-menu"
  >···</button>
</fieldset>

<div id="more-menu" popover>
  <menu>
    <li><button class="ghost">Move to folder</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Export</button></li>
    <li><hr></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <h2 id="with-input">With input</h2>
      <p>Inputs stretch to fill the available space.</p>
      <div class="example">
        <div class="preview">
          <fieldset role="group" style="width:320px">
            <input type="text" placeholder="Search..." />
            <button class="ghost square" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <input type="text" placeholder="Search..." />
  <button class="ghost square" aria-label="Search">
    …
  </button>
</fieldset>`),
          )}
        </div>
      </div>
      <h2 id="quantity">Quantity</h2>
      <p>A number input paired with increment and decrement buttons.</p>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <input type="number" value="8" min="0" style="width:4rem" />
            <button
              class="ghost square"
              aria-label="Decrement"
              onclick="this.closest('fieldset').firstElementChild.stepDown()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              class="ghost square"
              aria-label="Increment"
              onclick="this.closest('fieldset').firstElementChild.stepUp()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14M12 5v14" />
              </svg>
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <input type="number" value="8" min="0" style="width:4rem" />
  <button class="ghost square" aria-label="Decrement"
    onclick="this.closest('fieldset').firstElementChild.stepDown()">
    −
  </button>
  <button class="ghost square" aria-label="Increment"
    onclick="this.closest('fieldset').firstElementChild.stepUp()">
    +
  </button>
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}

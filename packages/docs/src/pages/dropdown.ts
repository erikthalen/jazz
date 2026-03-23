import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-separator", label: "With separator" },
  { id: "with-radios", label: "With radios" },
  { id: "custom-select", label: "Custom select" },
  { id: "in-form", label: "In a form" },
];

export async function DropdownPage(path: string) {
  return Layout({
    title: "Dropdown",
    path,
    toc,
    content: html`
      <h1>Dropdown</h1>
      <p class="lead">
        A menu of actions anchored to a trigger, built with the native
        <code>popover</code> API and a <code>&lt;menu&gt;</code>.
      </p>

      <h2 id="default">Default</h2>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="dropdown-default">
            Actions
          </button>
          <div id="dropdown-default" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><button class="ghost">Archive</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Actions</button>

<div id="my-dropdown" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><button class="ghost">Archive</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <h2 id="with-separator">With separator</h2>
      <p>
        Use an <code>&lt;hr&gt;</code> inside a <code>&lt;li&gt;</code> to
        visually group actions.
      </p>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="dropdown-separator">
            Actions
          </button>
          <div id="dropdown-separator" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Actions</button>

<div id="my-dropdown" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <h2 id="with-radios">With radios</h2>
      <p>
        Radio inputs work naturally inside a dropdown — the checked state is
        preserved between opens and a checkmark appears via CSS. The popover
        stays open so the user can see their selection before dismissing.
      </p>
      <div class="example">
        <div class="preview">
          <button class="outline" popovertarget="dropdown-radios">
            Sort by
          </button>
          <div id="dropdown-radios" popover>
            <menu>
              <li>
                <label
                  ><input type="radio" name="sort" value="newest" checked />
                  Newest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="oldest" />
                  Oldest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="name" /> Name</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="size" /> Size</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Sort by</button>

<div id="my-dropdown" popover>
  <menu>
    <li><label>
      <input type="radio" name="sort" value="newest" checked /> Newest
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="oldest" /> Oldest
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="name" /> Name
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="size" /> Size
    </label></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <h2 id="custom-select">Custom select</h2>
      <p>
        Use radio inputs inside <code>&lt;label&gt;</code>s to build a styled
        select. A checkmark appears on the chosen option via CSS. A small script
        updates the trigger text and closes the dropdown on pick.
      </p>
      <div class="example">
        <div class="preview">
          <button
            class="outline"
            id="select-trigger"
            popovertarget="select-dropdown"
            style="min-width: 10rem; justify-content: space-between"
          >
            <span>Choose a fruit</span>
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
            id="select-dropdown"
            popover
            onchange="document.querySelector('[popovertarget='+this.id+'] span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()"
          >
            <menu>
              <li>
                <label
                  ><input type="radio" name="fruit" value="apple" />
                  Apple</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="banana" />
                  Banana</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="cherry" />
                  Cherry</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="mango" />
                  Mango</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button
  popovertarget="my-select"
  style="min-width: 10rem; justify-content: space-between"
>
  <span>Choose a fruit</span>
  <svg><!-- chevron --></svg>
</button>

<div id="my-select" popover
  onchange="document.querySelector(\`[popovertarget=\${this.id}] span\`).textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
  <menu>
    <li><label>
      <input type="radio" name="fruit" /> Apple
    </label></li>
    <li><label>
      <input type="radio" name="fruit" /> Banana
    </label></li>
    <li><label>
      <input type="radio" name="fruit" /> Cherry
    </label></li>
  </menu>
</div>`),
          )}
        </div>
      </div>
      <h2 id="in-form">In a form</h2>
      <p>
        Wrap the trigger and popover in a <code>&lt;form&gt;</code> to
        participate in form submission. The <code>change</code> event bubbles up
        so you can handle it on the form.
      </p>
      <div class="example">
        <div class="preview">
          <form onchange="alert('Selected: ' + event.target.value)">
            <button
              type="button"
              class="outline"
              popovertarget="form-select-dropdown"
              style="min-width: 10rem; justify-content: space-between"
            >
              <span>Choose a color</span>
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
              id="form-select-dropdown"
              popover
              onchange="document.querySelector('[popovertarget='+this.id+'] span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()"
            >
              <menu>
                <li>
                  <label
                    ><input type="radio" name="color" value="red" /> Red</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="color" value="green" />
                    Green</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="color" value="blue" />
                    Blue</label
                  >
                </li>
              </menu>
            </div>
          </form>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<form onchange="alert('Selected: ' + event.target.value)">
  <button type="button" popovertarget="my-select"
    style="min-width: 10rem; justify-content: space-between">
    <span>Choose a color</span>
    <svg><!-- chevron --></svg>
  </button>
  <div id="my-select" popover
    onchange="document.querySelector(\`[popovertarget=\${this.id}] span\`).textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
    <menu>
      <li><label>
        <input type="radio" name="color" value="red" /> Red
      </label></li>
      <li><label>
        <input type="radio" name="color" value="green" /> Green
      </label></li>
      <li><label>
        <input type="radio" name="color" value="blue" /> Blue
      </label></li>
    </menu>
  </div>
</form>`),
          )}
        </div>
      </div>
    `,
  });
}

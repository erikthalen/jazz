import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "in-a-field", label: "In a field" },
];

export async function ComboboxPage(path: string) {
  return Layout({
    title: "Combobox",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Combobox <sup class="badge">WIP</sup></h1>
          <p>
            A searchable dropdown built from a text input and the native Popover
            API. CSS handles all visual presentation; a small inline script
            filters the list and wires up selection.
          </p>
        </hgroup>
        <p>
          Each <code>anchor-name</code> must be unique per combobox on the page.
          Set it via an inline style and reference the same value as
          <code>position-anchor</code> on the popover.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div class="combobox" style="width: 14rem">
            <input
              type="search"
              placeholder="Search fruits..."
              style="anchor-name: --combobox-demo"
              onfocus="setTimeout(()=>!this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.showPopover())"
              oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))"
            />
            <div
              popover
              style="position-anchor: --combobox-demo"
              onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();setTimeout(()=>this.hidePopover())}"
            >
              <menu>
                <li><button class="ghost">Apple</button></li>
                <li><button class="ghost">Banana</button></li>
                <li><button class="ghost">Cherry</button></li>
                <li><button class="ghost">Mango</button></li>
                <li><button class="ghost">Pineapple</button></li>
              </menu>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="combobox">
  <input type="search" placeholder="Search fruits..."
    style="anchor-name: --my-combobox"
    onfocus="setTimeout(()=>!this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.showPopover())"
    oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))">
  <div popover style="position-anchor: --my-combobox"
    onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();setTimeout(()=>this.hidePopover())}">
    <menu>
      <li><button class="ghost">Apple</button></li>
      <li><button class="ghost">Banana</button></li>
      <li><button class="ghost">Cherry</button></li>
      <li><button class="ghost">Mango</button></li>
      <li><button class="ghost">Pineapple</button></li>
    </menu>
  </div>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-a-field">In a field</h2>
        <p>Wrap with a <code>&lt;label&gt;</code> to attach a visible label.</p>
      </div>
      <div class="example">
        <div class="preview">
          <label>
            Favourite fruit
            <div class="combobox">
              <input
                type="search"
                placeholder="Search..."
                style="anchor-name: --combobox-field-demo"
                onfocus="setTimeout(()=>!this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.showPopover())"
                oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))"
              />
              <div
                popover
                style="position-anchor: --combobox-field-demo"
                onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();setTimeout(()=>this.hidePopover())}"
              >
                <menu>
                  <li><button class="ghost">Apple</button></li>
                  <li><button class="ghost">Banana</button></li>
                  <li><button class="ghost">Cherry</button></li>
                  <li><button class="ghost">Mango</button></li>
                  <li><button class="ghost">Pineapple</button></li>
                </menu>
              </div>
            </div>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  Favourite fruit
  <div class="combobox">
    <input type="search" placeholder="Search..."
      style="anchor-name: --my-combobox"
      onfocus="setTimeout(()=>!this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.showPopover())"
      oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))">
    <div popover style="position-anchor: --my-combobox"
      onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();setTimeout(()=>this.hidePopover())}">
      <menu>
        <li><button class="ghost">Apple</button></li>
        <li><button class="ghost">Banana</button></li>
        <li><button class="ghost">Cherry</button></li>
      </menu>
    </div>
  </div>
</label>`),
          )}
        </div>
      </div>
    `,
  });
}

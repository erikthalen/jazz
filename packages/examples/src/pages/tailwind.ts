import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const tailwindHead = `<script type="module">import '/src/tailwind.css'</script>`;

export async function TailwindPage(path: string) {
  return Layout({
    title: "Jazz + Tailwind",
    path,
    extraHead: tailwindHead,
    content: html`
      <div class="prose" style="max-width:640px;margin-bottom:3rem">
        <h1>Jazz + Tailwind</h1>
        <p>
          Jazz and Tailwind complement each other well. Jazz handles component
          styles (buttons, inputs, cards, etc.) by styling native HTML elements
          directly. Tailwind handles layout, spacing, and one-off utilities.
          There is no conflict because Jazz uses
          <code>@layer jazz {}</code> for all its styles, so any Tailwind class
          wins automatically without needing <code>!</code> overrides.
        </p>
      </div>

      <div class="prose" style="max-width:640px;margin-bottom:2rem">
        <h2>Setup</h2>
        <p>
          Include both stylesheets. Order does not matter due to
          <code>@layer</code>.
        </p>
      </div>

      <div class="example-section">
        <div class="code-block">
          ${raw(
            await highlight(
              `<link rel="stylesheet" href="https://esm.sh/gh/erikthalen/jazz/jazz.css" />
<script src="https://cdn.tailwindcss.com"></script>`,
            ),
          )}
        </div>
      </div>

      <div class="prose" style="max-width:640px;margin:2rem 0 2rem">
        <h2>Layout with Tailwind, components with Jazz</h2>
        <p>
          Use Tailwind's grid and spacing utilities for structure, and let Jazz
          style the form controls automatically.
        </p>
      </div>

      <div class="example-section">
        <div class="preview">
          <div class="grid grid-cols-1 gap-6 w-full max-w-lg">
            <label class="field">
              <span>Full name</span>
              <input type="text" placeholder="Ada Lovelace" />
            </label>
            <div class="grid grid-cols-2 gap-4">
              <label class="field">
                <span>Email</span>
                <input type="email" placeholder="ada@example.com" />
              </label>
              <label class="field">
                <span>Phone</span>
                <input type="tel" placeholder="+1 555 000 000" />
              </label>
            </div>
            <label class="field">
              <span>Message</span>
              <textarea placeholder="How can we help?" rows="3"></textarea>
            </label>
            <div class="flex justify-end gap-3">
              <button class="ghost">Cancel</button>
              <button>Send message</button>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="grid grid-cols-1 gap-6 w-full max-w-lg">
  <label class="field">
    <span>Full name</span>
    <input type="text" placeholder="Ada Lovelace" />
  </label>

  <div class="grid grid-cols-2 gap-4">
    <label class="field">
      <span>Email</span>
      <input type="email" placeholder="ada@example.com" />
    </label>
    <label class="field">
      <span>Phone</span>
      <input type="tel" placeholder="+1 555 000 000" />
    </label>
  </div>

  <label class="field">
    <span>Message</span>
    <textarea placeholder="How can we help?" rows="3"></textarea>
  </label>

  <div class="flex justify-end gap-3">
    <button class="ghost">Cancel</button>
    <button>Send message</button>
  </div>
</div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose" style="max-width:640px;margin:2rem 0 2rem">
        <h2>Tailwind for card layout</h2>
        <p>
          Jazz styles <code>&lt;article&gt;</code> as a card automatically.
          Tailwind can control padding, width, and grid placement.
        </p>
      </div>

      <div class="example-section">
        <div class="preview">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <article class="flex flex-col gap-3 p-5">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-500">Total Revenue</span>
                <span class="badge secondary">+12%</span>
              </div>
              <p class="text-2xl font-bold m-0">$48,295</p>
              <p class="text-sm text-neutral-500 m-0">vs last month</p>
            </article>
            <article class="flex flex-col gap-3 p-5">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-500">Active Users</span>
                <span class="badge">+5%</span>
              </div>
              <p class="text-2xl font-bold m-0">2,841</p>
              <p class="text-sm text-neutral-500 m-0">vs last month</p>
            </article>
            <article class="flex flex-col gap-3 p-5">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-500">Open Issues</span>
                <span class="badge destructive">+3</span>
              </div>
              <p class="text-2xl font-bold m-0">17</p>
              <p class="text-sm text-neutral-500 m-0">vs last month</p>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
  <article class="flex flex-col gap-3 p-5">
    <div class="flex items-center justify-between">
      <span class="text-sm text-neutral-500">Total Revenue</span>
      <span class="badge secondary">+12%</span>
    </div>
    <p class="text-2xl font-bold m-0">$48,295</p>
    <p class="text-sm text-neutral-500 m-0">vs last month</p>
  </article>

  <article class="flex flex-col gap-3 p-5">
    <div class="flex items-center justify-between">
      <span class="text-sm text-neutral-500">Active Users</span>
      <span class="badge">+5%</span>
    </div>
    <p class="text-2xl font-bold m-0">2,841</p>
    <p class="text-sm text-neutral-500 m-0">vs last month</p>
  </article>

  <article class="flex flex-col gap-3 p-5">
    <div class="flex items-center justify-between">
      <span class="text-sm text-neutral-500">Open Issues</span>
      <span class="badge destructive">+3</span>
    </div>
    <p class="text-2xl font-bold m-0">17</p>
    <p class="text-sm text-neutral-500 m-0">vs last month</p>
  </article>
</div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose" style="max-width:640px;margin:2rem 0 2rem">
        <h2>Overriding Jazz with Tailwind</h2>
        <p>
          Because Jazz styles live inside <code>@layer jazz {}</code>, any
          Tailwind utility class wins without needing <code>!</code>. Here a
          button gets a custom background color from Tailwind.
        </p>
      </div>

      <div class="example-section">
        <div class="preview flex flex-wrap gap-3 justify-center">
          <button>Jazz default</button>
          <button class="bg-violet-600 hover:bg-violet-700">
            Tailwind color
          </button>
          <button class="rounded-none">No radius</button>
          <button class="text-xs px-2 py-1">Custom size</button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<!-- Jazz default -->
<button>Jazz default</button>

<!-- Override background with Tailwind — no !important needed -->
<button class="bg-violet-600 hover:bg-violet-700">Tailwind color</button>

<!-- Remove border-radius -->
<button class="rounded-none">No radius</button>

<!-- Custom padding and font size -->
<button class="text-xs px-2 py-1">Custom size</button>`,
            ),
          )}
        </div>
      </div>

      <div class="prose" style="max-width:640px;margin:2rem 0 2rem">
        <h2>Tailwind responsive layout with Jazz navigation</h2>
        <p>
          A typical app shell: Tailwind handles the two-column layout and
          breakpoints, Jazz handles the menu and button styles.
        </p>
      </div>

      <div class="example-section">
        <div class="preview" style="padding:0;align-items:stretch;min-height:300px">
          <div class="flex w-full h-full min-h-[300px]">
            <aside
              class="hidden sm:block w-48 shrink-0 border-r border-neutral-200 py-3 px-2"
            >
              <menu>
                <li><a class="button ghost" href="#" aria-current="page">Dashboard</a></li>
                <li><a class="button ghost" href="#">Projects</a></li>
                <li><a class="button ghost" href="#">Team</a></li>
                <li><a class="button ghost" href="#">Settings</a></li>
              </menu>
            </aside>
            <main class="flex-1 p-6 flex flex-col gap-4">
              <h3 class="m-0 text-base font-semibold">Dashboard</h3>
              <div class="grid grid-cols-2 gap-3">
                <article class="p-4">
                  <p class="text-xs text-neutral-500 m-0 mb-1">Tasks</p>
                  <p class="text-xl font-bold m-0">24</p>
                </article>
                <article class="p-4">
                  <p class="text-xs text-neutral-500 m-0 mb-1">Done</p>
                  <p class="text-xl font-bold m-0">18</p>
                </article>
              </div>
              <progress value="75" max="100"></progress>
            </main>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="flex w-full">
  <!-- Tailwind hides sidebar on mobile -->
  <aside class="hidden sm:block w-48 shrink-0 border-r border-neutral-200 py-3 px-2">
    <menu>
      <li><a class="button ghost" href="#" aria-current="page">Dashboard</a></li>
      <li><a class="button ghost" href="#">Projects</a></li>
      <li><a class="button ghost" href="#">Team</a></li>
      <li><a class="button ghost" href="#">Settings</a></li>
    </menu>
  </aside>

  <main class="flex-1 p-6 flex flex-col gap-4">
    <h3 class="m-0 text-base font-semibold">Dashboard</h3>
    <div class="grid grid-cols-2 gap-3">
      <article class="p-4">
        <p class="text-xs text-neutral-500 m-0 mb-1">Tasks</p>
        <p class="text-xl font-bold m-0">24</p>
      </article>
      <article class="p-4">
        <p class="text-xs text-neutral-500 m-0 mb-1">Done</p>
        <p class="text-xl font-bold m-0">18</p>
      </article>
    </div>
    <progress value="75" max="100"></progress>
  </main>
</div>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}

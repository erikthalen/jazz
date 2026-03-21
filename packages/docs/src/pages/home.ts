import { html, raw } from 'hono/html'
import { HomeLayout, url } from '../layout'
import { highlight } from '../highlight'
import pkg from '../../../core/package.json'

const cdnUrl = `https://esm.sh/gh/erikthalen/jazz@v${pkg.version}/main.css`

export async function HomePage(path: string) {
  return HomeLayout({
    title: 'Jazz',
    path,
    content: html`
      <section class="home-hero">
        <div class="home-hero-inner">
          <h1 class="home-headline">Write HTML.<br />Jazz handles the rest.</h1>
          <p class="home-sub">
            A CSS reset and UI library in one. Drop it in and get
            sensible defaults for native elements, a full component
            library, and a theming system.
          </p>
          <div class="home-cta">
            <a href="${url('/introduction')}" class="button">Get started</a>
            <a href="${url('/components/button')}" class="button outline">Components</a>
          </div>
          <div class="home-eyebrow code-block">
            ${raw(await highlight(`<link rel="stylesheet" href="${cdnUrl}" />`, 'html'))}
          </div>
        </div>
      </section>

      <section class="home-showcase" style="--jazz-primary: #111;">
        <div class="showcase-cell">
          <button>Primary</button>
          <button class="outline">Outline</button>
          <button class="ghost">Ghost</button>
        </div>

        <div class="showcase-cell">
          <label style="width:100%">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" placeholder="Search..." />
            <kbd>⌘K</kbd>
          </label>
        </div>

        <div class="showcase-cell">
          <fieldset role="group">
            <button class="ghost">Week</button>
            <button class="ghost">Month</button>
            <button class="ghost">Year</button>
          </fieldset>
        </div>

        <div class="showcase-cell">
          <div style="display:flex;">
            <fieldset role="group">
              <button class="ghost square" aria-label="Align left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
              </button>
              <button class="ghost square" aria-label="Align center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
              </button>
              <button class="ghost square" aria-label="Align right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
              </button>
            </fieldset>
            <fieldset role="group">
              <button class="ghost square" aria-label="Bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
              </button>
              <button class="ghost square" aria-label="Italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
              </button>
              <button class="ghost square" aria-label="Underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
              </button>
            </fieldset>
          </div>
        </div>

        <div class="showcase-cell">
          <label><input type="checkbox" checked /> Notifications</label>
          <label><input type="checkbox" /> Dark mode</label>
          <label><input type="checkbox" checked /> Auto-save</label>
        </div>

        <div class="showcase-cell">
          <input type="range" value="60" style="width:100%" />
        </div>

        <div class="showcase-cell">
          <label style="display:flex;align-items:center;gap:0.75rem;width:100%;justify-content:space-between">
            Wi-Fi <input type="checkbox" class="switch" checked />
          </label>
          <label style="display:flex;align-items:center;gap:0.75rem;width:100%;justify-content:space-between">
            Bluetooth <input type="checkbox" class="switch" />
          </label>
        </div>

        <div class="showcase-cell showcase-cell--tall showcase-cell--wide" style="gap:0">
          <details open>
            <summary>Account</summary>
            <p style="padding:0.5rem 0;color:var(--jazz-neutral-500);font-size:0.875rem">Manage your account settings and preferences.</p>
          </details>
          <details>
            <summary>Privacy</summary>
            <p style="padding:0.5rem 0;color:var(--jazz-neutral-500);font-size:0.875rem">Control who can see your data and activity.</p>
          </details>
          <details>
            <summary>Notifications</summary>
            <p style="padding:0.5rem 0;color:var(--jazz-neutral-500);font-size:0.875rem">Choose what you want to be notified about.</p>
          </details>
        </div>

        <div class="showcase-cell">
          <label>
            <input type="radio" name="plan" checked /> Free
          </label>
          <label>
            <input type="radio" name="plan" /> Pro
          </label>
          <label>
            <input type="radio" name="plan" /> Team
          </label>
        </div>

        <div class="showcase-cell">
          <progress value="72" max="100" style="width:100%"></progress>
          <progress value="40" max="100" style="width:100%"></progress>
        </div>

        <div class="showcase-cell">
          <label class="toggle">
            <input type="checkbox" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            Bookmark
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Star
          </label>
        </div>

        <div class="showcase-cell">
          <kbd>⌘</kbd><kbd>K</kbd>
          <hr style="width:100%;margin-block:0.5rem" />
          <kbd>⌃</kbd><kbd>⇧</kbd><kbd>P</kbd>
        </div>

        <div class="showcase-cell showcase-cell--wide">
          <table style="--cols: 1fr 1fr 1fr; width:100%">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Alice</td><td>Engineer</td><td>Active</td></tr>
              <tr><td>Bob</td><td>Designer</td><td>Away</td></tr>
            </tbody>
          </table>
        </div>

        <div class="showcase-cell">
          <article style="width:100%">
            <header>Card title</header>
            <p style="font-size:0.875rem;color:var(--jazz-neutral-500)">Some content inside a card with a header.</p>
            <footer style="display:flex;justify-content:flex-end;gap:0.5rem">
              <button class="ghost">Cancel</button>
              <button>Save</button>
            </footer>
          </article>
        </div>

        <div class="showcase-cell">
          <button class="destructive">Delete</button>
          <button class="outline destructive">Remove</button>
        </div>

        <div class="showcase-cell">
          <span class="badge">Badge</span>
          <span class="badge secondary">Secondary</span>
          <span class="badge destructive">Destructive</span>
          <span class="badge outline">Outline</span>
        </div>

        <div class="showcase-cell">
          <button onclick="document.getElementById('showcase-modal').showModal()">Open modal</button>
          <dialog id="showcase-modal" closedby="any">
            <article>
              <header><strong>Confirm action</strong></header>
              <p>Are you sure you want to continue? This cannot be undone.</p>
              <footer style="display:flex;gap:0.5rem">
                <button class="destructive">Delete</button>
                <form method="dialog"><button class="outline">Cancel</button></form>
              </footer>
            </article>
          </dialog>
        </div>

        <div class="showcase-cell">
          <button aria-busy="true">Loading</button>
          <button class="outline" aria-busy="true">Saving</button>
        </div>

        <div class="showcase-cell">
          <input id="showcase-primary-color" type="color" oninput="this.closest('section').style.setProperty('--jazz-primary', this.value)" />
          <script>
            (function () {
              var tmp = document.createElement('div');
              tmp.style.color = getComputedStyle(document.documentElement).getPropertyValue('--jazz-primary').trim();
              document.body.appendChild(tmp);
              var rgb = getComputedStyle(tmp).color.match(/\d+/g)?.map(Number);
              document.body.removeChild(tmp);
              document.getElementById('showcase-primary-color').value =
                '#' + rgb?.map(function (n) { return n.toString(16).padStart(2, '0'); }).join('');
            })();
          </script>
        </div>
      </section>

      <section class="home-code">
        <div class="code-block">
          ${raw(await highlight(
            `<button>Save changes</button>\n` +
            `<button class="outline">Cancel</button>\n` +
            `<button class="ghost">Reset</button>\n` +
            `\n` +
            `<label>\n` +
            `  <svg><!-- icon --></svg>\n` +
            `  <input type="search" placeholder="Search..." />\n` +
            `</label>\n` +
            `\n` +
            `<fieldset role="group">\n` +
            `  <button class="ghost">Week</button>\n` +
            `  <button class="ghost">Month</button>\n` +
            `  <button class="ghost">Year</button>\n` +
            `</fieldset>\n` +
            `\n` +
            `<article>\n` +
            `  <header>Card title</header>\n` +
            `  <p>Some content inside a card.</p>\n` +
            `  <footer>\n` +
            `    <button class="ghost">Cancel</button>\n` +
            `    <button>Save</button>\n` +
            `  </footer>\n` +
            `</article>`,
            'html'
          ))}
        </div>
      </section>

      <section class="home-features">
        <div class="home-feature-card">
          <p class="home-feature-label">Reset + UI in one import</p>
          <h2 class="home-feature-title">Batteries included</h2>
          <p class="home-feature-desc">
            Jazz normalizes browser defaults and builds on top of them.
            You get a consistent baseline and a full component library
            from a single stylesheet.
          </p>
        </div>

        <div class="home-feature-card">
          <p class="home-feature-label">No class soup</p>
          <h2 class="home-feature-title">Just write HTML</h2>
          <p class="home-feature-desc">
            Components map to native elements. A
            <code>&lt;button&gt;</code> is a button, a
            <code>&lt;dialog&gt;</code> is a dialog — no wrappers or
            utility classes needed.
          </p>
        </div>

        <div class="home-feature-card">
          <p class="home-feature-label">Works out of the box</p>
          <h2 class="home-feature-title">Dark mode included</h2>
          <p class="home-feature-desc">
            Responds to <code>prefers-color-scheme</code> automatically.
            Force a mode with <code>.jazz-light</code> or
            <code>.jazz-dark</code> on any element.
          </p>
        </div>
      </section>

      <footer class="home-footer">
        <div class="home-footer-inner">
          <span>Jazz</span>
          <span>MIT License</span>
          <a href="https://github.com/erikthalen/jazz" target="_blank" rel="noopener">GitHub</a>
        </div>
      </footer>
    `,
  })
}

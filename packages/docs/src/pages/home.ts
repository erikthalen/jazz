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
    `,
  })
}

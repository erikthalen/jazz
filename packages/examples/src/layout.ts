import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";

export const examples: { label: string; path: string; description: string }[] =
  [
    {
      label: "Jazz + Tailwind",
      path: "/tailwind",
      description:
        "Use Jazz components alongside Tailwind CSS utility classes for layout and custom styling.",
    },
  ];

type LayoutProps = {
  title: string;
  path: string;
  extraHead?: string;
  content: HtmlEscapedString | Promise<HtmlEscapedString>;
};

export function Layout({ title, path, extraHead, content }: LayoutProps) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — Jazz Examples</title>
        ${extraHead ? raw(extraHead) : ""}
        <style>
          body {
            max-width: none;
            margin: 0;
          }

          .examples-header {
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 0 1.5rem;
            height: 52px;
            border-bottom: 1px solid var(--jazz-neutral-200);
            background: var(--jazz-background-color);
          }

          .examples-header a {
            text-decoration: none;
            color: inherit;
            font-size: 0.875rem;
          }

          .examples-header a:hover {
            color: var(--jazz-primary);
          }

          .examples-header-sep {
            color: var(--jazz-neutral-300);
          }

          .examples-header nav {
            display: flex;
            gap: 0.25rem;
          }

          .examples-header nav a[aria-current] {
            color: var(--jazz-text-color);
            font-weight: 500;
          }

          .examples-content {
            padding: 3rem 1.5rem;
            max-width: 960px;
            margin: 0 auto;
          }

          .example-section {
            margin-bottom: 3rem;
          }

          .example-section h2 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
          }

          .example-section p {
            color: var(--jazz-neutral-600);
            margin: 0 0 1.5rem;
            font-size: 0.9375rem;
          }

          .preview {
            border: 1px solid var(--jazz-neutral-200);
            border-radius: 8px 8px 0 0;
            padding: 2.5rem 2rem;
            background: var(--jazz-neutral-0);
          }

          .code-block {
            position: relative;
            border: 1px solid var(--jazz-neutral-200);
            border-top: none;
            border-radius: 0 0 8px 8px;
            background: var(--jazz-neutral-100);
            overflow: hidden;
          }

          [data-theme="light"] .code-block {
            background: #fff;
          }

          .code-block pre {
            margin: 0;
            padding: 1rem 1.25rem;
            overflow-x: auto;
          }

          .code-block code {
            font-family: ui-monospace, "Cascadia Code", "Fira Code", monospace;
            font-size: 0.8125rem;
            line-height: 1.65;
            white-space: pre;
          }

          .shiki {
            background: transparent !important;
          }

          [data-theme="light"] .shiki span {
            color: var(--shiki-light);
          }

          [data-theme="dark"] .shiki span {
            color: var(--shiki-dark);
          }

          .shiki span {
            @media (prefers-color-scheme: light) {
              :root:not([data-theme="dark"]) & {
                color: var(--shiki-light);
              }
            }

            @media (prefers-color-scheme: dark) {
              :root:not([data-theme="light"]) & {
                color: var(--shiki-dark);
              }
            }
          }
        </style>
      </head>
      <body>
        <header class="examples-header">
          <a href="/"
            ><strong>Jazz</strong>
            <span style="font-weight:400">Examples</span></a
          >
          ${path !== "/"
            ? html`<span class="examples-header-sep">/</span>
                <nav>
                  ${examples.map(
                    (e) =>
                      html`<a
                        href="${e.path}"
                        ${path === e.path ? 'aria-current="page"' : ""}
                        >${e.label}</a
                      >`,
                  )}
                </nav>`
            : ""}
        </header>
        <main class="examples-content">${content}</main>
      </body>
    </html>`;
}

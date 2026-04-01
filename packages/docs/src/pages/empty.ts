import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-action", label: "With action" },
  { id: "with-link", label: "With link" },
];

export async function EmptyPage(path: string) {
  return Layout({
    title: "Empty State",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Empty State</h1>
        <p class="lead">
          A placeholder shown when there is no content to display, built with
          the <code>.empty</code> class.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
            <h3>No items yet</h3>
            <p>There's nothing here. Add something to get started.</p>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="empty">
  <svg><!-- icon --></svg>
  <h3>No items yet</h3>
  <p>There's nothing here. Add something to get started.</p>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-action">With action</h2>
        <p>Add a button or link to give the user a clear next step.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18" />
  <path d="M7 3h7l5 5v7m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14" /></svg>
            <h3>No documents</h3>
            <p>Create your first document to get started.</p>
            <button>New document</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="empty">
  <svg><!-- icon --></svg>
  <h3>No documents</h3>
  <p>Create your first document to get started.</p>
  <button>New document</button>
</div>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-link">With link</h2>
        <p>Use an <code>&lt;a&gt;</code> when the action navigates somewhere.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 8h.01" />
  <path d="M7 3h11a3 3 0 0 1 3 3v11m-.856 3.099a2.991 2.991 0 0 1 -2.144 .901h-12a3 3 0 0 1 -3 -3v-12c0 -.845 .349 -1.608 .91 -2.153" />
  <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
  <path d="M16.33 12.338c.574 -.054 1.155 .166 1.67 .662l3 3" />
  <path d="M3 3l18 18" /></svg>
            <h3>No images uploaded</h3>
            <p>Visit the media library to upload and manage your images.</p>
            <a href="#" class="button">Go to media library</a>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="empty">
  <svg><!-- icon --></svg>
  <h3>No images uploaded</h3>
  <p>Visit the media library to upload and manage your images.</p>
  <a href="/media" class="button">Go to media library</a>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-action", label: "With action" },
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
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M12 18v-6" />
              <path d="M9 15h6" />
            </svg>
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
    `,
  });
}

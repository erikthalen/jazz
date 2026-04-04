import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-icons", label: "With icons" },
  { id: "with-section-labels", label: "With section labels" },
  { id: "with-radios", label: "With radios" },
  { id: "with-checkboxes", label: "With checkboxes" },
];

export async function MenuPage(path: string) {
  return Layout({
    title: "Menu",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Menu</h1>
        <p class="lead">
          A styled list of actions or options. The
          <code>&lt;menu&gt;</code> element is styled directly — no class
          needed. Place it inside a <code>[popover]</code> for a dropdown, or
          use it standalone anywhere.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
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
            await highlight(`<menu>
  <li><button class="ghost">Edit</button></li>
  <li><button class="ghost">Duplicate</button></li>
  <li><button class="ghost">Share</button></li>
  <li><hr /></li>
  <li><button class="ghost destructive">Delete</button></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-icons">With icons</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li>
                <button class="ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
                  Edit
                </button>
              </li>
              <li>
                <button class="ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  Duplicate
                </button>
              </li>
              <li>
                <button class="ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                  Share
                </button>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost destructive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  Delete
                </button>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li>
    <button class="ghost">
      <svg><!-- edit icon --></svg>
      Edit
    </button>
  </li>
  <li>
    <button class="ghost">
      <svg><!-- copy icon --></svg>
      Duplicate
    </button>
  </li>
  <li>
    <button class="ghost">
      <svg><!-- share icon --></svg>
      Share
    </button>
  </li>
  <li><hr /></li>
  <li>
    <button class="ghost destructive">
      <svg><!-- trash icon --></svg>
      Delete
    </button>
  </li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-section-labels">With section labels</h2>
        <p>
          A <code>&lt;li&gt;</code> whose only child is a text-only
          <code>&lt;small&gt;</code> renders as a muted section header.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Actions</small></li>
              <li><button class="ghost">New File</button></li>
              <li><button class="ghost">New Folder</button></li>
              <li><hr /></li>
              <li><small>Danger zone</small></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Actions</small></li>
  <li><button class="ghost">New File</button></li>
  <li><button class="ghost">New Folder</button></li>
  <li><hr /></li>
  <li><small>Danger zone</small></li>
  <li><button class="ghost destructive">Delete</button></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-radios">With radios</h2>
        <p>
          Radio inputs inside <code>&lt;label&gt;</code>s show a checkmark on
          the selected item. The input itself is hidden.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Sort by</small></li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="newest" checked />
                  Newest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="oldest" />
                  Oldest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="name" />
                  Name</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Sort by</small></li>
  <li><label>
    <input type="radio" name="sort" value="newest" checked /> Newest
  </label></li>
  <li><label>
    <input type="radio" name="sort" value="oldest" /> Oldest
  </label></li>
  <li><label>
    <input type="radio" name="sort" value="name" /> Name
  </label></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-checkboxes">With checkboxes</h2>
        <p>
          Checkboxes show a filled square when checked and a faint empty square
          when unchecked, making each option clearly toggleable.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Columns</small></li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-name"
                    checked
                  />Name</label
                >
              </li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-size"
                    checked
                  />Size</label
                >
              </li>
              <li>
                <label
                  ><input type="checkbox" name="menu-col-type" />Type</label
                >
              </li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-modified"
                  />Modified</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Columns</small></li>
  <li><label>
    <input type="checkbox" name="name" checked /> Name
  </label></li>
  <li><label>
    <input type="checkbox" name="size" checked /> Size
  </label></li>
  <li><label>
    <input type="checkbox" name="type" /> Type
  </label></li>
  <li><label>
    <input type="checkbox" name="modified" /> Modified
  </label></li>
</menu>`),
          )}
        </div>
      </div>
    `,
  });
}

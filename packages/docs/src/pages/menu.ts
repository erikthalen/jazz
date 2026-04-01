import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
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
          A styled list of actions or options. Add <code>.menu</code> to a
          <code>&lt;menu&gt;</code> element to use it standalone — or place a
          plain <code>&lt;menu&gt;</code> inside any
          <code>[popover]</code> and the styles apply automatically.
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
        <h2 id="with-section-labels">With section labels</h2>
        <p>
          A <code>&lt;li&gt;</code> whose only child is a
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

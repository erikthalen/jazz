import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled tab" },
  { id: "with-cards", label: "With content" },
];

export async function TabsPage(path: string) {
  return Layout({
    title: "Tabs",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tabs <sup class="badge constructive">New</sup></h1>
          <p>
            A set of <code>label</code> elements with hidden radio inputs inside
            a <code>.tabs</code> container. No JavaScript needed -- CSS
            <code>:has()</code> handles panel switching.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Each <code>label</code> wraps a radio <code>input</code>. Add
          <code>checked</code> to the first input to set the default tab. Panels
          are plain <code>div</code> elements placed after the labels.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs">
            <header>
              <label>
                <input type="radio" name="tab-demo" checked /> Account
              </label>
              <label><input type="radio" name="tab-demo" /> Password</label>
              <label>
                <input type="radio" name="tab-demo" /> Notifications
              </label>
            </header>

            <div>
              <p>Manage your account settings and preferences.</p>
            </div>
            <div>
              <p>Change your password and security settings.</p>
            </div>
            <div>
              <p>Configure how and when you receive notifications.</p>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs"><header>
<label><input type="radio" name="tabs" checked /> Account</label>
  <label><input type="radio" name="tabs" /> Password</label>
  <label><input type="radio" name="tabs" /> Notifications</label>
            </header>
  
  <div>
    <p>Manage your account settings and preferences.</p>
  </div>
  <div>
    <p>Change your password and security settings.</p>
  </div>
  <div>
    <p>Configure how and when you receive notifications.</p>
  </div>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled tab</h2>
        <p>Add <code>disabled</code> to the radio input to disable a tab.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs">
            <header>
              <label
                ><input type="radio" name="tab-disabled" checked />
                Overview</label
              >
              <label
                ><input type="radio" name="tab-disabled" /> Analytics</label
              >
              <label
                ><input type="radio" name="tab-disabled" disabled />
                Reports</label
              >
            </header>
            <div>
              <p>Overview content goes here.</p>
            </div>
            <div>
              <p>Analytics content goes here.</p>
            </div>
            <div>
              <p>Reports content goes here.</p>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs"><header>
<label><input type="radio" name="tabs" checked /> Overview</label>
  <label><input type="radio" name="tabs" /> Analytics</label>
  <label><input type="radio" name="tabs" disabled /> Reports</label>
            </header>
  
  <div>Overview content goes here.</div>
  <div>Analytics content goes here.</div>
  <div>Reports content goes here.</div>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-cards">With content</h2>
        <p>Tab panels can contain any content.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs" style="width:100%">
            <header>
              <label>
                <input type="radio" name="tab-cards" checked /> Members
              </label>
              <label><input type="radio" name="tab-cards" /> Activity</label>
              <label><input type="radio" name="tab-cards" /> Invite</label>
            </header>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alice</td>
                    <td>Engineer</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>Bob</td>
                    <td>Designer</td>
                    <td>Away</td>
                  </tr>
                  <tr>
                    <td>Carol</td>
                    <td>Manager</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <section class="empty">
                ${raw(icon("inbox", { size: 24 }))}
                <h3>No activity yet</h3>
                <p>Actions taken by your team will appear here.</p>
              </section>
            </div>
            <div>
              <form style="display: grid; gap: 1em;">
                <label class="field">
                  <span>Email address</span>
                  <input type="email" placeholder="colleague@example.com" />
                </label>
                <div class="field">
                  <span>Role</span>
                  <button
                    type="button"
                    class="outlined"
                    popovertarget="tab-invite-role"
                    style="justify-content:space-between"
                  >
                    <span>Member</span>
                    ${raw(icon("chevron-down", { size: 14 }))}
                  </button>
                  <div
                    id="tab-invite-role"
                    popover
                    onchange="document.querySelector('[popovertarget=tab-invite-role] span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()"
                  >
                    <menu>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="member"
                            checked
                          />
                          Member</label
                        >
                      </li>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="admin"
                          />
                          Admin</label
                        >
                      </li>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="viewer"
                          />
                          Viewer</label
                        >
                      </li>
                    </menu>
                  </div>
                </div>
                <button type="submit">Send invite</button>
              </form>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs">
  <header>
    <label><input type="radio" name="tabs" checked /> Members</label>
    <label><input type="radio" name="tabs" /> Activity</label>
    <label><input type="radio" name="tabs" /> Invite</label>
  </header>

  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Alice</td><td>Engineer</td><td>Active</td></tr>
        <tr><td>Bob</td><td>Designer</td><td>Away</td></tr>
        <tr><td>Carol</td><td>Manager</td><td>Active</td></tr>
      </tbody>
    </table>
  </div>

  <div>
    <section class="empty">
      <svg><!-- icon --></svg>
      <h3>No activity yet</h3>
      <p>Actions taken by your team will appear here.</p>
    </section>
  </div>

  <div>
    <form style="display: grid; gap: 1em;">
      <label class="field">
        <span>Email address</span>
        <input type="email" placeholder="colleague@example.com" />
      </label>
      <div class="field">
        <span>Role</span>
        <button type="button" class="outlined" popovertarget="role">Member</button>
        <div id="role" popover>
          <menu>
            <li><label><input type="radio" name="role" value="member" checked /> Member</label></li>
            <li><label><input type="radio" name="role" value="admin" /> Admin</label></li>
            <li><label><input type="radio" name="role" value="viewer" /> Viewer</label></li>
          </menu>
        </div>
      </div>
      <button type="submit">Send invite</button>
    </form>
  </div>
</section>`),
          )}
        </div>
      </div>
    `,
  });
}

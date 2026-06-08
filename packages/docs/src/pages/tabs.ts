import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled tab" },
  { id: "with-cards", label: "With cards" },
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
        <h2 id="with-cards">With cards</h2>
        <p>Tab panels can contain any content, including card components.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs" style="width:100%">
            <header>
              <label>
                <input type="radio" name="tab-cards" checked /> Overview
              </label>
              <label><input type="radio" name="tab-cards" /> Team</label>
              <label><input type="radio" name="tab-cards" /> Billing</label>
            </header>

            <div>
              <article>
                <header>Project overview</header>
                <div>
                  <p>Track progress, deadlines, and key milestones for your current project.</p>
                </div>
                <footer>Last updated 2 hours ago</footer>
              </article>
            </div>
            <div>
              <article>
                <header>Team members</header>
                <div>
                  <p>Manage roles and permissions for everyone on your team.</p>
                </div>
                <footer>4 members</footer>
              </article>
            </div>
            <div>
              <article>
                <header>Billing</header>
                <div>
                  <p>View invoices, update your payment method, and manage your subscription.</p>
                </div>
                <footer>Next invoice on Jul 1</footer>
              </article>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs">
  <header>
    <label><input type="radio" name="tabs" checked /> Overview</label>
    <label><input type="radio" name="tabs" /> Team</label>
    <label><input type="radio" name="tabs" /> Billing</label>
  </header>

  <div>
    <article>
      <header>Project overview</header>
      <div>
        <p>Track progress, deadlines, and key milestones for your current project.</p>
      </div>
      <footer>Last updated 2 hours ago</footer>
    </article>
  </div>
  <div>
    <article>
      <header>Team members</header>
      <div>
        <p>Manage roles and permissions for everyone on your team.</p>
      </div>
      <footer>4 members</footer>
    </article>
  </div>
  <div>
    <article>
      <header>Billing</header>
      <div>
        <p>View invoices, update your payment method, and manage your subscription.</p>
      </div>
      <footer>Next invoice on Jul 1</footer>
    </article>
  </div>
</section>`),
          )}
        </div>
      </div>
    `,
  });
}

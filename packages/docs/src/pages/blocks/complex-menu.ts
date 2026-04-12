import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

export async function ComplexMenuPage(path: string) {
  return Layout({ wide: true,
    title: "Complex Menu",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Complex Menu</h1>
          <p>
            A multi-section dropdown with keyboard shortcuts, checkable items,
            and nested submenus. Built entirely with the Popover API and Jazz
            components.
          </p>
        </hgroup>
      </div>

      <div class="example">
        <div class="preview">
          <button popovertarget="cmenu-main">Complex Menu</button>

          <div id="cmenu-main" popover style="min-width: 200px">
            <menu>
              <li><small>File</small></li>
              <li>
                <button class="ghost">
                  ${raw(icon("file"))} New File
                  <kbd class="shortcut">⌘N</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("folder"))} New Folder
                  <kbd class="shortcut">⇧⌘N</kbd>
                </button>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-recent">
                  ${raw(icon("folder-open"))} Open Recent
                </button>
                <div id="cmenu-recent" popover data-placement="right top">
                  <menu>
                    <li><small>Recent Projects</small></li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("file"))} Project Alpha
                      </button>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("file"))} Project Beta
                      </button>
                    </li>
                    <li><hr /></li>
                    <li>
                      <button class="ghost" popovertarget="cmenu-more-projects">
                        ${raw(icon("dots"))} More Projects
                      </button>
                      <div
                        id="cmenu-more-projects"
                        popover
                        data-placement="right top"
                      >
                        <menu>
                          <li>
                            <button class="ghost">
                              ${raw(icon("file"))} Project Gamma
                            </button>
                          </li>
                          <li>
                            <button class="ghost">
                              ${raw(icon("file"))} Project Delta
                            </button>
                          </li>
                        </menu>
                      </div>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("folder-open"))} Browse&hellip;
                      </button>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost">
                  ${raw(icon("device-floppy"))} Save
                  <kbd class="shortcut">⌘S</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("download"))} Export
                  <kbd class="shortcut">⇧⌘E</kbd>
                </button>
              </li>
              <li><hr /></li>
              <li><small>View</small></li>
              <li>
                <label>
                  <input type="checkbox" name="cmenu-sidebar" checked />
                  ${raw(icon("layout-sidebar"))} Show Sidebar
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="cmenu-statusbar" />
                  ${raw(icon("layout-bottombar"))} Show Status Bar
                </label>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-theme">
                  ${raw(icon("palette"))} Theme
                </button>
                <div id="cmenu-theme" popover data-placement="right top">
                  <menu>
                    <li><small>Appearance</small></li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" checked />
                        ${raw(icon("sun"))} Light
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" />
                        ${raw(icon("moon"))} Dark
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" />
                        ${raw(icon("device-desktop"))} System
                      </label>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li><small>Account</small></li>
              <li>
                <button class="ghost">
                  ${raw(icon("user"))} Profile
                  <kbd class="shortcut">⇧⌘P</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("credit-card"))} Billing
                </button>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-settings">
                  ${raw(icon("settings"))} Settings
                </button>
                <div id="cmenu-settings" popover data-placement="right top">
                  <menu>
                    <li><small>Preferences</small></li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("keyboard"))} Keyboard Shortcuts
                      </button>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("language"))} Language
                      </button>
                    </li>
                    <li>
                      <button class="ghost" popovertarget="cmenu-notifications">
                        ${raw(icon("bell"))} Notifications
                      </button>
                      <div
                        id="cmenu-notifications"
                        popover
                        data-placement="right top"
                      >
                        <menu>
                          <li><small>Notification Types</small></li>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                name="cmenu-notif-push"
                                checked
                              />
                              ${raw(icon("bell"))} Push Notifications
                            </label>
                          </li>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                name="cmenu-notif-email"
                                checked
                              />
                              ${raw(icon("mail"))} Email Notifications
                            </label>
                          </li>
                        </menu>
                      </div>
                    </li>
                    <li><hr /></li>
                    <li>
                      <button class="ghost">
                        ${raw(icon("shield"))} Privacy &amp; Security
                      </button>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost">
                  ${raw(icon("help-circle"))} Help &amp; Support
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("file-text"))} Documentation
                </button>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost destructive">
                  ${raw(icon("logout"))} Sign Out
                  <kbd class="shortcut">⇧⌘Q</kbd>
                </button>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="main-menu">Complex Menu</button>

<div id="main-menu" popover style="min-width: 200px">
  <menu>
    <li><small>File</small></li>
    <li>
      <button class="ghost">
        <svg><!-- file --></svg> New File
        <kbd class="shortcut">⌘N</kbd>
      </button>
    </li>
    <li>
      <button class="ghost">
        <svg><!-- folder --></svg> New Folder
        <kbd class="shortcut">⇧⌘N</kbd>
      </button>
    </li>
    <li>
      <button class="ghost" popovertarget="recent-menu">
        <svg><!-- folder-open --></svg> Open Recent
      </button>
      <div id="recent-menu" popover data-placement="right top">
        <menu>
          <li><small>Recent Projects</small></li>
          <li><button class="ghost"><svg><!-- file --></svg> Project Alpha</button></li>
          <li><button class="ghost"><svg><!-- file --></svg> Project Beta</button></li>
          <li><hr /></li>
          <li>
            <button class="ghost" popovertarget="more-projects-menu">
              <svg><!-- dots --></svg> More Projects
            </button>
            <div id="more-projects-menu" popover data-placement="right top">
              <menu>
                <li><button class="ghost"><svg><!-- file --></svg> Project Gamma</button></li>
                <li><button class="ghost"><svg><!-- file --></svg> Project Delta</button></li>
              </menu>
            </div>
          </li>
          <li><button class="ghost"><svg><!-- folder-open --></svg> Browse&hellip;</button></li>
        </menu>
      </div>
    </li>
    <li><hr /></li>
    <li>
      <button class="ghost">
        <svg><!-- device-floppy --></svg> Save
        <kbd class="shortcut">⌘S</kbd>
      </button>
    </li>
    <li>
      <button class="ghost">
        <svg><!-- download --></svg> Export
        <kbd class="shortcut">⇧⌘E</kbd>
      </button>
    </li>
    <li><hr /></li>
    <li><small>View</small></li>
    <li>
      <label>
        <input type="checkbox" name="sidebar" checked />
        <svg><!-- layout-sidebar --></svg> Show Sidebar
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" name="statusbar" />
        <svg><!-- layout-bottombar --></svg> Show Status Bar
      </label>
    </li>
    <li>
      <button class="ghost" popovertarget="theme-menu">
        <svg><!-- palette --></svg> Theme
      </button>
      <div id="theme-menu" popover data-placement="right top">
        <menu>
          <li><small>Appearance</small></li>
          <li>
            <label>
              <input type="radio" name="appearance" checked />
              <svg><!-- sun --></svg> Light
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="appearance" />
              <svg><!-- moon --></svg> Dark
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="appearance" />
              <svg><!-- monitor --></svg> System
            </label>
          </li>
        </menu>
      </div>
    </li>
    <li><hr /></li>
    <li><small>Account</small></li>
    <li>
      <button class="ghost">
        <svg><!-- user --></svg> Profile
        <kbd class="shortcut">⇧⌘P</kbd>
      </button>
    </li>
    <li>
      <button class="ghost">
        <svg><!-- credit-card --></svg> Billing
      </button>
    </li>
    <li>
      <button class="ghost" popovertarget="settings-menu">
        <svg><!-- settings --></svg> Settings
      </button>
      <div id="settings-menu" popover data-placement="right top">
        <menu>
          <li><small>Preferences</small></li>
          <li><button class="ghost"><svg><!-- keyboard --></svg> Keyboard Shortcuts</button></li>
          <li><button class="ghost"><svg><!-- language --></svg> Language</button></li>
          <li>
            <button class="ghost" popovertarget="notifications-menu">
              <svg><!-- bell --></svg> Notifications
            </button>
            <div id="notifications-menu" popover data-placement="right top">
              <menu>
                <li><small>Notification Types</small></li>
                <li>
                  <label>
                    <input type="checkbox" checked />
                    <svg><!-- bell --></svg> Push Notifications
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked />
                    <svg><!-- mail --></svg> Email Notifications
                  </label>
                </li>
              </menu>
            </div>
          </li>
          <li><hr /></li>
          <li><button class="ghost"><svg><!-- shield --></svg> Privacy &amp; Security</button></li>
        </menu>
      </div>
    </li>
    <li><hr /></li>
    <li>
      <button class="ghost">
        <svg><!-- help-circle --></svg> Help &amp; Support
      </button>
    </li>
    <li>
      <button class="ghost">
        <svg><!-- file-text --></svg> Documentation
      </button>
    </li>
    <li><hr /></li>
    <li>
      <button class="ghost destructive">
        <svg><!-- logout --></svg> Sign Out
        <kbd class="shortcut">⇧⌘Q</kbd>
      </button>
    </li>
  </menu>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

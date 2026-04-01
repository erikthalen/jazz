import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const svg = (paths: string, size = 16) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const I = {
  file: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />`,
  folder: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />`,
  folderOpen: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />`,
  save: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" />`,
  download: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" />`,
  layoutSidebar: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" /><path d="M9 4l0 16" />`,
  layoutBottombar: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" /><path d="M4 15l16 0" />`,
  palette: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />`,
  user: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />`,
  creditCard: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8" /><path d="M3 10l18 0" /><path d="M7 15l.01 0" /><path d="M11 15l2 0" />`,
  settings: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />`,
  helpCircle: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 16v.01" /><path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />`,
  fileText: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" />`,
  logout: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />`,
  dots: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />`,
  keyboard: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8" /><path d="M6 10l0 .01" /><path d="M10 10l0 .01" /><path d="M14 10l0 .01" /><path d="M18 10l0 .01" /><path d="M6 14l0 .01" /><path d="M18 14l0 .01" /><path d="M10 14l4 .01" />`,
  language: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6.371c0 4.418 -2.239 6.629 -5 6.629" /><path d="M4 6.371h7" /><path d="M5 9c0 2.144 2.252 3.908 6 4" /><path d="M12 20l4 -9l4 9" /><path d="M19.1 18h-6.2" /><path d="M6.694 3l.793 .582" />`,
  bell: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" />`,
  shield: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />`,
  mail: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M3 7l9 6l9 -6" />`,
  sun: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />`,
  moon: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />`,
  monitor: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" />`,
};

export async function ComplexMenuPage(path: string) {
  return Layout({
    title: "Complex Menu",
    path,
    content: html`
      <div class="prose">
        <h1>Complex Menu</h1>
        <p class="lead">
          A multi-section dropdown with keyboard shortcuts, checkable items, and
          nested submenus. Built entirely with the Popover API and Jazz
          components.
        </p>
      </div>

      <div class="example">
        <div class="preview">
          <button popovertarget="cmenu-main">Complex Menu</button>

          <div id="cmenu-main" popover style="min-width: 200px">
            <menu>
              <li><small>File</small></li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.file))} New File
                  <kbd class="shortcut">⌘N</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.folder))} New Folder
                  <kbd class="shortcut">⇧⌘N</kbd>
                </button>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-recent">
                  ${raw(svg(I.folderOpen))} Open Recent
                </button>
                <div id="cmenu-recent" popover data-placement="right top">
                  <menu>
                    <li><small>Recent Projects</small></li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.file))} Project Alpha
                      </button>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.file))} Project Beta
                      </button>
                    </li>
                    <li><hr /></li>
                    <li>
                      <button class="ghost" popovertarget="cmenu-more-projects">
                        ${raw(svg(I.dots))} More Projects
                      </button>
                      <div
                        id="cmenu-more-projects"
                        popover
                        data-placement="right top"
                      >
                        <menu>
                          <li>
                            <button class="ghost">
                              ${raw(svg(I.file))} Project Gamma
                            </button>
                          </li>
                          <li>
                            <button class="ghost">
                              ${raw(svg(I.file))} Project Delta
                            </button>
                          </li>
                        </menu>
                      </div>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.folderOpen))} Browse&hellip;
                      </button>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.save))} Save
                  <kbd class="shortcut">⌘S</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.download))} Export
                  <kbd class="shortcut">⇧⌘E</kbd>
                </button>
              </li>
              <li><hr /></li>
              <li><small>View</small></li>
              <li>
                <label>
                  <input type="checkbox" name="cmenu-sidebar" checked />
                  ${raw(svg(I.layoutSidebar))} Show Sidebar
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="cmenu-statusbar" />
                  ${raw(svg(I.layoutBottombar))} Show Status Bar
                </label>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-theme">
                  ${raw(svg(I.palette))} Theme
                </button>
                <div id="cmenu-theme" popover data-placement="right top">
                  <menu>
                    <li><small>Appearance</small></li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" checked />
                        ${raw(svg(I.sun))} Light
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" />
                        ${raw(svg(I.moon))} Dark
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="radio" name="cmenu-appearance" />
                        ${raw(svg(I.monitor))} System
                      </label>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li><small>Account</small></li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.user))} Profile
                  <kbd class="shortcut">⇧⌘P</kbd>
                </button>
              </li>
              <li>
                <button class="ghost">${raw(svg(I.creditCard))} Billing</button>
              </li>
              <li>
                <button class="ghost" popovertarget="cmenu-settings">
                  ${raw(svg(I.settings))} Settings
                </button>
                <div id="cmenu-settings" popover data-placement="right top">
                  <menu>
                    <li><small>Preferences</small></li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.keyboard))} Keyboard Shortcuts
                      </button>
                    </li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.language))} Language
                      </button>
                    </li>
                    <li>
                      <button class="ghost" popovertarget="cmenu-notifications">
                        ${raw(svg(I.bell))} Notifications
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
                              ${raw(svg(I.bell))} Push Notifications
                            </label>
                          </li>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                name="cmenu-notif-email"
                                checked
                              />
                              ${raw(svg(I.mail))} Email Notifications
                            </label>
                          </li>
                        </menu>
                      </div>
                    </li>
                    <li><hr /></li>
                    <li>
                      <button class="ghost">
                        ${raw(svg(I.shield))} Privacy &amp; Security
                      </button>
                    </li>
                  </menu>
                </div>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.helpCircle))} Help &amp; Support
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(svg(I.fileText))} Documentation
                </button>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost destructive">
                  ${raw(svg(I.logout))} Sign Out
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

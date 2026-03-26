import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const svg = (paths: string, size = 14) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const I = {
  terminal2: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /><path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" />`,
  search: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />`,
  books: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" /><path d="M9 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" /><path d="M5 8h4" /><path d="M9 16h4" /><path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041" /><path d="M14 9l4 -1" /><path d="M16 16l3.923 -.98" />`,
  settings: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />`,
  layoutGrid: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />`,
  trendingUp: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" />`,
  plane: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3l4 7" />`,
  dots: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />`,
  eye: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />`,
  share: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" />`,
  trash: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />`,
  lifebuoy: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M15 15l3.35 3.35" /><path d="M9 15l-3.35 3.35" /><path d="M5.65 5.65l3.35 3.35" /><path d="M18.35 5.65l-3.35 3.35" />`,
  message: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" />`,
  selector: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9l4 -4l4 4" /><path d="M16 15l-4 4l-4 -4" />`,
  sparkles: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />`,
  userCircle: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />`,
  creditCard: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8" /><path d="M3 10l18 0" /><path d="M7 15l.01 0" /><path d="M11 15l2 0" />`,
  bell: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" />`,
  logout: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />`,
};

export async function SidebarPage(path: string) {
  return Layout({
    title: "Sidebar",
    path,
    content: html`
      <div class="prose">
        <h1>Sidebar</h1>
        <p class="lead">
          An app navigation sidebar with grouped links, an expandable section,
          and a pinned user footer.
        </p>
      </div>

      <style>
        .sidebar {
          width: 230px;

          header {
            display: flex;
            align-items: center;
            gap: var(--spacing-3);
          }

          section {
            > small {
              display: block;
              color: var(--jazz-neutral-400);
              margin-block: var(--spacing-4) var(--spacing-1);
            }
          }

          details {
            border-bottom: 0;
            padding-inline: var(--spacing-3);

            summary {
              padding-block: var(--spacing-2);
            }

            menu {
              border-left: 1px solid var(--jazz-neutral-200);
              margin-left: var(--spacing-2);
              margin-block: 0 var(--spacing-4);
              padding-block: 0;

              button {
                margin-left: var(--spacing-1);
              }
            }
          }

          button {
            text-align: left;

            &:not(.square) {
              width: -webkit-fill-available;
              justify-content: flex-start;
            }
          }

          li {
            position: relative;

            button.square {
              position: absolute;
              right: 0;

              @media (hover: hover) {
                opacity: 0;
              }
            }

            &:hover,
            &:has([popover]:popover-open) {
              button.square {
                opacity: 1;
              }
            }
          }
        }
      </style>

      <div class="example">
        <div class="preview">
          <nav class="sidebar">
            <header>
              <img
                src="https://api.dicebear.com/9.x/icons/svg?seed=Emery"
                width="32"
                height="32"
                alt="avatar"
              />
              <div style="display:grid">
                <strong>Acme Inc</strong>
                <small>Enterprise</small>
              </div>
            </header>

            <div>
              <section>
                <small>Platform</small>
                <menu>
                  <li>
                    <details open>
                      <summary>
                        <span
                          style="display:flex;align-items:center;gap:0.5rem"
                        >
                          ${raw(svg(I.terminal2))} Playground
                        </span>
                      </summary>
                      <menu class="sidebar-submenu">
                        <li><button class="ghost">History</button></li>
                        <li><button class="ghost">Starred</button></li>
                        <li><button class="ghost">Settings</button></li>
                      </menu>
                    </details>
                  </li>
                  <li>
                    <button class="ghost">${raw(svg(I.search))} Models</button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.books))} Documentation
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.settings))} Settings
                    </button>
                  </li>
                </menu>
              </section>

              <section>
                <small>Projects</small>
                <menu>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.layoutGrid))} Design Engineering
                    </button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-de-menu"
                    >
                      ${raw(svg(I.dots))}
                    </button>
                    <div
                      id="sidebar-de-menu"
                      popover
                      data-placement="right top"
                    >
                      <menu>
                        <li>
                          <button class="ghost">${raw(svg(I.eye))} View</button>
                        </li>
                        <li>
                          <button class="ghost">
                            ${raw(svg(I.share))} Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            ${raw(svg(I.trash))} Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.trendingUp))} Sales &amp; Marketing
                    </button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-sm-menu"
                    >
                      ${raw(svg(I.dots))}
                    </button>
                    <div
                      id="sidebar-sm-menu"
                      popover
                      data-placement="right top"
                    >
                      <menu>
                        <li>
                          <button class="ghost">${raw(svg(I.eye))} View</button>
                        </li>
                        <li>
                          <button class="ghost">
                            ${raw(svg(I.share))} Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            ${raw(svg(I.trash))} Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">${raw(svg(I.plane))} Travel</button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-travel-menu"
                    >
                      ${raw(svg(I.dots))}
                    </button>
                    <div
                      id="sidebar-travel-menu"
                      popover
                      data-placement="right top"
                    >
                      <menu>
                        <li>
                          <button class="ghost">${raw(svg(I.eye))} View</button>
                        </li>
                        <li>
                          <button class="ghost">
                            ${raw(svg(I.share))} Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            ${raw(svg(I.trash))} Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">${raw(svg(I.dots))} More</button>
                  </li>
                </menu>
              </section>
            </div>

            <hr />

            <footer>
              <menu>
                <li>
                  <small
                    ><button class="ghost">
                      ${raw(svg(I.lifebuoy))} Support
                    </button></small
                  >
                </li>
                <li>
                  <small
                    ><button class="ghost">
                      ${raw(svg(I.message))} Feedback
                    </button></small
                  >
                </li>
              </menu>
              <hr />
              <button
                class="ghost sidebar-user"
                popovertarget="sidebar-user-menu"
              >
                <img
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=jazz"
                  width="26"
                  height="26"
                  style="border-radius:var(--radius)"
                  alt=""
                />
                <div style="display:grid">
                  <strong>miles</strong>
                  <small>m@example.com</small>
                </div>
                <span style="display:flex;margin-left:auto">
                  ${raw(svg(I.selector))}
                </span>
              </button>
              <div id="sidebar-user-menu" popover data-placement="right bottom">
                <menu>
                  <li
                    style="display:flex;align-items:center;gap:var(--spacing-3);padding:var(--spacing-2) var(--spacing-3)"
                  >
                    <img
                      src="https://api.dicebear.com/9.x/pixel-art/svg?seed=jazz"
                      width="32"
                      height="32"
                      style="border-radius:var(--radius)"
                      alt=""
                    />
                    <div style="display:grid">
                      <strong>miles</strong>
                      <small>m@example.com</small>
                    </div>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button
                      class="ghost"
                      style="color: var(--jazz-color-2-600);"
                    >
                      ${raw(svg(I.sparkles))} Upgrade to Pro
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.userCircle))} Account
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.creditCard))} Billing
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(svg(I.bell))} Notifications
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost destructive">
                      ${raw(svg(I.logout))} Log out
                    </button>
                  </li>
                </menu>
              </div>
            </footer>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .sidebar {
    width: 230px;

    header {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
    }

    section {
      > small {
        display: block;
        color: var(--jazz-neutral-400);
        margin-block: var(--spacing-4) var(--spacing-1);
      }
    }

    details {
      border-bottom: 0;
      padding-inline: var(--spacing-3);

      summary {
        padding-block: var(--spacing-2);
      }

      menu {
        border-left: 1px solid var(--jazz-neutral-200);
        margin-left: var(--spacing-2);
        margin-block: 0 var(--spacing-4);
        padding-block: 0;

        button {
          margin-left: var(--spacing-1);
        }
      }
    }

    button {
      text-align: left;

      &:not(.square) {
        width: -webkit-fill-available;
        justify-content: flex-start;
      }
    }

    li {
      position: relative;

      button.square {
        position: absolute;
        right: 0;

        @media (hover: hover) {
          opacity: 0;
        }
      }

      &:hover,
      &:has([popover]:popover-open) {
        button.square {
          opacity: 1;
        }
      }
    }
  }
</style>

<nav class="sidebar">
  <header>
    <img
      src="https://api.dicebear.com/9.x/icons/svg?seed=Emery"
      width="32"
      height="32"
      alt="avatar"
    />
    <div style="display:grid">
      <strong>Acme Inc</strong>
      <small>Enterprise</small>
    </div>
  </header>

  <div>
    <section>
      <small>Platform</small>
      <menu>
        <li>
          <details open>
            <summary>
              <span style="display:flex;align-items:center;gap:0.5rem">
                <svg><!-- terminal-2 --></svg>
                Playground
              </span>
            </summary>
            <menu class="sidebar-submenu">
              <li><button class="ghost">History</button></li>
              <li><button class="ghost">Starred</button></li>
              <li><button class="ghost">Settings</button></li>
            </menu>
          </details>
        </li>
        <li><button class="ghost"><svg><!-- search --></svg> Models</button></li>
        <li><button class="ghost"><svg><!-- books --></svg> Documentation</button></li>
        <li><button class="ghost"><svg><!-- settings --></svg> Settings</button></li>
      </menu>
    </section>

    <section>
      <small>Projects</small>
      <menu>
        <li>
          <button class="ghost"><svg><!-- layout-grid --></svg> Design Engineering</button>
          <button class="ghost square" popovertarget="de-menu"><svg><!-- dots --></svg></button>
          <div id="de-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- trending-up --></svg> Sales &amp; Marketing</button>
          <button class="ghost square" popovertarget="sm-menu"><svg><!-- dots --></svg></button>
          <div id="sm-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- plane --></svg> Travel</button>
          <button class="ghost square" popovertarget="travel-menu"><svg><!-- dots --></svg></button>
          <div id="travel-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- dots --></svg> More</button>
        </li>
      </menu>
    </section>
  </div>

  <hr />

  <footer>
    <menu>
      <li><small>
        <button class="ghost"><svg><!-- lifebuoy --></svg> Support</button>
      </small></li>
      <li><small>
        <button class="ghost"><svg><!-- message --></svg> Feedback</button>
      </small></li>
    </menu>
    <hr />
    <button class="ghost sidebar-user" popovertarget="user-menu">
      <img src="avatar.png" width="26" height="26" alt="" />
      <div style="display:grid">
        <strong>miles</strong>
        <small>m@example.com</small>
      </div>
      <svg><!-- selector --></svg>
    </button>
    <div id="user-menu" popover data-placement="right bottom">
      <menu>
        <li style="display:flex;align-items:center;gap:var(--spacing-3);padding:var(--spacing-2) var(--spacing-3)">
          <img src="avatar.png" width="32" height="32" alt="" />
          <div style="display:grid">
            <strong>miles</strong>
            <small>m@example.com</small>
          </div>
        </li>
        <li><hr /></li>
        <li><button class="ghost" style="color: var(--jazz-color-2-600);"><svg><!-- sparkles --></svg> Upgrade to Pro</button></li>
        <li><hr /></li>
        <li><button class="ghost"><svg><!-- user-circle --></svg> Account</button></li>
        <li><button class="ghost"><svg><!-- credit-card --></svg> Billing</button></li>
        <li><button class="ghost"><svg><!-- bell --></svg> Notifications</button></li>
        <li><hr /></li>
        <li><button class="ghost destructive"><svg><!-- logout --></svg> Log out</button></li>
      </menu>
    </div>
  </footer>
</nav>`),
          )}
        </div>
      </div>
    `,
  });
}

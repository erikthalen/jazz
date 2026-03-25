import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

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

          .sidebar-label {
            display: block;
            color: var(--jazz-neutral-400);
            margin-block: var(--spacing-4) var(--spacing-1);
          }

          details {
            border-bottom: 0;
            padding-inline: var(--spacing-3);

            summary {
              padding-block: var(--spacing-2);
            }
          }

          .sidebar-submenu {
            border-left: 1px solid var(--jazz-neutral-200);
            margin-left: var(--spacing-2);
            margin-block: 0 var(--spacing-4);
            padding-block: 0;

            button {
              margin-left: var(--spacing-1);
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

              opacity: 0;
            }

            &:hover {
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
                <small class="sidebar-label">Platform</small>
                <menu>
                  <li>
                    <details open>
                      <summary>
                        <span
                          style="display:flex;align-items:center;gap:0.5rem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 7l5 5l-5 5" />
                            <path d="M13 17l6 0" />
                            <path d="M13 12l6 0" />
                            <path d="M13 7l6 0" />
                          </svg>
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
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 10a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                      Models
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6l0 13" />
                        <path d="M12 6l0 13" />
                        <path d="M21 6l0 13" />
                      </svg>
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                        />
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                      </svg>
                      Settings
                    </button>
                  </li>
                </menu>
              </section>

              <section>
                <small class="sidebar-label">Projects</small>
                <menu>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M3 5m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"
                        />
                        <path d="M3 10l18 0" />
                        <path d="M10 3l0 4" />
                        <path d="M14 3l0 4" />
                      </svg>
                      Design Engineering
                    </button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-de-menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="5" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                      </svg>
                    </button>
                    <div id="sidebar-de-menu" popover>
                      <menu>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/></svg>
                            View
                          </button>
                        </li>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/></svg>
                            Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>
                            Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3a9 9 0 1 0 9 9" />
                        <path d="M17 15l5 -5" />
                        <path d="M17 10l5 0l0 5" />
                      </svg>
                      Sales &amp; Marketing
                    </button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-sm-menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="5" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                      </svg>
                    </button>
                    <div id="sidebar-sm-menu" popover>
                      <menu>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/></svg>
                            View
                          </button>
                        </li>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/></svg>
                            Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>
                            Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7l9 -4l9 4" />
                        <path d="M3 17l9 4l9 -4" />
                        <path d="M3 7l0 10" />
                        <path d="M21 7l0 10" />
                        <path d="M12 3l0 18" />
                      </svg>
                      Travel
                    </button>
                    <button
                      class="ghost square"
                      popovertarget="sidebar-travel-menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="5" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                      </svg>
                    </button>
                    <div id="sidebar-travel-menu" popover>
                      <menu>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/></svg>
                            View
                          </button>
                        </li>
                        <li>
                          <button class="ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/></svg>
                            Share
                          </button>
                        </li>
                        <li><hr /></li>
                        <li>
                          <button class="ghost destructive">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>
                            Delete
                          </button>
                        </li>
                      </menu>
                    </div>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="5" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                      </svg>
                      More
                    </button>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path
                          d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
                        />
                      </svg>
                      Support
                    </button></small
                  >
                </li>
                <li>
                  <small
                    ><button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14l11 -11" />
                        <path
                          d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
                        />
                      </svg>
                      Feedback
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="margin-left:auto"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
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
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M11.5 17a2.5 2.5 0 1 0 0 -5a2.5 2.5 0 0 0 0 5"
                        />
                        <path
                          d="M2 12c1.6 -4.097 5.336 -7 9.5 -7c4.164 0 7.9 2.903 9.5 7c-1.6 4.097 -5.336 7 -9.5 7c-4.164 0 -7.9 -2.903 -9.5 -7"
                        />
                      </svg>
                      Upgrade to Pro
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path
                          d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
                        />
                      </svg>
                      Account
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                        />
                        <path d="M3 10l18 0" />
                      </svg>
                      Billing
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                        />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                      Notifications
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost destructive">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                        />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                      </svg>
                      Log out
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

  .sidebar-label {
    display: block;
    color: var(--jazz-neutral-400);
    margin-block: var(--spacing-4) var(--spacing-1);
  }

    details {
      border-bottom: 0;
      padding-inline: var(--spacing-3);

      summary {
        padding-block: var(--spacing-2);
      }
    }

    .sidebar-submenu {
      border-left: 1px solid var(--jazz-neutral-200);
      margin-left: var(--spacing-2);
      margin-block: 0 var(--spacing-4);
      padding-block: 0;

      button {
        margin-left: var(--spacing-1);
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
        opacity: 0;
      }

      &:hover {
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
      <small class="sidebar-label">Platform</small>
      <menu>
        <li>
          <details open>
            <summary>
              <span style="display:flex;align-items:center;gap:0.5rem">
                <svg>...</svg>
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
        <li><button class="ghost"><svg>...</svg> Models</button></li>
        <li><button class="ghost"><svg>...</svg> Documentation</button></li>
        <li><button class="ghost"><svg>...</svg> Settings</button></li>
      </menu>
    </section>

    <section>
      <small class="sidebar-label">Projects</small>
      <menu>
        <li>
          <button class="ghost"><svg>...</svg> Design Engineering</button>
          <button class="ghost square" popovertarget="de-menu"><svg>...</svg></button>
          <div id="de-menu" popover>
            <menu>
              <li><button class="ghost"><svg>...</svg> View</button></li>
              <li><button class="ghost"><svg>...</svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg>...</svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg>...</svg> Sales &amp; Marketing</button>
          <button class="ghost square" popovertarget="sm-menu"><svg>...</svg></button>
          <div id="sm-menu" popover>
            <menu>
              <li><button class="ghost"><svg>...</svg> View</button></li>
              <li><button class="ghost"><svg>...</svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg>...</svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg>...</svg> Travel</button>
          <button class="ghost square" popovertarget="travel-menu"><svg>...</svg></button>
          <div id="travel-menu" popover>
            <menu>
              <li><button class="ghost"><svg>...</svg> View</button></li>
              <li><button class="ghost"><svg>...</svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg>...</svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg>...</svg> More</button>
        </li>
      </menu>
    </section>
  </div>

  <hr />

  <footer>
    <menu>
      <li><small><button class="ghost"><svg>...</svg> Support</button></small></li>
      <li><small><button class="ghost"><svg>...</svg> Feedback</button></small></li>
    </menu>
    <hr />
    <button class="ghost sidebar-user" popovertarget="user-menu">
      <img src="avatar.png" width="26" height="26" alt="" />
      <div style="display:grid">
        <strong>miles</strong>
        <small>m@example.com</small>
      </div>
      <svg style="margin-left:auto">...</svg>
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
        <li><button class="ghost"><svg>...</svg> Upgrade to Pro</button></li>
        <li><hr /></li>
        <li><button class="ghost"><svg>...</svg> Account</button></li>
        <li><button class="ghost"><svg>...</svg> Billing</button></li>
        <li><button class="ghost"><svg>...</svg> Notifications</button></li>
        <li><hr /></li>
        <li><button class="ghost destructive"><svg>...</svg> Log out</button></li>
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

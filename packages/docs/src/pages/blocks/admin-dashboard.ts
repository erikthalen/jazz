import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

const tasks = [
  {
    id: "TASK-8782",
    type: "Feature",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel.",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7878",
    type: "Bug",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-7839",
    type: "Feature",
    title: "We need to bypass the neural TCP card!",
    status: "Todo",
    priority: "High",
  },
  {
    id: "TASK-5562",
    type: "Feature",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-8686",
    type: "Bug",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "Canceled",
    priority: "Medium",
  },
  {
    id: "TASK-1280",
    type: "Documentation",
    title:
      "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-7262",
    type: "Feature",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1138",
    type: "Feature",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7184",
    type: "Bug",
    title: "We need to program the back-end THX pixel!",
    status: "Todo",
    priority: "Low",
  },
  {
    id: "TASK-5160",
    type: "Documentation",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "In Progress",
    priority: "High",
  },
];

const statusIcon: Record<string, string> = {
  Todo: icon("circle", { size: 14 }),
  "In Progress": icon("loader-2", { size: 14 }),
  Done: icon("circle-check", { size: 14 }),
  Canceled: icon("circle-x", { size: 14 }),
  Backlog: icon("circle-dashed", { size: 14 }),
};

const priorityIcon: Record<string, string> = {
  High: icon("arrow-up", { size: 14 }),
  Medium: icon("minus", { size: 14 }),
  Low: icon("arrow-down", { size: 14 }),
};

const typeColor: Record<string, string> = {
  Feature: "color2",
  Bug: "destructive",
  Documentation: "neutral",
};

export async function AdminDashboardPage(path: string) {
  return Layout({
    title: "Admin Dashboard",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Admin Dashboard</h1>
          <p>
            A task management dashboard with a sidebar, filterable data table,
            status and priority badges, and row actions.
          </p>
        </hgroup>
      </div>

      <div class="example">
        <div
          class="preview"
          style="padding:0;align-items:stretch;justify-content:stretch;min-height:600px"
        >
          <style>
            .admin-layout {
              display: grid;
              grid-template-columns: 220px 1fr;
              width: 100%;
              min-height: 560px;
            }

            .admin-sidebar {
              border-right: 1px solid var(--jazz-neutral-200);
              padding: 1rem 0.5rem;
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
            }

            .admin-main {
              display: flex;
              flex-direction: column;
              padding: 1.5rem 2rem;
              gap: 1rem;
              min-width: 0;
            }

            .admin-toolbar {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              flex-wrap: wrap;
            }

            .admin-toolbar label:has(input[type="search"]) {
              flex: 0 1 240px;
            }

            .task-table {
              table-layout: fixed;
              white-space: normal;
            }

            .task-table td,
            .task-table th {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .task-table td:nth-child(3) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .task-row-actions {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 0.25rem;
            }
          </style>

          <div class="admin-layout">
            <!-- Sidebar -->
            <aside class="admin-sidebar">
              <menu>
                <li><small>General</small></li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("home", { size: 14 }))} Dashboard
                    </a></small
                  >
                </li>
                <li>
                  <small
                    ><a class="button ghost" href="#" aria-current="page">
                      ${raw(icon("clipboard-list", { size: 14 }))} Tasks
                    </a></small
                  >
                </li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("download", { size: 14 }))} Apps
                    </a></small
                  >
                </li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("message", { size: 14 }))} Chats
                      <span class="badge" style="margin-left:auto">3</span>
                    </a></small
                  >
                </li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("users", { size: 14 }))} Users
                    </a></small
                  >
                </li>
                <li><small>Settings</small></li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("settings", { size: 14 }))} Settings
                    </a></small
                  >
                </li>
                <li>
                  <small
                    ><a class="button ghost" href="#">
                      ${raw(icon("help-circle", { size: 14 }))} Help Center
                    </a></small
                  >
                </li>
              </menu>
            </aside>

            <!-- Main -->
            <main class="admin-main">
              <div
                style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem"
              >
                <div>
                  <h2 style="margin:0 0 0.25rem">Tasks</h2>
                  <p
                    style="margin:0;color:var(--jazz-neutral-500);font-size:0.875rem"
                  >
                    Here's a list of your tasks for this month.
                  </p>
                </div>
                <div style="display:flex;gap:0.5rem;flex-shrink:0">
                  <button class="outline">
                    ${raw(icon("download", { size: 14 }))} Import
                  </button>
                  <button>${raw(icon("plus", { size: 14 }))} Create</button>
                </div>
              </div>

              <!-- Toolbar -->
              <div class="admin-toolbar">
                <label>
                  ${raw(icon("search", { size: 14 }))}
                  <input type="search" placeholder="Filter tasks..." />
                </label>
                <button class="outline">
                  ${raw(icon("circle-dot", { size: 14 }))} Status
                </button>
                <button class="outline">
                  ${raw(icon("arrow-up", { size: 14 }))} Priority
                </button>
                <button class="outline" style="margin-left:auto">
                  ${raw(icon("adjustments-horizontal", { size: 14 }))} View
                </button>
              </div>

              <!-- Table -->
              <table
                class="task-table"
                style="--cols: 90px 80px 1fr 130px 100px 36px"
              >
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${tasks.map(
                    (task, i) => html`
                      <tr>
                        <td
                          style="color:var(--jazz-neutral-500);font-size:0.8125rem"
                        >
                          ${task.id}
                        </td>
                        <td>
                          <span class="badge ${typeColor[task.type]}"
                            >${task.type}</span
                          >
                        </td>
                        <td>${task.title}</td>
                        <td>
                          <span
                            style="display:flex;align-items:center;gap:0.375rem;color:var(--jazz-neutral-600)"
                          >
                            ${raw(statusIcon[task.status] ?? "")} ${task.status}
                          </span>
                        </td>
                        <td>
                          <span
                            style="display:flex;align-items:center;gap:0.375rem;color:var(--jazz-neutral-600)"
                          >
                            ${raw(priorityIcon[task.priority] ?? "")}
                            ${task.priority}
                          </span>
                        </td>
                        <td>
                          <div class="task-row-actions">
                            <button
                              class="ghost square"
                              style="anchor-name:--task-actions-${i}"
                              popovertarget="task-actions-${i}"
                            >
                              ${raw(icon("dots", { size: 14 }))}
                            </button>
                            <div
                              id="task-actions-${i}"
                              popover
                              style="position-anchor:--task-actions-${i};top:anchor(bottom);right:anchor(right);left:unset;margin:0"
                            >
                              <menu>
                                <li><button class="ghost">Edit</button></li>
                                <li>
                                  <button class="ghost">Duplicate</button>
                                </li>
                                <li><hr /></li>
                                <li>
                                  <button class="ghost">Mark as done</button>
                                </li>
                                <li><hr /></li>
                                <li>
                                  <button class="ghost destructive">
                                    Delete
                                  </button>
                                </li>
                              </menu>
                            </div>
                          </div>
                        </td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>

              <!-- Pagination -->
              <div
                style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:auto;padding-top:0.5rem;font-size:0.875rem;color:var(--jazz-neutral-500)"
              >
                <span>0 of 100 row(s) selected.</span>
                <div style="display:flex;align-items:center;gap:1rem">
                  <span>Rows per page</span>
                  <select style="width:auto">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span>Page 1 of 10</span>
                  <fieldset role="group">
                    <button class="outline square" disabled>
                      ${raw(icon("chevrons-left", { size: 14 }))}
                    </button>
                    <button class="outline square" disabled>
                      ${raw(icon("chevron-left", { size: 14 }))}
                    </button>
                    <button class="outline square">
                      ${raw(icon("chevron-right", { size: 14 }))}
                    </button>
                    <button class="outline square">
                      ${raw(icon("chevrons-right", { size: 14 }))}
                    </button>
                  </fieldset>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .admin-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
  }

  .admin-sidebar {
    border-right: 1px solid var(--jazz-neutral-200);
    padding: 1rem 0.5rem;
  }

  .admin-main {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    gap: 1rem;
  }

  .task-table {
    --cols: 90px 80px 1fr 130px 100px 36px;
  }
</style>

<div class="admin-layout">
  <aside class="admin-sidebar">
    <menu>
      <li><small>General</small></li>
      <li><small><a class="button ghost" href="#">Dashboard</a></small></li>
      <li><small><a class="button ghost" href="#" aria-current="page">Tasks</a></small></li>
      <li><small><a class="button ghost" href="#">
        Chats
        <span class="badge" style="margin-left:auto">3</span>
      </a></small></li>
      <li><small>Settings</small></li>
      <li><small><a class="button ghost" href="#">Settings</a></small></li>
      <li><small><a class="button ghost" href="#">Help Center</a></small></li>
    </menu>
  </aside>

  <main class="admin-main">
    <div style="display:flex;justify-content:space-between;gap:1rem">
      <div>
        <h2>Tasks</h2>
        <p>Here's a list of your tasks for this month.</p>
      </div>
      <div style="display:flex;gap:0.5rem">
        <button class="outline">Import</button>
        <button>Create</button>
      </div>
    </div>

    <div style="display:flex;gap:0.5rem">
      <label>
        <svg><!-- search icon --></svg>
        <input type="search" placeholder="Filter tasks..." />
      </label>
      <button class="outline">Status</button>
      <button class="outline">Priority</button>
      <button class="outline" style="margin-left:auto">View</button>
    </div>

    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Type</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TASK-8782</td>
          <td><span class="badge color2">Feature</span></td>
          <td>You can't compress the program without quantifying...</td>
          <td>In Progress</td>
          <td>Medium</td>
          <td>
            <button class="ghost square" style="anchor-name:--row-1" popovertarget="row-actions-1">...</button>
            <div id="row-actions-1" popover style="position-anchor:--row-1;top:anchor(bottom);right:anchor(right);left:unset;margin:0">
              <menu>
                <li><button class="ghost">Edit</button></li>
                <li><button class="ghost">Duplicate</button></li>
                <li><hr /></li>
                <li><button class="ghost">Mark as done</button></li>
                <li><hr /></li>
                <li><button class="ghost destructive">Delete</button></li>
              </menu>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="display:flex;justify-content:space-between;align-items:center">
      <span>0 of 100 row(s) selected.</span>
      <div style="display:flex;align-items:center;gap:1rem">
        <span>Rows per page</span>
        <select style="width:auto"><option>10</option></select>
        <span>Page 1 of 10</span>
        <fieldset role="group">
          <button class="outline square" disabled>«</button>
          <button class="outline square" disabled>‹</button>
          <button class="outline square">›</button>
          <button class="outline square">»</button>
        </fieldset>
      </div>
    </div>
  </main>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

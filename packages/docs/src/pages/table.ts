import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "custom-columns", label: "Custom columns" },
];

export async function TablePage(path: string) {
  return Layout({
    title: "Table",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Table</h1>
        <p class="lead">
          A data table built with the native <code>&lt;table&gt;</code> element,
          laid out using CSS grid and subgrid for precise column alignment.
        </p>

        <h2 id="default">Default</h2>
        <p>
          Column count is detected automatically from the header row. All rows
          inherit the same grid via <code>subgrid</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
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
        <div class="code-block">
          ${raw(
            await highlight(`<table>
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
  </tbody>
</table>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="custom-columns">Custom columns</h2>
        <p>
          Set <code>--cols</code> on the table to override the default equal
          widths with any grid template value.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table style="--cols: 2fr 1fr 1fr 80px">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly subscription</td>
                <td>Mar 1</td>
                <td>Software</td>
                <td>$12.00</td>
              </tr>
              <tr>
                <td>Office supplies</td>
                <td>Mar 8</td>
                <td>Equipment</td>
                <td>$34.50</td>
              </tr>
              <tr>
                <td>Team lunch</td>
                <td>Mar 15</td>
                <td>Food</td>
                <td>$87.20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table style="--cols: 2fr 1fr 1fr 80px">
  <thead>
    <tr>
      <th>Description</th>
      <th>Date</th>
      <th>Category</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monthly subscription</td>
      <td>Mar 1</td>
      <td>Software</td>
      <td>$12.00</td>
    </tr>
  </tbody>
</table>`),
          )}
        </div>
      </div>
    `,
  });
}

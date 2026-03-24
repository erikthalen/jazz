import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "multiple", label: "Multiple groups" },
];

export async function ToggleGroupPage(path: string) {
  return Layout({
    title: "Toggle Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <h1>Toggle Group</h1>
        <p class="lead">
          A group of mutually exclusive or independent toggle buttons, built with
          <code>&lt;label class="toggle"&gt;</code> inside a
          <code>&lt;fieldset role="group"&gt;</code>.
        </p>

        <h2 id="default">Default</h2>
        <p>Use radio inputs for mutually exclusive options.</p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <label class="toggle square" aria-label="Align left">
              <input type="radio" name="align-default" />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
            </label>
            <label class="toggle square" aria-label="Align center">
              <input type="radio" name="align-default" checked />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
            </label>
            <label class="toggle square" aria-label="Align right">
              <input type="radio" name="align-default" />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <label class="toggle square" aria-label="Align left">
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align center">
    <input type="radio" name="align" checked />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align right">
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple groups</h2>
        <p>Place groups next to each other to build toolbar-style layouts. Use checkboxes for independent toggles.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="display:flex;gap:0.5rem">
            <fieldset role="group">
              <label class="toggle square" aria-label="Align left">
                <input type="radio" name="align-multi" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
              </label>
              <label class="toggle square" aria-label="Align center">
                <input type="radio" name="align-multi" checked />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
              </label>
              <label class="toggle square" aria-label="Align right">
                <input type="radio" name="align-multi" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
              </label>
            </fieldset>
            <fieldset role="group">
              <label class="toggle square" aria-label="Bold">
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
              </label>
              <label class="toggle square" aria-label="Italic">
                <input type="checkbox" checked />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
              </label>
              <label class="toggle square" aria-label="Underline">
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
              </label>
            </fieldset>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display:flex;gap:0.5rem">
  <fieldset role="group">
    <label class="toggle square" aria-label="Align left">
      <input type="radio" name="align" />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Align center">
      <input type="radio" name="align" checked />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Align right">
      <input type="radio" name="align" />
      <svg>...</svg>
    </label>
  </fieldset>
  <fieldset role="group">
    <label class="toggle square" aria-label="Bold">
      <input type="checkbox" />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Italic">
      <input type="checkbox" checked />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Underline">
      <input type="checkbox" />
      <svg>...</svg>
    </label>
  </fieldset>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}

import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

export async function SignupFormPage(path: string) {
  return Layout({
    title: "Signup Form",
    path,
    content: html`
      <div class="prose">
        <h1>Signup Form</h1>
        <p class="lead">
          A full account creation form with social login options, built from
          native form elements and Jazz components.
        </p>
      </div>

      <div class="example">
        <div class="preview" style="justify-content:center">
          <form
            style="display:flex;flex-direction:column;gap:var(--spacing-4);width:100%;max-width:420px;"
          >
            <header style="text-align:center">
              <h2 style="margin-bottom:var(--spacing-1)">Create your account</h2>
              <p style="color:var(--jazz-neutral-400)">Enter your email below to create your account</p>
            </header>

            <label class="field">
              Email
              <input type="email" placeholder="coolcat@example.com" />
              <small>We'll use this to contact you. We will not share your email with anyone else.</small>
            </label>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-3)">
              <label class="field">
                Password
                <input type="password" minlength="8" />
              </label>
              <label class="field">
                Confirm Password
                <input type="password" minlength="8" />
              </label>
            </div>
            <small style="text-align:left;margin-top:calc(var(--spacing-1) * -1)">Must be at least 8 characters long.</small>

            <button type="submit">Create Account</button>

            <div style="display:flex;align-items:center;gap:var(--spacing-3)">
              <hr style="flex:1" />
              <small style="color:var(--jazz-neutral-400)">Or continue with</small>
              <hr style="flex:1" />
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--spacing-3)">
              <button type="button" class="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-brand-apple"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" /><path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" /></svg>
              </button>
              <button type="button" class="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
              </button>
              <button type="button" class="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z" /></svg>
              </button>
            </div>

            <footer style="color:var(--jazz-neutral-400);text-align:center">
              Already have an account? <a href="#">Sign in</a>
            </footer>
          </form>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    width: 100%;
    max-width: 420px;
    }
    
  header, footer {
    text-align: center;
  }

  .password-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3);
    text-align: left;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  .divider hr {
    flex: 1;
  }

  .social-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-3);
  }
</style>

<form>
  <header>
    <h2>Create your account</h2>
    <p style="color: var(--jazz-neutral-400)">Enter your email below to create your account</p>
  </header>

  <label class="field" style="">
    Email
    <input type="email" placeholder="coolcat@example.com" />
    <small>
    We'll use this to contact you. We will not share your email with anyone else.
    </small>
  </label>

  <div class="password-row">
    <label class="field">
      Password
      <input type="password" minlength="8" />
    </label>
    <label class="field">
      Confirm Password
      <input type="password" minlength="8" />
    </label>
  </div>
  <small>Must be at least 8 characters long.</small>

  <button type="submit">Create Account</button>

  <div class="divider">
    <hr />
    <small style="color:var(--jazz-neutral-400)">Or continue with</small>
    <hr />
  </div>

  <div class="social-row">
    <button type="button" class="outline"><svg>...</svg></button>
    <button type="button" class="outline"><svg>...</svg></button>
    <button type="button" class="outline"><svg>...</svg></button>
  </div>

  <footer style="color:var(--jazz-neutral-400)">Already have an account? <a href="#">Sign in</a></footer>
</form>`))}
        </div>
      </div>
    `,
  });
}

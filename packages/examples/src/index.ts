import { Hono } from "hono";
import { HomePage } from "./pages/home";
import { TailwindPage } from "./pages/tailwind";

const app = new Hono();

app.get("/", (c) => c.html(HomePage()));
app.get("/tailwind", (c) => c.html(TailwindPage(c.req.path)));

export default app;

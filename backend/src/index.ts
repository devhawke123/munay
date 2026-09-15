import { app } from "./app.js";

const port = Number(process.env.PORT) || 3001;

// Local / traditional host only — Vercel imports `app` via /api
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Munay API listening on http://localhost:${port}`);
  });
}
export default app;

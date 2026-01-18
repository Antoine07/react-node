import http from "node:http";
import { createRouter } from "./router.js";
import { sendJson } from "./utils/http.js";

const PORT = process.env.PORT ?? 3000;

const router = createRouter();

router.add("GET", "/health", (req, res) => {
  sendJson(res, 200, { ok: true });
});

router.add("GET", "/posts/:id", (req, res, { params }) => {
  sendJson(res, 200, { ok: true, id: params.id });
});

const server = http.createServer(async (req, res) => {
  const handled = await router.handle(req, res);
  if (!handled) sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


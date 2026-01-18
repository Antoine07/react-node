import http from "node:http";
import { createRouter } from "./router.js";
import { HttpError, sendJson } from "./utils/http.js";
import { registerPostsRoutes } from "./posts/postsRoutes.js";

const PORT = process.env.PORT ?? 3000;

const router = createRouter();

router.add("GET", "/health", (req, res) => {
  sendJson(res, 200, { ok: true });
});

registerPostsRoutes(router);

const server = http.createServer(async (req, res) => {
  try {
    const handled = await router.handle(req, res);
    if (!handled) sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    if (error instanceof HttpError) {
      return sendJson(res, error.statusCode, error.publicBody);
    }
    console.error(error);
    sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


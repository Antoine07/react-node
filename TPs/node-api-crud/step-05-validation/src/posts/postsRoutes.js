import { HttpError, readJsonBody, sendJson, sendNoContent } from "../utils/http.js";
import {
  createPost,
  deletePost,
  getPostById,
  listPosts,
  updatePost
} from "./postsRepository.js";
import { postInputSchema } from "./postInputSchema.js";
import { formatZodError } from "./formatZodError.js";

function parseId(params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) throw new HttpError(400, { error: "Invalid id" });
  return id;
}

function validateOrThrow(input) {
  // TODO:
  // - utiliser postInputSchema.safeParse(input)
  // - si invalid: throw HttpError(422, { error: "ValidationError", details: ... })
  // - sinon retourner les données validées (result.data)
  void input;
  throw new HttpError(501, { error: "TODO" });
}

export function registerPostsRoutes(router) {
  router.add("GET", "/posts", (req, res) => {
    sendJson(res, 200, listPosts());
  });

  router.add("GET", "/posts/:id", (req, res, { params }) => {
    const id = parseId(params);
    const post = getPostById(id);
    if (!post) return sendJson(res, 404, { error: "Not found" });
    sendJson(res, 200, post);
  });

  router.add("POST", "/posts", async (req, res) => {
    const body = await readJsonBody(req);
    const data = validateOrThrow(body);
    const post = createPost({ title: data.title, content: data.content });
    sendJson(res, 201, post);
  });

  router.add("PUT", "/posts/:id", async (req, res, { params }) => {
    const id = parseId(params);
    const body = await readJsonBody(req);
    const data = validateOrThrow(body);
    const post = updatePost(id, { title: data.title, content: data.content });
    if (!post) return sendJson(res, 404, { error: "Not found" });
    sendJson(res, 200, post);
  });

  router.add("DELETE", "/posts/:id", (req, res, { params }) => {
    const id = parseId(params);
    const deleted = deletePost(id);
    if (!deleted) return sendJson(res, 404, { error: "Not found" });
    sendNoContent(res);
  });
}

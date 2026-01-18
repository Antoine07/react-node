import { HttpError, readJsonBody, sendJson } from "../utils/http.js";
import {
  createPost,
  deletePost,
  getPostById,
  listPosts,
  updatePost
} from "./postsRepository.js";

export function registerPostsRoutes(router) {
  router.add("GET", "/posts", (req, res) => {
    sendJson(res, 200, listPosts());
  });

  router.add("GET", "/posts/:id", (req, res, { params }) => {
    const id = Number(params.id);
    const post = getPostById(id);
    if (!post) return sendJson(res, 404, { error: "Not found" });
    sendJson(res, 200, post);
  });

  router.add("POST", "/posts", async (req, res) => {
    // TODO: lire le body JSON
    // TODO: créer le post
    // TODO: renvoyer 201 + post
    throw new HttpError(501, { error: "TODO" });
  });

  router.add("PUT", "/posts/:id", async (req, res, { params }) => {
    // TODO: lire le body JSON
    // TODO: modifier le post
    // TODO: si introuvable => 404
    // TODO: sinon 200 + post
    throw new HttpError(501, { error: "TODO" });
  });

  router.add("DELETE", "/posts/:id", (req, res, { params }) => {
    // TODO: supprimer le post
    // TODO: si introuvable => 404
    // TODO: sinon 204 (sans body)
    const id = Number(params.id);
    void id;
    throw new HttpError(501, { error: "TODO" });
  });
}


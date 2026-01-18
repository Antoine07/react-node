// Stockage en mémoire (tableau)
const posts = [];
let nextId = 1;

export function listPosts() {
  return posts;
}

export function getPostById(id) {
  return posts.find((p) => p.id === id) ?? null;
}

export function createPost({ title, content }) {
  // TODO: créer un post avec id + datetime
  return null;
}

export function updatePost(id, { title, content }) {
  // TODO: modifier title/content si le post existe
  // TODO: retourner le post mis à jour, ou null si introuvable
  return null;
}

export function deletePost(id) {
  // TODO: supprimer un post
  // TODO: retourner true si supprimé, sinon false
  return false;
}


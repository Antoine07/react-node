const posts = [];
let nextId = 1;

export function listPosts() {
  return posts;
}

export function getPostById(id) {
  return posts.find((p) => p.id === id) ?? null;
}

export function createPost({ title, content }) {
  const post = {
    id: nextId,
    title,
    content,
    datetime: new Date().toISOString()
  };
  nextId += 1;
  posts.push(post);
  return post;
}

export function updatePost(id, { title, content }) {
  const post = getPostById(id);
  if (!post) return null;
  post.title = title;
  post.content = content;
  return post;
}

export function deletePost(id) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}


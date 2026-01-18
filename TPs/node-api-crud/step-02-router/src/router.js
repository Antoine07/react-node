function matchPath(pattern, pathname) {
  // TODO:
  // - pattern: /posts/:id
  // - pathname: /posts/42
  // - retourner { id: "42" } si match, sinon null
  return null;
}

export function createRouter() {
  // TODO: stocker les routes ici

  function add(method, path, handler) {
    // TODO
  }

  async function handle(req, res) {
    // TODO:
    // - parser req.url (pathname + query)
    // - trouver une route qui match (method + path)
    // - appeler handler(req, res, { params, query })
    // - retourner true si une route a été exécutée, sinon false
    return false;
  }

  return { add, handle };
}


function splitPath(path) {
  return path.split("/").filter(Boolean);
}

function matchPath(pattern, pathname) {
  const patternParts = splitPath(pattern);
  const pathParts = splitPath(pathname);

  if (patternParts.length !== pathParts.length) return null;

  const params = {};

  for (let index = 0; index < patternParts.length; index += 1) {
    const patternPart = patternParts[index];
    const pathPart = pathParts[index];

    if (patternPart.startsWith(":")) {
      const name = patternPart.slice(1);
      params[name] = pathPart;
      continue;
    }

    if (patternPart !== pathPart) return null;
  }

  return params;
}

export function createRouter() {
  const routes = [];

  function add(method, path, handler) {
    routes.push({ method, path, handler });
  }

  async function handle(req, res) {
    const method = req.method ?? "GET";
    const url = new URL(req.url ?? "/", "http://localhost");
    const pathname = url.pathname;
    const query = Object.fromEntries(url.searchParams.entries());

    for (const route of routes) {
      if (route.method !== method) continue;
      const params = matchPath(route.path, pathname);
      if (!params) continue;
      await route.handler(req, res, { params, query });
      return true;
    }

    return false;
  }

  return { add, handle };
}


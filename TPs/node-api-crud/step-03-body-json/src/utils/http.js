export class HttpError extends Error {
  constructor(statusCode, publicBody) {
    super(publicBody?.error ?? "HttpError");
    this.statusCode = statusCode;
    this.publicBody = publicBody;
  }
}

export function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

export async function readJsonBody(req, options = {}) {
  // TODO:
  // - accumuler les chunks
  // - limiter la taille via options.maxBytes (par ex. 1_000_000)
  // - parser JSON
  // - en cas d'erreur: throw new HttpError(400, { error: "Invalid JSON" })
  throw new HttpError(501, { error: "TODO" });
}


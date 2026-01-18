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

export function sendNoContent(res) {
  res.statusCode = 204;
  res.end();
}

export async function readJsonBody(req, options = {}) {
  const maxBytes = options.maxBytes ?? 1_000_000;

  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) {
      throw new HttpError(413, { error: "Payload too large" });
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, { error: "Invalid JSON" });
  }
}


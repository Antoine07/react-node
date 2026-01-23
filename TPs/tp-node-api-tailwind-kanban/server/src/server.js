import http from "node:http";
import { initialTasks } from "./tasks.js";

const PORT = Number(process.env.PORT ?? 3001);

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

const allowedOrigins = (process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : defaultAllowedOrigins
)
  .map((o) => o.trim())
  .filter(Boolean);

const validStatuses = new Set(["todo", "doing", "done"]);
const tasks = initialTasks.map((task) => ({ ...task }));
let nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;

  if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function sendNoContent(res) {
  res.statusCode = 204;
  res.end();
}

function sendError(res, statusCode, code, message, details) {
  sendJson(res, statusCode, {
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  });
}

async function readJsonBody(req, { maxBytes = 100_000 } = {}) {
  const contentType = String(req.headers["content-type"] ?? "");
  if (!contentType.includes("application/json")) {
    return { ok: false, statusCode: 415, error: "Content-Type must be application/json" };
  }

  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > maxBytes) {
      return { ok: false, statusCode: 413, error: `Body too large (>${maxBytes} bytes)` };
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return { ok: true, data: null };

  try {
    return { ok: true, data: JSON.parse(raw) };
  } catch {
    return { ok: false, statusCode: 400, error: "Invalid JSON" };
  }
}

function validateTaskCreate(payload) {
  const errors = {};

  const title = typeof payload?.title === "string" ? payload.title.trim() : "";
  if (title.length < 2) errors.title = "Title must be at least 2 characters";
  if (title.length > 80) errors.title = "Title must be at most 80 characters";

  const description =
    payload?.description === undefined
      ? ""
      : typeof payload?.description === "string"
        ? payload.description.trim()
        : null;
  if (description === null) errors.description = "Description must be a string";
  if (typeof description === "string" && description.length > 500) {
    errors.description = "Description must be at most 500 characters";
  }

  const status =
    payload?.status === undefined
      ? "todo"
      : typeof payload?.status === "string"
        ? payload.status.trim()
        : "";
  if (!validStatuses.has(status)) {
    errors.status = "Status must be one of: todo, doing, done";
  }

  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, value: { title, description: description ?? "", status } };
}

function validateTaskPatch(payload) {
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, errors: { body: "Body must be a JSON object" } };
  }

  const errors = {};
  const out = {};

  if ("title" in payload) {
    const title = typeof payload.title === "string" ? payload.title.trim() : "";
    if (title.length < 2) errors.title = "Title must be at least 2 characters";
    if (title.length > 80) errors.title = "Title must be at most 80 characters";
    if (!errors.title) out.title = title;
  }

  if ("description" in payload) {
    if (payload.description === null) {
      out.description = "";
    } else if (typeof payload.description === "string") {
      const description = payload.description.trim();
      if (description.length > 500) errors.description = "Description must be at most 500 characters";
      if (!errors.description) out.description = description;
    } else {
      errors.description = "Description must be a string (or null to clear)";
    }
  }

  if ("status" in payload) {
    const status = typeof payload.status === "string" ? payload.status.trim() : "";
    if (!validStatuses.has(status)) errors.status = "Status must be one of: todo, doing, done";
    if (!errors.status) out.status = status;
  }

  if (Object.keys(out).length === 0) {
    errors.body = "Provide at least one of: title, description, status";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: out };
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/tasks") {
    if (req.method === "GET") {
      const status = url.searchParams.get("status");
      const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
      const limitParam = url.searchParams.get("limit");
      const limit = limitParam ? Number(limitParam) : undefined;
      const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : undefined;

      const filtered = tasks.filter((task) => {
        if (status && task.status !== status) return false;
        if (q) {
          const hay = `${task.title} ${task.description}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      sendJson(res, 200, safeLimit ? filtered.slice(0, safeLimit) : filtered);
      return;
    }

    if (req.method === "POST") {
      const body = await readJsonBody(req);
      if (!body.ok) {
        sendError(res, body.statusCode, "INVALID_BODY", body.error);
        return;
      }

      const validation = validateTaskCreate(body.data);
      if (!validation.ok) {
        sendError(res, 422, "VALIDATION_ERROR", "Invalid task payload", validation.errors);
        return;
      }

      const now = new Date().toISOString();
      const task = { id: nextId++, createdAt: now, ...validation.value };
      tasks.push(task);
      sendJson(res, 201, task);
      return;
    }

    sendError(res, 405, "METHOD_NOT_ALLOWED", "Method not allowed");
    return;
  }

  const taskIdMatch = url.pathname.match(/^\/api\/tasks\/([^/]+)$/);
  if (taskIdMatch) {
    const id = parseId(taskIdMatch[1]);
    if (!id) {
      sendError(res, 400, "INVALID_ID", "Task id must be a positive integer");
      return;
    }

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      sendError(res, 404, "NOT_FOUND", "Task not found");
      return;
    }

    if (req.method === "GET") {
      sendJson(res, 200, task);
      return;
    }

    if (req.method === "PATCH") {
      const body = await readJsonBody(req);
      if (!body.ok) {
        sendError(res, body.statusCode, "INVALID_BODY", body.error);
        return;
      }

      const validation = validateTaskPatch(body.data);
      if (!validation.ok) {
        sendError(res, 422, "VALIDATION_ERROR", "Invalid patch payload", validation.errors);
        return;
      }

      Object.assign(task, validation.value);
      sendJson(res, 200, task);
      return;
    }

    if (req.method === "DELETE") {
      const index = tasks.findIndex((t) => t.id === id);
      tasks.splice(index, 1);
      sendNoContent(res);
      return;
    }

    sendError(res, 405, "METHOD_NOT_ALLOWED", "Method not allowed");
    return;
  }

  sendError(res, 404, "NOT_FOUND", "Not found");
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});

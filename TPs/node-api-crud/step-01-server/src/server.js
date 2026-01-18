import http from "node:http";

const PORT = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  // TODO: renvoyer du JSON (Content-Type)
  // TODO: gérer GET /health
  // TODO: sinon 404 Not found
  res.statusCode = 501;
  res.end("TODO");
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


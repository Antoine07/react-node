# Step 01 — Serveur minimal

## À faire

Dans `src/server.js`:
- `GET /health` → `200` `{ "ok": true }`
- Tout le reste → `404` `{ "error": "Not found" }`

## Lancer

```bash
npm run dev
```

## Tester

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/unknown
```


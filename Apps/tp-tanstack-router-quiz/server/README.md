# API Node.js — Questions (CORS)

## Lancer

```bash
npm run dev
```

Serveur: `http://localhost:3001`

## Endpoints

- `GET /health` → `{ "ok": true }`
- `GET /api/questions` → liste JSON des questions
- `GET /api/questions?limit=2` → limite le nombre de questions

## CORS

Par défaut, l’API autorise `http://localhost:5173` (Vite).

Vous pouvez surcharger avec:

```bash
CORS_ORIGIN=http://localhost:5173,http://localhost:4173 npm run dev
```

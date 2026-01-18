# TP — Mini API Node.js (CRUD `posts`)

Ressource `post`:

```json
{
  "id": 1,
  "title": "Mon titre",
  "content": "Mon contenu",
  "datetime": "2026-01-18T20:00:00.000Z"
}
```

## Étapes

- `step-01-server`: serveur HTTP + `GET /health`
- `step-02-router`: router (routes + params)
- `step-03-body-json`: lecture body + parsing JSON
- `step-04-crud-posts`: CRUD complet en mémoire
- `step-05-validation`: validation + erreurs cohérentes

Chaque dossier est un mini-projet exécutable:

```bash
cd TPs/node-api-crud/step-01-server
npm run dev
```

## Tests manuels (exemples)

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/posts
curl -i -X POST http://localhost:3000/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hello","content":"World"}'
```


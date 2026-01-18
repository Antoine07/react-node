# Step 02 — Router

## À faire

Implémenter `createRouter()` dans `src/router.js`:
- enregistrer des routes via `add(method, path, handler)`
- exécuter un handler via `handle(req, res)`
- supporter les paramètres d'URL: `/posts/:id`

## Lancer

```bash
npm run dev
```

## Tester

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/posts/42
```


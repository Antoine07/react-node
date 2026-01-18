# Step 03 — Body JSON

## À faire

Dans `src/utils/http.js`:
- Implémenter `readJsonBody(req, options)`
- Gérer:
  - JSON invalide → `400`
  - body trop gros → `413` (option: `maxBytes`)

## Lancer

```bash
npm run dev
```

## Tester

```bash
curl -i -X POST http://localhost:3000/echo \
  -H 'Content-Type: application/json' \
  -d '{"hello":"world"}'
```


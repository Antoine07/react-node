# Step 05 — Validation + erreurs

## À faire

Sur `POST /posts` et `PUT /posts/:id`:
- `title` obligatoire (string non vide)
- `content` obligatoire (string non vide)

Vous devez utiliser **Zod** pour valider le body JSON.

Si invalide:
- `422` + JSON:

```json
{ "error": "ValidationError", "details": [{ "path": "title", "message": "Required" }] }
```

## Installer

```bash
npm i
```

## Lancer

```bash
npm run dev
```

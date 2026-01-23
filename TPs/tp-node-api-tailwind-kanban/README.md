# TP — React (JSX) + Tailwind CSS — Kanban “Tasks” (avec API Node.js)

## Objectif

Créer une mini app React en **JSX (pas de TypeScript)**, stylée avec **Tailwind CSS**, qui consomme une **API Node.js** pour gérer une ressource `task` (CRUD).

Seul est demandé l'affichage du kanban donc seulement `read` dans le CRUD ( create / read / update / delete )

À la fin, vous devez avoir un **board Kanban** en 3 colonnes :

- `todo`
- `doing`
- `done`

## Durée

**4h30** (objectif “même niveau” que les autres TPs : simple, mais complet et propre).

## Contraintes

- React en **JSX** (pas de TS)
- Styles via **Tailwind CSS** (pas de CSS “maison”, à part le fichier Tailwind)
- Requêtes HTTP avec `fetch` (navigateur)
- Gestion **loading + erreurs** (et pas d’écran blanc)
- L’API fonctionne en **JS pur**, avec **CORS**

## Démarrage rapide

### 1) Lancer l’API Node (CRUD + CORS)

```bash
cd TPs/tp-node-api-tailwind-kanban/server
npm run dev
```

API: `http://localhost:3001`

- `GET /health`
- `GET /api/tasks`
- `POST /api/tasks`  -- facultative 
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id` -- facultative 
- `DELETE /api/tasks/:id` -- facultative 

### 2) Créer le client React

Créez un projet dans `TPs/tp-node-api-tailwind-kanban/client` (dossier à créer) :

```bash
cd TPs/tp-node-api-tailwind-kanban
npm create vite@latest client -- --template react
cd client
npm install
npm run dev
```

Client: `http://localhost:5173`

## Mise en place Tailwind CSS (Vite + React)

Dans `TPs/tp-node-api-tailwind-kanban/client` :

```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

1) Configurez `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: []
};
```

2) Remplacez le contenu de `src/index.css` par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3) Vérifiez que l’app affiche bien un style Tailwind (ex: `className="min-h-screen bg-slate-950 text-slate-100"` sur un wrapper).

## Documentation API (Node.js)

### Modèle `task`

```json
{
  "id": 1,
  "title": "Lancer l’API",
  "description": "…",
  "status": "todo",
  "createdAt": "2026-01-01T09:00:00.000Z"
}
```

- `status` ∈ `todo | doing | done`
- `description` peut être vide

### Format d’erreur

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid task payload",
    "details": { "title": "Title must be at least 2 characters" }
  }
}
```

### Endpoints

#### `GET /health`

Réponse `200` :

```json
{ "ok": true }
```

#### `GET /api/tasks`

Query params optionnels :

- `status`: filtre (`todo|doing|done`)
- `q`: recherche texte (dans `title` + `description`)
- `limit`: nombre max de résultats (entier > 0)

Réponse `200` : tableau de `task`.

Exemples :

```bash
curl -s 'http://localhost:3001/api/tasks'
curl -s 'http://localhost:3001/api/tasks?status=todo'
curl -s 'http://localhost:3001/api/tasks?q=tailwind&limit=5'
```

#### `GET /api/tasks/:id`

- `200`: une `task`
- `404`: task inexistante

```bash
curl -s 'http://localhost:3001/api/tasks/1'
```

#### `POST /api/tasks`   -- facultative  

Crée une task.

Body JSON :

```json
{ "title": "Ma task", "description": "Optionnel", "status": "todo" }
```

- `title`: string (2–80)
- `description`: string (0–500), optionnel
- `status`: optionnel, par défaut `todo`

Réponses :

- `201`: task créée
- `415`: mauvais `Content-Type`
- `422`: validation

```bash
curl -i -X POST 'http://localhost:3001/api/tasks' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Lire la doc API","description":"Tester avec curl","status":"todo"}'
```

#### `PATCH /api/tasks/:id`  -- facultative  

Met à jour une task (partiel).

Body JSON (au moins 1 champ) :

```json
{ "status": "doing" }
```

Notes :

- `description: null` vide la description
- validation similaire à `POST`

```bash
curl -i -X PATCH 'http://localhost:3001/api/tasks/1' \
  -H 'Content-Type: application/json' \
  -d '{"status":"done"}'
```

#### `DELETE /api/tasks/:id`  -- facultative 

- `204`: supprimée

```bash
curl -i -X DELETE 'http://localhost:3001/api/tasks/1'
```

### CORS (important)

Par défaut, l’API autorise :

- `http://localhost:5173`
- `http://127.0.0.1:5173`

Option : `CORS_ORIGIN` (liste séparée par des virgules), ex :

```bash
CORS_ORIGIN=http://localhost:5173,http://localhost:5174 npm run dev
```

## Travail demandé (checklist)

### A. API (prise en main)

- [ ] Lancer le serveur et tester `GET /health`
- [ ] Tester les routes `GET/POST/PATCH/DELETE` avec `curl` -- facultative  
- [ ] Comprendre le format des erreurs (et afficher ces erreurs côté UI)

### B. Client React + Tailwind (fonctionnel)

- [ ] Installer Tailwind et vérifier qu’il fonctionne
- [ ] Créer une page “board” en 3 colonnes (`todo/doing/done`)
- [ ] Afficher les tasks depuis `GET /api/tasks`
- [ ] Ajouter une task (`POST /api/tasks`) -- facultative 
- [ ] Modifier le statut d’une task (`PATCH /api/tasks/:id`) -- facultative 
- [ ] Supprimer une task (`DELETE /api/tasks/:id`) -- facultative 
- [ ] Gérer au minimum : loading, erreurs, état vide

### C. UI / UX (attendus)

- [ ] Layout lisible (desktop + mobile)
- [ ] Composants simples et réutilisables (ex: `TaskCard`, `Column`, `Button`, `Input`)
- [ ] Boutons désactivés pendant une requête (éviter le spam)
- [ ] Message d’erreur clair (pas un simple `console.log`)


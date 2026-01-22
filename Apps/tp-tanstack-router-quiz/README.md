# TP — React (JSX) + TanStack Router — Mini Quiz (avec API Node.js)

## Objectif

Créer une mini app React en **JSX (pas de TypeScript)** avec **TanStack Router** :

- Un **menu principal** (navigation)
- 3 pages :
  - `/` Accueil
  - `/quiz` Quiz (affichage de questions via `fetch`)
  - `/about` About

Une mini API Node.js est fournie et renvoie une liste de questions en JSON.

## Contraintes

- React en **JSX** (pas de TS)
- Routing avec **TanStack Router** (`@tanstack/react-router`)
- Requête HTTP avec `fetch` côté navigateur
- API Node.js en **JS pur**, avec **CORS**

## Démarrage rapide

### 1) Lancer l’API Node (questions + CORS)

```bash
cd TPs/tp-tanstack-router-quiz/server
npm run dev
```

API: `http://localhost:3001`

- `GET /health`
- `GET /api/questions`

### 2) Lancer le client React (TanStack Router)

```bash
cd TPs/tp-tanstack-router-quiz/client
npm install
npm run dev
```

Client: `http://localhost:5173`

## Travail demandé (checklist)

- [ ] Mettre en place TanStack Router avec les routes `/`, `/quiz`, `/about`
- [ ] Créer un menu principal avec des liens vers chaque page
- [ ] Sur `/quiz`, récupérer les questions via `fetch` et les afficher
- [ ] Gérer au minimum : loading + erreur + rendu de la liste

## Fichiers utiles

- Router + menu: `TPs/tp-tanstack-router-quiz/client/src/router.jsx`
- Pages: `TPs/tp-tanstack-router-quiz/client/src/pages/*`
- API: `TPs/tp-tanstack-router-quiz/server/src/server.js`
- Données: `TPs/tp-tanstack-router-quiz/server/src/questions.js`

## Format API (exemple)

`GET http://localhost:3001/api/questions` → tableau JSON:

```json
[
  { "id": 1, "title": "…", "choices": ["…"], "answerIndex": 0 }
]
```

## Comment récupérer les données sur le serveur API avec fetch dans React

```js
useEffect(() => {
    // async await est une promesse en JS 
    async function fetchData() {
      const res = await fetch("http://localhost:3001/api/questions");
      const questions = await res.json();

      console.log(questions);
    }
    fetchData();
  }, []);
```

## Bonus (optionnel)

- Afficher les choix (QCM) et permettre de sélectionner une réponse
- Calculer un score (local, sans sauvegarde)
- Ajouter un paramètre `?limit=5` et l’utiliser côté client

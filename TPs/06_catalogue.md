#  Mini Catalogue de Films  

## TanStack Query · TanStack Router · Zustand

---

## Présentation

Créer une petite application React affichant un **catalogue de films** à partir d'une API publique.  
L'objectif est d'apprendre à organiser un projet React moderne avec :

- **TanStack Query** pour la récupération et le cache des données  
- **TanStack Router** pour la navigation entre les pages  
- **Zustand** pour la gestion d'un état global (favoris)

---

## Durée estimée

Entre **1h30 et 2h** selon votre niveau.

---

## Arborescence conseillée

```

src/
├── app/
│   ├── main.jsx
│   ├── router.jsx
│   └── queryClient.js
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Spinner.jsx
│   │
│   └── common/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── MovieCard.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── MoviesPage.jsx
│   ├── MovieDetailPage.jsx
│   └── FavoritesPage.jsx
│
├── routes/
│   ├── __root.jsx
│   ├── index.jsx
│   ├── movies.jsx
│   ├── movies.$id.jsx
│   └── favorites.jsx
│
├── stores/
│   └── useFavoritesStore.js
│
├── schemas/
│   └── movieSearchSchema.js
│
│
└── index.css

```

---

## Préparation du projet

1. Créer un projet React avec **Vite**  
   → `npm create vite@latest my-movies --template react`

2. Installer les dépendances :
```bash
   npm i @tanstack/react-query @tanstack/react-router zustand zod
```

3. (Optionnel) Ajouter **Tailwind CSS** pour le style.

---

## Fonctionnalités attendues

### 1. Page d'accueil `/`

* Présenter brièvement l'application :
  " Mini catalogue de films utilisant TanStack Query et Zustand. "
* Lien vers les pages :

  * Catalogue des films
  * Favoris

---

### 2. Page **Catalogue des Films** `/movies`

* Afficher une liste de films provenant d'une API (par ex. [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) ou [OMDb](https://www.omdbapi.com/)).
* Chaque **carte de film** affiche :

  * une **image d'affiche**
  * un **titre**
  * une **note**
* Utiliser **TanStack Query** pour :

  * Récupérer les films
  * Gérer le **chargement** et les **erreurs**
  * Mettre en cache les résultats pendant 30 secondes (`staleTime`)
* Ajouter une **barre de recherche** (bonus)

---

### 3. Page **Détail d'un Film** `/movies/:id`

* Afficher les détails du film sélectionné :

  * Image HD
  * Titre complet
  * Description
  * Note moyenne
  * Lien “Retour au catalogue”
* Ajouter un bouton :

  * `⭐ Ajouter aux favoris`
  * `❌ Retirer des favoris` (si déjà ajouté)
* Le bouton agit sur un **store Zustand** global.

---

### 4. Page **Favoris** `/favorites`

* Afficher tous les films enregistrés dans le store Zustand.
* Chaque film peut être **supprimé des favoris**.
* Bonus : persister les favoris dans `localStorage` via `zustand/middleware`.



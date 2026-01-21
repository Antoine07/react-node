---
marp: true
theme: default
paginate: true
class: lead
---


# TanStack Router — Introduction

TanStack Router est un **routeur moderne pour React**.  
Il sert à gérer la **navigation** entre les pages d'une application **sans recharger le navigateur**.

Dans une application React :
- On n'a pas plusieurs pages HTML
- On a **une seule page**
- Et on affiche **des composants différents** selon l'URL

Ce comportement s'appelle : **Single Page Application (SPA)**.

---

Un **routeur** permet de :

* Associer une **URL** à un **composant**
* Naviguer sans recharger la page
* Gérer les liens (`<Link>`) de façon propre
* Organiser l'application en **pages**

---

## Pourquoi TanStack Router ?

Il apporte :

1. Une **structure claire** en forme d'arborescence (routes imbriquées)
1. Une navigation **prévisible**
1. Une intégration **simple avec TanStack Query** (chargement de données par page)
1. Une API **moderne**, pensée pour les composants fonctionnels

---

## Concrètement, il vous permet de faire :

```
/           → Page d'accueil
/produits   → Liste des produits
/produits/4 → Page du produit #4
/panier     → Panier d'achat
```

Sans jamais recharger la page → **l'application est fluide**.

---

## Peut-on l'utiliser sans TypeScript ?

**Oui.**
Même si la documentation montre du TypeScript, le routeur fonctionne **parfaitement en JSX pur**, sans aucune configuration supplémentaire.

---

## En résumé

> TanStack Router permet de gérer les pages d'une application React de manière moderne, fluide et structurée, et il fonctionne très bien **en jsx et typescript (surtout)*.


---

# Installation de TanStack Router 

## 1) Installer la librairie

```bash
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

*Même si tous les exemples sont en TypeScript pur, on va resté sur JSX pour l'instant.*

---

## 2) Configurez vite : `vite.config.ts`

```js
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    // ...,
  ],
})
```

---

## 3) Créez l'arborescence suivante 

```txt
src/routes/__root.jsx (with two '_' characters)
src/routes/index.jsx
src/routes/about.jsx
```

---

### Dans le fichier __rout.jsx

```js
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
```

---

### Dans l'index.jsx

```js
import { createFileRoute } from '@tanstack/react-router'
import Home from "@/pages/Home.jsx"

export const Route = createFileRoute('/')({
  component: Home,
})
```

---

### Dans le fichier about.jsx

```js
import { createFileRoute } from '@tanstack/react-router'
import About from "@/pages/About.jsx"

export const Route = createFileRoute('/about')({
  component: About,
})

```

---

## 4) Le fichier `main.jsx`

```js
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
```

---

### Exercice Routing

Reprenez l'exercice sur la petite machine de Turing et ajoutez un menu avec les items suivants Home pour présenter le projet et un item Machine de Turing pour tester la machine.

Optionnel vous pouvez ajouter un item de menu pour persister le nombre de fois que vous avez tester cette machine.

---


## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

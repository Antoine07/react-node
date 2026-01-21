---
marp: true
theme: default
paginate: true
class: lead
---


# TanStack Query


---

#  Problème (useEffect pour consommer une API)

## Consommer une API avec useEffect

- Nécessite `useState` + `useEffect`
- Gestion **manuelle** du chargement (`loading`)
- Gestion **manuelle** des erreurs (`error`)
- Pas de cache → on re-fetch à chaque affichage
- Pas de revalidation automatique

---

# useEffect - une méthode pour récupérer des pokemons.

En utilisant un useEffect afficher un `pokemon` dans votre rendu. Faites un nouveau projet simple sans router, appelez ce projet `pokemon`.

---

# Limites de cette approche

- Beaucoup de code pour quelque chose de fréquent
- Répétition dans chaque composant
- Pas de **cache** → redemandes inutiles
- Pas de re-fetch intelligent (focus, intervalle, mutation)

---

# Introduction TanStack Query

TanStack Query ne remplace pas Zustand ou Redux.
Il gère **uniquement les données venant d'une API**.

- Récupère les données (`useQuery`)
- Met en cache automatiquement
- Re-fetch intelligent au retour du focus
- Fournit loading / error intégrés

---

# Exemple avec `useQuery` 

```js
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

```

---

## Définir le provider pour faire la requête

```js
function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
```

---

# Comparatif clair


| Aspect                  | useEffect + fetch           | TanStack Query            |
|------------------------|-----------------------------|---------------------------|
| Chargement (loading)   | Manuel                       | Automatique               |
| Gestion des erreurs    | Manuelle                    | Automatique               |
| Cache                  | ❌ Aucun                     | ✅ Oui                    |
| Re-fetch automatique   | ❌ Non                       | ✅ Oui                    |
| Quantité de code       | Élevée                      | Réduite                   |

---

# Ce qu'il faut retenir (simplement)

- **useEffect** : bon pour la logique UI / effets.
- **TanStack Query** : meilleur pour la **consommation API**.
- Fonctionne **parfaitement en JSX**, sans TypeScript.

---
### TP Pokemon

- [tp pokemon](https://github.com/Antoine07/react_web2/blob/main/TPs/05_pokemon.md)

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

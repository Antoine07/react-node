---
marp: true
paginate: true
theme: default
---


# **Objectif du code**

Ce code montre comment utiliser **TanStack Query** pour :

1. Exécuter une requête HTTP (`fetch`)
2. Gérer automatiquement :

l'état de chargement
les erreurs
la mise en cache
la synchronisation de la donnée

3. Afficher le résultat dans un composant React

---

C'est ce que TanStack Query fait de mieux.

Attention ne mettez pas TanStack Query dans Zustand, ils ont tous les deux leur propre système de persistance.

---

#  **1. Mise en place : le QueryClient**

```js
const queryClient = new QueryClient()
```

Le **QueryClient** est le cœur du système :

C'est lui qui gère le cache des données ! 
C'est lui qui sait quand relancer des requêtes
Il centralise la configuration générale

---

#  **2. Provider : rendre le client disponible**

```jsx
<QueryClientProvider client={queryClient}>
  <Example />
</QueryClientProvider>
```

Comme pour un Provider Redux ou un Context Provider, ici on **injecte** le client dans toute l'application.

Tous les composants enfants peuvent maintenant utiliser `useQuery`.

---

#  **3. useQuery : la requête principale**

```js
const { isPending, error, data } = useQuery({
  queryKey: ['repoData'], // c'est une clé pour le module
  queryFn: () =>
    fetch('https://api.github.com/repos/TanStack/query')
      .then((res) => res.json()),
})
```

`useQuery` est l'outil principal.

Il prend deux choses essentielles :

---

##  **queryKey**

`queryKey: ['repoData']`

C'est **l'identifiant unique** de la requête (pour le cache)

React Query le garde en cache
Si vous réappelez la même clé, il réutilise les données existantes
Très utile pour éviter les re-fetch inutiles

Exemple :
`['repoData']` = une seule requête
`['repoData', 'user']` = combinaisons plus complexes

---

##  **queryFn**

La fonction qui fait la requête :

```js
queryFn: () => fetch(...).then(res => res.json())
```

Elle doit retourner une **promesse**, c'est tout.

Ici :

`fetch` appelle l'API GitHub
`res.json()` convertit la réponse en objet JavaScript
useQuery met automatiquement la valeur dans `data`

---

#  **4. Gestion automatique des états**

## 🟡 Chargement

```js
if (isPending) return "Loading..."
```

useQuery passe automatiquement en mode *pending* pendant l'appel API.

---

##  Erreur

```js
if (error) return "An error has occurred: " + error.message
```

Si `fetch` échoue ou si la réponse n'est pas OK, `useQuery` gère l'erreur.

---

##  Succès

```jsx
return (
  <div>
    <h1>{data.name}</h1>
    <p>{data.description}</p>
    <strong>👀 {data.subscribers_count}</strong>
    <strong>✨ {data.stargazers_count}</strong>
    <strong>🍴 {data.forks_count}</strong>
  </div>
)
```

---

`data` contient la réponse API, déjà parsée.

React Query gère :

la mise en cache
la synchronisation
le rechargement automatique en arrière-plan
l'invalidation du cache

Sans aucune configuration.

---

#  **Pourquoi utiliser TanStack Query ?**

Comparé à `fetch` dans un `useEffect`, React Query offre :

| Problème           | Solution TanStack Query    |
| ------------------ | -------------------------- |
| Chargement manuel  | `isPending`                |
| Détection d'erreur | `error`                    |
| Cache absent       | Automatique                |
| Re-fetch compliqué | Automatique + invalidation |
| Synchronisation    | Automatique                |
| Structure lourde   | 1 hook                     |

Cela évite d'écrire 50 lignes de code à chaque fois.

---

#  **Résumé du code**

1. On crée un `QueryClient`
2. On le fournit à l'application
3. `useQuery` :

lance la requête
gère les états
met en cache la réponse
renvoie les données prêtes à l'usage

C'est la façon moderne et propre de gérer les données asynchrones dans React.

---

# Le code complet

```jsx
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

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

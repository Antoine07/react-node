---
marp: true
paginate: true
theme: default
---

# Pourquoi utiliser `useMemo` ?

---

## Problème
Dans React, certaines opérations peuvent être **coûteuses** (calculs, filtrages, tri...).

À chaque rendu du composant, ces calculs se refont **même si rien n'a changé**.

`useMemo` permet de **mémoriser** un calcul et de **ne le refaire que si les dépendances changent**.

---


```js
const valeurMémorisée = useMemo(() => calcul(), [dépendances])
```

1. Évite les recalculs inutiles
1. Améliore les performances
1. Utile pour listes, filtrages, gros tableaux

---

# Exemple simple et testable

## Sans `useMemo`
Chaque frappe dans l'input relance un **filtrage complet**.

```jsx
function App() {
  const [search, setSearch] = useState("")
  const bigList = Array.from({ length: 5000 }, (_, i) => `Item ${i}`)

  const filtered = bigList.filter(item => item.includes(search))

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <p>{filtered.length} résultats</p>
    </>
  )
}
```

---

## Avec `useMemo`

Le filtrage ne s'exécute **que quand `search` change**.

```jsx
const filtered = useMemo(() => {
  return bigList.filter(item => item.includes(search))
}, [search])
```


---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

---
marp: true
theme: default
paginate: true
class: lead
---

# React `state` — approche métier

## Problème → solution → TP (backoffice commandes)

---

# **State dans React**

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)


---

## Le décor 

Vous construisez un **backoffice de commandes** :

- une liste de commandes
- une recherche client + un filtre par statut
- un formulaire "Créer une commande"
- des actions : "payer", "expédier", "annuler", "supprimer"
- des KPI : CA total, nb de commandes, panier moyen

---

## Problème

Sans "mémoire" dans l'UI :

- la recherche se perd à chaque saisie
- le filtre ne "tient" pas
- le formulaire ne reflète pas ce que l'utilisateur tape
- les actions ne mettent pas à jour l'écran
- les KPI ne correspondent pas à la liste

---

## Solution (React)

En React :

- le **state** est la **mémoire** d'un composant (ce qui change dans le temps)
- les **props** sont l'**entrée** (données/config venant du parent)
- un **event** (clic, saisie) déclenche une **mise à jour de state**
- React **re-render** l'UI à partir du state (source de vérité)

---

## Définition

Le **state** représente les **données internes** d'un composant React.
Contrairement aux **props** (données *reçues* du parent), le state correspond à des **valeurs que le composant gère lui-même**, susceptibles d'évoluer dans le temps.

> Le state rend un composant **interactif** : il permet de changer ce qui s'affiche à l'écran **sans recharger la page**.

---

## Différence entre props et state

| Critère            | Props                        | State                             |
| ------------------ | ---------------------------- | --------------------------------- |
| Origine            | Transmises par le parent     | Géré localement dans le composant |
| Lecture / écriture | Lecture seule                | Modifiable via `setState`         |
| Flux de données    | Descendant (parent → enfant) | Interne au composant              |
| Objectif           | Personnaliser un composant   | Le rendre interactif / dynamique  |

---

## Le minimum sur les Hooks

Les **Hooks** sont des fonctions React qui ajoutent des capacités aux composants fonctionnels.

- `useState()` : état local
- `useEffect()` : effets (réseau, timers, subscriptions…) → cours dédié

---

## `useState()` 

```jsx
import { useState } from "react";

const [state, setState] = useState(valeurInitiale);
```

- `state` : valeur actuelle
- `setState(next)` : planifie une mise à jour
- une mise à jour déclenche un **re-render** du composant

---

## Modèle mental

1. Le composant **render** à partir du `state`
2. L'utilisateur agit (clic / saisie)
3. Vous appelez `setState(...)`
4. React re-render l'UI avec le nouveau `state`

---

## Exemple métier : filtre + recherche

```jsx
const [query, setQuery] = useState("");
const [status, setStatus] = useState("all");

const visibleOrders = orders
  .filter((o) => (status === "all" ? true : o.status === status))
  .filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()));
```

Le `state` stocke **l'intention de l'utilisateur** (ce qu'il veut voir), pas du HTML.

---

## Exemple simple : compteur (comprendre le re-render)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

### Piège : appeler une fonction dans `onClick`

Si vous écrivez `onClick={handleCounter()}` vous **appelez** la fonction au render.
Si elle modifie le state → re-render → rappel → boucle.

<img src="./images/appel_fonction.png" width="400" height="400" />

---

## 3 règles qui évitent 80% des bugs

1. Appeler `useState()` **au niveau supérieur** du composant (pas de conditions/boucles).
2. Ne jamais modifier le state directement : **toujours** `setState(...)`.
3. Quand la mise à jour dépend de l'ancienne valeur : utiliser la forme **fonctionnelle**.

---

## Mise à jour fonctionnelle (évite les bugs)

React peut regrouper des updates (batching) :

```jsx
setCount(count + 1);
setCount(count + 1); // les deux lisent la même ancienne valeur
```

✅ Correct :

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

---

## Composant contrôlé (rappel)

Un **composant contrôlé** garde la valeur d'un input dans le state.

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name || "anonymous"}!</p>
    </div>
  );
}
```

---

## Communication parent / enfant (pattern clé)

Le parent possède le state, l'enfant reçoit des props + déclenche une action.

```jsx
function Child({ value, onIncrement }) {
  return <button onClick={onIncrement}>Count: {value}</button>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return <Child value={count} onIncrement={() => setCount((c) => c + 1)} />;
}
```

Props ↓ / Events ↑ : *props → state → events*

---

# TP Backoffice de commandes

Objectif : faire une UI complète **avec uniquement** `useState` + props + callbacks.

---

## Spécifications (métier)

À livrer :

- une liste de commandes (table / cards)
- une recherche client (input)
- un filtre par statut (select)
- un formulaire "Créer une commande"
- actions : changer le statut, supprimer
- KPI : `nb`, `CA total`, `panier moyen` (calculés depuis la liste)

---

## Modèle de données (minimum)

```js
{
  id: "o_1001",
  customer: "Alice",
  amount: 129.9,
  status: "pending", // pending | paid | shipped | canceled
  createdAt: "2026-01-01"
}
```

---

## Dataset de départ (seed)

```js
const seedOrders = [
  { id: "o_1001", customer: "Alice", amount: 129.9, status: "pending", createdAt: "2026-01-04" },
  { id: "o_1002", customer: "Mehdi", amount: 49.0, status: "paid", createdAt: "2026-01-03" },
  { id: "o_1003", customer: "Sarah", amount: 18.5, status: "shipped", createdAt: "2026-01-02" },
  { id: "o_1004", customer: "Jules", amount: 240.0, status: "canceled", createdAt: "2026-01-01" },
];
```

---

## Démarrage (state initial)

Dans `App` :

```jsx
const [orders, setOrders] = useState(seedOrders);
const [query, setQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
```

---

## Étape 1 — Afficher la liste

- Afficher `orders`
- `key` stable : `order.id` (pas l'index)
- Montrer `customer`, `amount`, `status`, `createdAt`

---

## Étape 2 — Recherche + filtre (contrôlés)

Créer 2 composants "dumb" :

- `SearchInput({ value, onChange })`
- `StatusFilter({ value, onChange })`

Le parent garde le state, les enfants déclenchent des callbacks.

---

## Étape 3 — Vue "visibleOrders" (ne pas muter la source)

Dans le parent :

```jsx
const visibleOrders = orders
  .filter((o) => (statusFilter === "all" ? true : o.status === statusFilter))
  .filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()));
```

⚠️ `visibleOrders` = une **vue**, `orders` = la **source de vérité**.

---

## Étape 4 — Formulaire "Créer une commande"

Créer `OrderForm({ onCreate })` :

- champs contrôlés : `customer`, `amount`
- validation simple : requis, `amount > 0`
- au submit : `onCreate(newOrder)` puis reset

---

## Étape 5 — Ajouter une commande (update immuable)

Dans le parent :

```jsx
setOrders((prev) => [newOrder, ...prev]);
```

Décision métier : nouvelle commande en haut de liste.

---

## Étape 6 — Changer un statut (update immuable)

Sur chaque ligne :

- "Payer" → `paid`
- "Expédier" → `shipped`
- "Annuler" → `canceled`

```jsx
setOrders((prev) =>
  prev.map((o) => (o.id === id ? { ...o, status: "paid" } : o))
);
```

---

## Étape 7 — Supprimer (avec confirmation)

- bouton "Supprimer"
- `confirm()` OK pour ce TP

```jsx
setOrders((prev) => prev.filter((o) => o.id !== id));
```

---

## Étape 8 — KPI (state dérivé, pas dupliqué)

À afficher au-dessus de la liste (depuis `visibleOrders`) :

- `totalOrders = visibleOrders.length`
- `totalRevenue = visibleOrders.reduce(...)`
- `avg = totalRevenue / totalOrders` (avec garde si 0)

⚠️ Ne pas stocker ces KPI dans le `state`.

---

## Découpage conseillé

- `App` : states + logique
- `OrdersPage` : layout
- `OrderList` / `OrderRow` : affichage + actions via callbacks
- `OrderForm` : form contrôlé

---

## Critères de réussite (checklist)

- Aucun `push`, `sort` ou mutation directe sur `orders`
- Une action = un update immuable (`map`, `filter`, spread)
- Les filtres n'altèrent pas la source (`orders`)
- Le formulaire est contrôlé (valeur = state)
- Les KPI correspondent toujours à la vue affichée

---

## Bonus (si temps)

- Tri (date / montant) sans muter : `const sorted = [...visibleOrders].sort(...)`
- Edition inline du montant (input contrôlé par ligne)
- Désactiver des actions selon le statut
- Générer `id` proprement (`crypto.randomUUID()` si dispo)

---

## Immutabilité (ce qui vous sauve)

En React, on **ne modifie jamais directement** une donnée (objet/tableau) dans un `state`.
On crée une **nouvelle version**.

---

### Objet : mauvais vs bon

```jsx
const [order, setOrder] = useState({ status: "pending", amount: 10 });

order.status = "paid";
setOrder(order); // mauvais (même référence)
```

✅ Correct :

```jsx
setOrder((prev) => ({ ...prev, status: "paid" }));
```

---

### Tableau : ajouter / supprimer / mettre à jour

```jsx
// ajouter
setOrders((prev) => [...prev, newOrder]);

// supprimer
setOrders((prev) => prev.filter((o) => o.id !== id));

// mettre à jour un élément
setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
```

---

## Mini-exercices (rapides)

1. Compteur : empêcher de descendre sous 0
2. Champ contrôlé : afficher le nombre de caractères
3. ToDo : ajouter / supprimer / marquer "done" (immutabilité)

<img src="./images/todoList.png" alt="Todo List" width="500" />

---

## À retenir (en 6 lignes)

- `state` = mémoire qui pilote l'UI
- render = "fonction" du `state`
- `useState` = déclarer + mettre à jour
- props ↓ / events ↑ (callbacks)
- updates immuables pour objets/tableaux
- KPI / vues = calculés, pas stockés

---

## Merci

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

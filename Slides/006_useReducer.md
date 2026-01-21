---
marp: true
theme: default
paginate: true
class: lead
---

# **useReducer et gestion d'événements dans React**

---

## 1. Introduction

### Pourquoi `useReducer` ?

`useState` suffit pour des états simples (compteur, formulaire, etc.),
mais quand la logique devient **plus complexe** — avec plusieurs états liés ou des transitions précises —
`useReducer` rend le code **plus clair et prévisible**.

---

### Principe de base

`useReducer` sépare **la logique métier** (comment l'état change)
de la **logique d'affichage** (ce que React affiche).

```jsx
const [state, dispatch] = React.useReducer(reducer, initialState);
```

`state` → état actuel
`dispatch(action)` → envoie une **action**
`reducer(state, action)` → fonction qui décrit **comment l'état évolue**

---

## 1.1 Quand préférer `useReducer` à `useState` ?

`useReducer` devient intéressant quand:

- l'état est un **objet** avec plusieurs champs liés
- on a plusieurs "façons" de modifier l'état (actions)
- on veut des transitions **prévisibles** (même action → même résultat)
- on veut centraliser la logique pour éviter de disperser des `setState` partout

Si vous n'avez qu'une valeur simple → `useState` reste parfait.

---

## 1.2 Action = intention

Une action décrit **ce que l'utilisateur veut faire**, pas comment le faire.

Exemples:

```js
dispatch({ type: "increment" });
dispatch({ type: "setA", value: "12" });
dispatch({ type: "compute" });
```

Le `reducer` est l'endroit où on décide *comment* l'état change.

---

## 1.3 Un reducer doit rester "pur"

Dans un `reducer`:
- pas de `fetch`
- pas de `setTimeout`
- pas de mutation (`state.x = ...`)

Si vous avez des effets secondaires → `useEffect`.

---

## 2. Exemple minimal Gestion d'un compteur

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

---

### Déroulement :

1. L'utilisateur clique → **événement onClick**
2. Le bouton envoie une **action** via `dispatch({ type: "increment" })`
3. `useReducer` appelle la fonction `reducer(state, action)`
4. Le `reducer` retourne un **nouvel état**
5. React **re-render** avec la nouvelle valeur

---

## 3. Pourquoi c'est utile ?

On centralise la logique dans une **fonction pure(*)** (`reducer`)
On facilite la maintenance d'applications plus grandes.
On garde une approche similaire à Redux, mais **sans dépendance externe**.

(*) Une fonction pure est une fonction qui, pour les mêmes entrées, retourne toujours le même résultat sans modifier de données externes (pas d’effets de bord).

---

## Exercice 

Implémentez une petite calculatrice permettant d’additionner deux nombres.

Voici les données de votre initialState proposées en exemple pour faire cet exercice 

```js
// État initial
const initialState = { 
  a: "", 
  b: "", 
  result: 0, 
  error: "" 
};
```

---

## Merci d'avoir écouté cette partie sur `useReducer`

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

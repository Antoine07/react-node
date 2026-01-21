---
marp: true
theme: default
paginate: true
class: lead
---

# Fiche mémo — `useReducer`

---

**Quand l'utiliser**

Quand l'état a plusieurs actions possibles.
Quand la logique devient difficile à suivre avec plusieurs `useState`.

**Structure**

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

**Dans le composant**

```jsx
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Valeur : {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

**Idée clé**

`state` = données
`dispatch(action)` = intention de modifier l'état
`reducer` = décide *comment* l'état change

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

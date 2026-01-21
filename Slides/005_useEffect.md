---
marp: true
theme: default
paginate: true
class: lead
---


# **Le Hook `useEffect()`**

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

---

## 1. Introduction

### Définition

Le hook **`useEffect()`** permet d'exécuter du **code en réaction à un changement d'état, de props ou au cycle de vie** d'un composant.

> En React, tout ce qui est un "effet secondaire" (appel réseau, timer, manipulation du DOM, log, etc.) doit être géré avec `useEffect`, en théorie.

---

## 2. Pourquoi un *hook d'effet* ?

Sans `useEffect`, un composant React **ne fait que du rendu** :
il affiche des données à partir de son `state` ou de ses `props`.

Mais parfois, on veut :

* récupérer des données depuis une API,
* écouter un événement du navigateur,
* modifier le titre de la page,
* démarrer ou arrêter un intervalle.

Ces actions **n'appartiennent pas directement au rendu**,
ce sont des **effets de bord (side effects)**.

---

## 3. Syntaxe de base

```jsx
React.useEffect(() => {
  // Code exécuté après le rendu
  console.log("Composant rendu ou mis à jour !");
});
```

### Paramètres :

```jsx
React.useEffect(callback, [dépendances]);
```

| Élément         | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `callback`      | Fonction exécutée après le rendu                                |
| `[dépendances]` | Liste de variables qui déclenchent l'effet quand elles changent |

---

## 4. Les trois cas d'usage principaux

### (1) Sans dépendance → à chaque rendu

```jsx
useEffect(() => {
  console.log("Rendu !");
});
```

→ L'effet s'exécute **à chaque fois** que le composant est re-rendu.

---

### (2) Avec tableau vide → une seule fois (montage)

```jsx
useEffect(() => {
  console.log("Composant monté !");
}, []);
```

→ L'effet ne s'exécute **qu'une seule fois** :
parfait pour initialiser un timer, un fetch ou un listener.

---

### (3) Avec dépendances → à chaque changement

```jsx
useEffect(() => {
  console.log("Le nom a changé :", name);
}, [name]);
```

→ L'effet ne se déclenche **que si `name`** change (votre state name change le `useEffect` est exécuté).

---

## 4.1 Piège classique: boucle infinie

Un `useEffect` qui déclenche un `setState` **sans dépendances** se relance à chaque rendu:

```jsx
function Bad() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(count + 1); // ❌ nouvel état → nouveau rendu → nouvel effet → ...
  });

  return <p>{count}</p>;
}
```

---

## 4.2 Dépendances: règle simple

Dans un `useEffect`, la liste de dépendances doit contenir **toutes les valeurs utilisées** dans l'effet
(props, state, fonctions, etc.).

En pratique:
- sans dépendances: exécution à chaque rendu
- `[]`: une fois au montage
- `[x, y]`: à chaque changement de `x` ou `y`

---

## 4.3 `useEffect` n'est pas fait pour "calculer"

Si une valeur peut être calculée pendant le rendu (sans effet secondaire), on la calcule directement:

```jsx
const fullName = `${firstName} ${lastName}`;
```

`useEffect` sert à gérer des **effets secondaires** (réseau, timers, subscriptions…).

---

## 5. Exemple 1 — Effet simple avec console.log

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Le compteur a changé :", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

Chaque clic :

- modifie le `state`,
- provoque un **re-render**,
- relance le `useEffect` car `count` a changé.

---

# **Exercice 1 — Toggle avec compteur d'effets**

- Utiliser **2 états distincts** :

  1. `isActive` → pour activer / désactiver un état logique.
  2. `counter` → compteur d'exécutions de l'effet.
- Utiliser un `useEffect()` dépendant de `isActive`.
- À chaque changement de `isActive`, incrémenter `counter`.
- Afficher le nombre de fois que l'effet a été déclenché.

---

# **Exercice 2 - Exercice météo**

Vous avez du code dans le dossier correction.

1. Créez un composant `TemperatureTable`.
2. États :
`data` : tableau d'objets `{ time, temperature }`.
`loading` : booléen pour afficher "Chargement..." avant les données. 
3. Dans `useEffect` :
Utilisez `setTimeout` (1 s) pour simuler un chargement des données (voir le tableau dans le fichier lui-même)
4. Affichez un tableau à deux colonnes : **Heure / Température (°C)**.
5. Stylisez avec Tailwind (fond sombre, lignes alternées, hover).

---

**Exemple attendu :**

| Heure | Température (°C) |
| ----- | ---------------- |
| 14:00 | 18.7             |
| 14:01 | 19.3             |
| …     | …                |

---


## 6. Nettoyage des effets (clean-up)

Certains effets doivent être **nettoyés** avant de quitter le composant
(par exemple : un timer ou un listener).

React propose une fonction de "nettoyage" à retourner depuis le `useEffect`.

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);

  return () => {
    clearInterval(timer);
    console.log("Composant démonté");
  };
}, []);
```

---

## 6.1 Quand le clean-up s'exécute ?

Le clean-up s'exécute:
- quand le composant se démonte
- **avant** de relancer l'effet (si les dépendances changent)

---

## 7. Ordre d'exécution

1. Le composant s'affiche (rendu initial).
2. React exécute le code de `useEffect()`.
3. Si le state change → React re-render.
4. React exécute à nouveau l'effet (et nettoie l'ancien si nécessaire).

---

## 8. Exemple 2 — Appel API (fetch) + clean-up

Pour éviter de mettre à jour le state après un démontage, on peut annuler le fetch:

```jsx
React.useEffect(() => {
  const controller = new AbortController();

  (async () => {
    const res = await fetch("/api/posts", { signal: controller.signal });
    const data = await res.json();
    setPosts(data);
  })().catch((e) => {
    if (e.name !== "AbortError") console.error(e);
  });

  return () => controller.abort();
}, []);
```

---

## 8.1 Mode Strict (React 18)

En développement, avec `<React.StrictMode>`, certains effets peuvent être exécutés 2 fois au montage
pour aider à détecter des effets non-idempotents.

À retenir:
- ce n'est pas un bug de production
- un effet doit idéalement être "safe" si exécuté plusieurs fois

---

## 9. Schéma mental

```
render() 
   ↓
useEffect() exécuté après affichage 
   ↓
(setState ?)
   ↓
→ nouveau render → nouvel effet
```

---

## À retenir (résumé)

- Le rendu doit rester "pur" → effets secondaires dans `useEffect`
- Dépendances: l'effet se relance quand elles changent
- Clean-up: au démontage et avant le prochain effet
- Piège: boucle infinie si effet + `setState` sans dépendances

---

## Merci d'avoir écouté cette partie sur `useEffect`

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

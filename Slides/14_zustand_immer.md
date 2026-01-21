---
marp: true
theme: default
paginate: true
class: lead
---

### Modifier un état immuable avec `produce`

Dans Zustand (comme en React), **modifier un tableau ou un objet directement ne déclenche pas de re-render**.

Pensez à installer cette dépendance 

```bash
npm install immer
```

---

Exemple **à ne pas faire** :

```js
state.numbers.push("x") // ❌ modification directe → React ne voit rien
```

Il faut **créer une nouvelle référence** :

```js
const newList = [...state.numbers]
newNumbers.push("x")
set({ numbers: newNumbers }) // ✅ re-render correct
```

→ C'est **verbeux**.
→ Et on **oublie facilement** de copier.
→ Imaginez un state complexe (voir les slides suivantes)

---

## 🎯 Situation

On a un store avec un objet imbriqué :

```js
user: {
  name: "Alice",
  settings: {
    theme: "light",
    shortcuts: ["ctrl+s", "ctrl+p"]
  }
}
```

On veut ajouter un raccourci dans `settings.shortcuts`.

---

## ❌ Exemple qui **NE re-render PAS**

```js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    name: "Alice",
    settings: {
      theme: "light",
      shortcuts: ["ctrl+s", "ctrl+p"]
    }
  },

  addShortcutBad: () => {
    set((state) => {
      // ⚠️ On modifie directement le tableau → pas de nouvelle référence
      state.user.settings.shortcuts.push("ctrl+n");
      return state; // ⚠️ même objet → React ne re-render pas
    });
  }
}));
```

→ **Problème** :
Les composants qui affichent `shortcuts` **ne se mettent pas à jour**,
parce que **l'objet n'a pas changé de référence**.

---

## Version **sans produce**, mais correcte (références recréées)

```js
addShortcut: () => {
  set((state) => ({
    user: {
      ...state.user,
      settings: {
        ...state.user.settings,
        shortcuts: [
          ...state.user.settings.shortcuts,
          "ctrl+n"
        ]
      }
    }
  }));
}
```

✔️ On recopie **chaque niveau** de l'objet
➡️ Mais c'est **lourd et fragile**.

---

##  Version **avec `produce`**

Utilisez produce uniquement si vous manipulez un état complexe ou profondément imbriqué.
Si votre store devient trop gros au point de nécessiter produce partout, c'est probablement un signe que votre état n'est pas bien structuré. Dans ce cas, il vaut mieux réorganiser le store plutôt que d'empiler de la logique.

```js
import { produce } from "immer";

addShortcut: () => {
  set(produce(state => {
    state.user.settings.shortcuts.push("ctrl+n");
  }));
}
```

---

✔️ Code **simple**
✔️ Immer garantit l'immuabilité
✔️ React **re-render** car une **nouvelle référence est générée automatiquement**

---

## à retenir

> Dès qu'on modifie un **tableau** ou un **objet imbriqué**,
> il faut **créer une nouvelle référence** pour déclencher le re-render.
> produce n'est pas une bonne pratique en soit, c'est un outils qui peut être pratique dans certains cas.

---


### La solution est dans Zustand : `produce()`

`produce()` (Immer) permet d'écrire **comme si on modifiait directement**,
tout en produisant **automatiquement** un **nouvel état immuable**.

```js
import { produce } from "immer"

set(produce((state) => {
  state.list.push("x") // ✅ on code naturellement
}))
```

---

Avantages (mais ce n'est pas une règle absolue)

* Pas besoin de copier manuellement (`[...list]`, `{ ...obj }`)
* Code plus **clair** et **lisible**
* Moins d'erreurs sur les structures imbriquées

> `produce` = **simplicité d'écriture + immuabilité garantie**

---

###  **Nous allons aborder maintenant la persistance**

Certains états doivent **continuer d'exister même si la page est rechargée**.

Exemples concrets :

1. Le **thème clair / sombre** choisi par l'utilisateur
1. Des **préférences d'affichage** (ex : langue, mode compact)
1. Un **panier d'achat**

---

### Attention

**Sans persistance**, tout revient à l'état initial, après un simple `Ctrl+R`.
Résultat : **mauvaise expérience utilisateur (UX)**...

L'objectif de la persistance est donc de garder **la même interface et les mêmes choix** entre les sessions.

Bien vous organisez pour cette partie, c'est de l'UX.

---

### **Utiliser la persistance avec Zustand**

Zustand offre une fonction prête à l'emploi : `persist`.

---

```js
// useThemeStore.js
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light"
        })),
    }),
    {
      name: "theme-storage" // nom sous lequel l'état sera sauvegardé (localStorage)
    }
  )
)
```

---

Ce que cela change :

* L'état `theme` est **automatiquement enregistré dans localStorage**
* Au rechargement, Zustand **le restaure sans votre intervention**

Aucune ligne supplémentaire dans les composants.

---

### Exercices

1. Créez un bouton pour faire un choix sous forme d'une valeur numérique, recharger la page et vérifiez que cette valeur est bien dans le localStorage et s'affiche dans votre SAP.

---

## Combine pour plus de lisibilité 

Sans combine on écrit le store mélangé à l'état et les actions.

```js
import { create } from "zustand";

export const useCounter = create((set, get) => ({
  count: 0,
  step: 1,
  increment: () => set({ count: get().count + get().step }),
  reset: () => set({ count: 0 })
}));
```

---

## Rôle de `combine`

`combine` sert à **séparer l'état initial de la logique**.

Forme générale :

```js
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCounter = create(
  combine(
    { count: 0, step: 1 }, // état
    (set, get) => ({       // actions
      increment: () => set({ count: get().count + get().step }),
      reset: () => set({ count: 0 })
    })
  )
);
```

---

##  Comment lire ça ?

| Partie                    | Contenu                       | Rôle                      |
| ------------------------- | ----------------------------- | ------------------------- |
| `{ count: 0, step: 1 }`   | État initial                  | Simple, propre, séparé    |
| `(set, get) => ({ ... })` | Fonctions qui changent l'état | Pas mélangées avec l'état |

→ On sépare **ce que l'on a** (l'état)
de **ce que l'on fait** (les actions).

---

## Résumé

> `combine` permet d'écrire un store Zustand **mieux structuré**, en séparant l'état et les actions au lieu de tout mélanger dans un seul objet.

---

##  Quand utiliser `combine` ?

| Situation                     | Recommandation              |
| ----------------------------- | --------------------------- |
| Petit store (3–5 lignes)      | ❌ Pas nécessaire            |
| Store moyen ou grand          | ✅ Ça améliore la lisibilité |
| Projet pédagogique débutant   | ❌ On commence sans          |
| Projet structuré ou en équipe | ✅ Recommandé                |



--- 


### TP Cart 

> *Temps : 1h30*

- [cart](../TPs/04_cart.md)

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

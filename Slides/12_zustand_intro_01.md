---
marp: true
theme: default
paginate: true
class: lead
---


### **Zustand Introduction**

---

### **Rappel pourquoi Zustand ?**

Dans React, l'état est souvent géré avec `useState` ou `useReducer`.
Cela fonctionne bien **tant qu'un seul composant utilise l'état**.

Mais lorsque plusieurs composants doivent **lire ou modifier** cet état :

```
App
 └─ A
     └─ B
         └─ C
```

On finit par **passer l'état et les fonctions de mise à jour en cascade** → **prop drilling**.

---

**Conséquences :**

* Le code devient difficile à maintenir.
* Les composants deviennent dépendants les uns des autres.
* Changer la structure de l'UI peut casser la logique.

**Solution :**
Utiliser un **store global** simple → **Zustand**.

---

### **Installation & Principe**

**Installation :**

```
npm install zustand
```

**Idée clé :**

On crée un **store** dans lequel on met :
1. l'**état**
1. les **fonctions** pour le modifier

>Chaque composant utilise le store **directement**, sans passer par les parents.

---

**Exemple de store (ex. : gestion d'un thème clair/sombre) :**

```js
// useThemeStore.js
import { create } from "zustand"

export const useThemeStore = create((set) => ({
  theme: "light", // valeur par défaut
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light"
    }))
}))
```

---

### **Utilisation dans les composants**

**Lire l'état :**

```jsx
function Header() {
  const theme = useThemeStore((state) => state.theme)
  return <div>Thème actuel : {theme}</div>
}
```

**Modifier l'état :**

```jsx
function ToggleButton() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  return <button onClick={toggleTheme}>Changer le thème</button>
}
```

---

**Résultat :**

1. Pas de props inutiles
1. Les composants deviennent **autonomes**
1. L'état est **centralisé et clair**

---

## C'est à vous 

Reprennez le dernier tp avec `useReducer` et créez un state global.

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

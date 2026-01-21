---
marp: true
theme: default
paginate: true
class: lead
---



### **Zustand états multiples**

---

### **Ajouter plusieurs valeurs et actions dans un store**

Un store n'est pas limité à une seule valeur.
On peut regrouper plusieurs **données** et **logiques** cohérentes ensemble.

---

**Exemple : gestion d'un utilisateur connecté**

```js
// useUserStore.js
import { create } from "zustand"

export const useUserStore = create((set) => ({
  user: null,
  login: (name) => set({ user: { name } }),
  logout: () => set({ user: null })
}))
```

1. L'état (`user`) est **centralisé**
1. Les fonctions (`login`, `logout`) sont **au même endroit**
1. On ne mélange **pas** UI et logique

---

### **Sélectionner seulement ce qu'on utilise**

Chaque composant doit **demander juste la partie de l'état dont il a besoin**, sinon il se re-render inutilement.

```jsx
function NavBar() {
  const user = useUserStore((state) => state.user)
  return <div>{user ? `Bonjour ${user.name}` : "Non connecté"}</div>
}
```

```jsx
function LoginButton() {
  const login = useUserStore((state) => state.login)
  return <button onClick={() => login("Alex")}>Se connecter</button>
}
```

---

**Résultats :**

1. `NavBar` se met à jour seulement si **user change**
1. `LoginButton` ne se met pas à jour quand `NavBar` change
1. Rend l'interface **plus performante** et **plus lisible**

---

### **Structurer le store sans complexité**

Lorsque l'état devient plus riche, on le **regroupe par logique métier**, jamais par composants...

**Exemples de domaines courants :**

| Domaine         | État typique                    |
| --------------- | ------------------------------- |
| UI              | thème, modals, panneaux ouverts |
| Auth            | utilisateur, rôle, permissions  |
| Éléments métier | panier, produits, paramètres    |

---

**Bon réflexe :**

1. Identifier **un domaine** (ex. Auth)
2. Créer **un store dédié** : useCartStore, useAuthStore, usePostStore, ...
3. Y mettre **l'état + les actions** associées
4. Les composants viennent y **puiser**, sans dépendre les uns des autres

**Ce que l'on gagne :**

1. Code **prévisible**
1. Composants **simples**
1. Logique **relocalisable** et testable (à voir plus tard).

---

## TP Ruban Machine de Turing 

> *Temps : 1h*

Créez un ruban centré dans la page dans un thème noir, chaque case est cliquable et une petite croix se place au centre une fois cliqué, en requliuant sur la croix elle disparait 

[Machine Ruban](../TPs/03.0_marchine_ruban.md)

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

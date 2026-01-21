---
marp: true
theme: default
paginate: true
class: lead
---


### **État local vs État global**

**État local (useState / useReducer dans un composant)**

1. Sert lorsque **un seul composant** utilise et met à jour l'état.
1. Exemple : activer une LED dans **un** panneau.

**Limite**

#### Dès que **plusieurs composants** ont besoin du même état :

1. On remonte l'état dans un parent
1. On transmet l'état et les fonctions via **props**
1. Cela crée du **prop drilling** (on passe les données à travers des composants qui n'en ont pas besoin)

---

**Conséquence**

>*Le code devient **plus complexe**, difficile à maintenir et à faire évoluer.*

---

D'accord. Voici **un exemple très court** illustrant une **mauvaise gestion de l'état partagé** (sans store).

À mettre tel quel dans une slide :

---

### **Exemple d'état mal partagé (prop drilling)**

Le composant le plus haut garde l'état, puis le transmet **en cascade**, même à des composants qui ne l'utilisent pas

---

```jsx
function App() {
  const [active, setActive] = useState("red")
  return <Layout active={active} setActive={setActive} />
}

function Layout({ active, setActive }) {
  return <Sidebar active={active} setActive={setActive} />
}

function Sidebar({ active, setActive }) {
  return <LedPanel active={active} setActive={setActive} />
}

function LedPanel({ active, setActive }) {
  return (
    <>
      <div>LED active : {active}</div>
      <button onClick={() => setActive("green")}>Changer</button>
    </>
  )
}
```

---

**Problème :**

1. L'état traverse **3 composants** juste pour arriver à `LedPanel`
1. Si on change la structure de l'UI → **tout casse**
1. Le code devient **fragile** et difficile à maintenir


---

### **Pourquoi introduire un état global**

Sans état global :

1. L'état dépend de la **structure des composants**
1. Si l'UI change, la logique doit être modifiée
1. La communication entre composants devient **fragile**
1. On crée des dépendances inutiles entre les composants

---

Avec un état global :

1. **Une seule source de vérité**
1. Accessible à **n'importe quel composant**
1. Pas besoin de passer les données en cascade
1. Les composants deviennent **indépendants** et plus simples

**Idée clé :**
On sépare **la logique** (l'état) de **l'affichage** (les composants).

---

### **Introduction à Zustand**

Avant de l'utiliser, retenir seulement :

Zustand est un **store global simple mais puissant qui est utilisé dans beaucoup de projets.**
Il permet :

1. De **stocker** l'état à un endroit central
1. De **lire** l'état depuis n'importe quel composant
1. De **mettre à jour** l'état via des actions simples

Sans prop drilling
Sans rerenders inutiles
Sans configuration lourde

---

Zustand = **un petit centre de commande clair pour l'état de l'application.**

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

---
marp: true
theme: default
paginate: true
class: lead
---


### **Installer React avec Vite (npm)**

**1) Pré-requis**

Node.js installé (version LTS)

**2) Création du projet**

```bash
npm create vite@latest my_app
```

---

Choisissez React, sans typescript ni router.

> Framework : **React**
> Variant : **JavaScript**

---

Pour l'instant rien n'est installé ... Il manque les dépendances !

---

**3) Installation des dépendances**

```bash
cd my_app
npm install
```

**4) Lancement du serveur de développement**

```bash
npm run dev
```

---

### **Architecture de base & Cycle de Build avec Vite + React**

**Structure minimale d'un projet**

```
nom-du-projet/
├─ public/              // fichiers statiques (images, favicon…)
├─ src/
│  ├─ App.jsx           // composant racine UI
│  ├─ main.jsx          // point d'entrée JS (montage React)
│  └─ components/       // composants réutilisables
├─ index.html           // racine du DOM (id="root")
├─ package.json         // dépendances et scripts
└─ vite.config.js       // configuration Vite
```

---

**Fonctionnement**

* `index.html` contient une div `#root`. Pour monter votre `application` dans le DOM.
* `main.jsx` monte `App` dans cette div.
* `App.jsx` distribue l'interface (composition de composants), c'est la racine de votre application.
* Les composants dans `src/components/` construisent l'UI en modules.

---

**Cycle dev prod**

1. **Temps développement**

Serveur Vite ultra-rapide avec rechargement à chaud :

```bash
npm run dev
```

---

Code lisible, non minifié, pour déboguer.

2. **Temps production (Build) pour la mise en ligne de votre app**

Optimisation + minification + bundling :

```bash
npm run build
```

Le résultat est généré dans :

```
dist/
```

---

Pour prévisualiser la version prête à déployer :

```bash
npm run preview
```

**Idée importante**

**Développement** = lisible, rapide, orienté correction.
**Build** = optimisé, compact, orienté déploiement.

---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

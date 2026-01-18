# **TP — Générateur de nombres premiers optimisé**

Travail à réaliser **en binôme** et à rendre **en fin de semaine prochaine** (ou en fin de journée selon votre organisation).

Vous devez mobiliser les notions abordées en cours, mais également faire des recherches personnelles. L'objectif est de produire une application complète et cohérente, avec une organisation professionnelle.

Récupérez l'univers graphique utilisé pour la **machine de Turing** afin d'assurer une cohérence visuelle.

---

# **Présentation du TP**

Votre application doit intégrer les points techniques suivants :

### Logique et optimisation

* création d'un **générateur de nombres premiers**
* mise en place d'un **cache interne** pour éviter les recalculs
  *(vous pouvez explorer l'utilisation de `useMemo` pour optimiser la logique, mais vous devez comprendre pourquoi et quand l'utiliser)*

### Architecture métier

* un **store Zustand** dédié pour :

  * la gestion du générateur
  * la logique métier
  * la gestion du mode d'affichage
* Zustand ne doit **jamais** contenir de code lié à React Query ou à un fetch

### Appels asynchrones et validation

* consommation d'une “API” simulée via **TanStack Query**
* validation stricte de la donnée avec **Zod**
* objectif : garantir que la donnée reçue **est réellement un nombre**

### Interface et navigation

* utilisation de **TailwindCSS** pour la mise en forme
* utilisation de **TanStack Router** avec au minimum deux routes :

  * `/` (page d'accueil)
  * `/primes` (page pour l'affichage et la logique autour des nombres premiers)

---

# **API simulée (à placer dans votre architecture)**

Vous devez intégrer et utiliser ce code dans l'emplacement adéquat de votre projet.

```js
import { z } from "zod";

const limitSchema = z.object({
  number: z.number().min(1).max(50),
});

async function fetchNumberAlea() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const raw = { number: Math.floor(Math.random() * 1000) };

  return numberSchema.parse(raw);
}
```


---

# **Structure du projet**

Vous devez proposer une arborescence claire, modulable, cohérente avec les pratiques modernes (séparation métier / présentation / asynchrone / store / pages / composants).

L'objectif est de réfléchir à une organisation professionnelle et raisonnée.

Cependant on vous propose ici une arborescence professionelle

```txt
├── App.jsx
├── api
│   └── fetchApi.js
├── assets
│   └── react.svg
├── components
│   ├── Prime.jsx
│   └── ui
│       └── Button.jsx
├── index.css
├── main.jsx
├── pages
│   └── PrimesPage.jsx
├── routeTree.gen.ts
├── routes
│   ├── __root.jsx
│   ├── index.jsx
│   └── primes.jsx
├── schemas
│   └── numberSchema.jsx
└── stores
    └── usePrimeStore.js
```

---

# **1. Logique métier : déterminer si un nombre est premier**

Vous devez créer une fonction métier permettant de vérifier si un nombre est premier.
Elle doit se trouver dans un espace dédié à la logique, utilisateur par Zustand ou vos pages.

---

# **2. Intégration de l'API simulée + validation Zod**

Intégrez le code fourni dans votre projet dans la zone adéquate, puis utilisez TanStack Query pour exploiter cette API et gérer son cycle complet :

* chargement
* succès
* échec
* validation

---

# **3. Store Zustand orienté métier**

Créez un store Zustand dédié à :

* stocker la donnée reçue
* déterminer si elle est première
* gérer l'état d'affichage

Sans logique réseau, sans appel React Query.

---

# **4. Hook TanStack Query dédié**

Créez un hook de consultation de votre API simulée pour isoler toute la logique asynchrone.

L'objectif est d'apprendre la séparation des responsabilités.

---

# **5. Routes `/` et `/primes`**

Avec TanStack Router, créez deux pages distinctes :

### `/` (accueil)

* présentation simple
* explication du fonctionnement

### `/primes`

* utilisation combinée de :

  * TanStack Query (pour récupérer le nombre)
  * Zustand (pour la logique et l'affichage)
  * votre fonction déterminant si le nombre est premier
  * useMemo (si pertinent) pour optimiser les recalculs répétitifs

---

# **6. Ajoutez maintenant un formulaire pour proposer un nombre**

Ajoutez un champ input et proposez un nombre, dire si celui-ci est premier. Vérifiez que ce dernier est au bon format avec `zod`

# **Conseils**

* Travaillez en binôme, mais répartissez clairement les responsabilités.
* Faites des recherches : documentation officielle, exemples, articles, etc, demandez de l'aide.
* Justifiez vos choix d'architecture.
* Respectez la séparation logique :

  * **Métier → Zustand**
  * **Asynchrone → TanStack Query**
  * **Optimisation → useMemo** facultatif
  * **Validation → Zod**, facultatif

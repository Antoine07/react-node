## Sujet : Implémenter une mini « machine à additionner » avec Zustand

### Objectif

<img src="./images/machineT.gif" width="500" />

On veut simuler une machine très simple inspirée de la machine de Turing.
Elle va **transformer des symboles en unaire** :

```txt
_ = 1
```


Nous allons représenter la bande (mémoire) comme un tableau :

```
["_", "_", "_", "_", "_", "_", "1"]
```

Le rôle de la machine est de **lire un premier`_` et de remplacer ce symbole par `1` et d'avancer jusqu'à lire `1` et se mettre dans le mode `HALT`** dans cet état la machine est arrêtée.


---

### Règles de transition de la machine

La machine possède **un état** (ici toujours `A` jusqu'à l'arrêt),
une **tête de lecture** (un index dans le tableau),
et applique ces règles :

| État | Symbole lu | Écrire | Déplacer             | Nouvel état |
| ---- | ---------- | ------ | -------------------- | ----------- |
| A    | _          | 1      | → (droite)           | A           |
| A    | 1         | 1      | (pas de déplacement) | HALT (fin)  |

---

### Contraintes de l'exercice

1. Créer un **store Zustand** contenant :

   * `tape` : la bande (un tableau de chaînes de caractères)
   * `head` : position actuelle de la tête (index)
   * `mode` : état actuel (`"A"` au départ)
   * `step()` : exécuter **un pas** selon les règles
   * `reset()` : remettre la machine à l'état initial

2. Créer une **interface React simple** permettant :

   * d'afficher la bande avec la position de la tête
   * de voir l'état actuel
   * un bouton `Step`
   * un bouton `Reset`

3. Créez un bouton personnalisable UI dans un dossier ui dans le dossier `components`

4. Modifiez le code de votre store pour utiliser pro

---

### Ajoutez la structure et les pages suivantes dans le projet 

```txt
├── components
│   ├── Cell.jsx
│   ├── MachineTuring.jsx
│   └── ui
│       └── Button.jsx  <-- Seulement pour celles et ceux qui ont un bon niveau
├── index.css
├── main.jsx
└── stores
    └── useMachineStore.js
```


### Travail attendu

* Ajouter le composant React affichant la bande et les boutons sur la bonne page.
* Tester l'exécution étape par étape (avec un clique)
* Vérifier le passage à l'état `HALT` et l'écriture unaire.

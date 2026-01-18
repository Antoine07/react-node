**TP – Panneau de LEDs avec montage/démontage et compteur**

---

<img src="./images/app-leds.gif" width="500" />

Vous avez pour les deux exercices sur les leds un modèle pour démarrer ce tp : 

- [App.jsx](./models/App.jsx)
- [LedPanel.jsx](./models/LedPanel.jsx)


### **Decription**

Dans ce TP on va ajouter un `useEffect` pour réviser cette notion.

Une **LED supplémentaire** au-dessus (bleue),
La possibilité de **la démonter et de la remonter**,
Un **compteur de changements d'état** affiché uniquement quand la LED est démontée

**Hooks utilisés :**

1. **useReducer** pour gérer l'état de la LED active (cycle rouge → jaune → vert)
1. **useState** pour :
Suivre le **nombre de changements d'état**
Gérer si la LED du haut est **montée** ou **démontée**
Stocker la **valeur du compteur** au moment du démontage

1. **useEffect** pour détecter et **compter automatiquement les changements d'état**
1. **Props** pour transmettre l'état et les actions au composant d'affichage
1. **Conditionnel rendu** afin d'afficher :

LED bleue + bouton "Démontage" lorsqu'elle est montée
Valeur mémorisée + bouton "Remontage" lorsqu'elle est démontée

1. **Transitions visuelles** via Tailwind pour conserver une interface claire et lisible

---

### **Organisation des composants**

Identique à l'autre TP on va créer deux composants `App` et `LedPanel`.

**Composant principal (`App`) :**

1. Gère l'état des LEDs principales via `useReducer`
1. Incrémente automatiquement un **compteur** à chaque changement d'état.
1. Contrôle le **montage/démontage** de la LED bleue + mémorisation de la valeur du compteur

*Vous devez afficher le résultat du compteur une fois le composant démonté dans la page*

**Composant d'affichage (`LedPanel`) :**

1. Affiche les 3 LEDs principales avec mise en évidence de la LED active
1. Gère l'affichage de la LED bleue selon deux modes :

**Montée :** LED + bouton "Démontage"
**Démontée :** affichage du **compteur** + bouton "Remontage"

Mise en forme cohérente via Tailwind (taille, opacité, ombre, transitions), récupérez les design déjà écrit.

**Résultat attendu :**

1. Un panneau interactif permettant de **suivre l'activité** du système grâce au compteur
1. Un **montage/démontage propre et visuel** de la LED supplémentaire

**TP – Gestion d'un panneau de LEDs avec React**

---

### **Description**

<img src="./images/app-leds-simple.gif" width="500" />

Vous avez pour les deux exercices sur les leds un modèle pour démarrer ce tp : 

- [App.jsx](./models/App.jsx)
- [LedPanel.jsx](./models/LedPanel.jsx)

Mettre en place un panneau de 3 LEDs (rouge, jaune, vert) dont l'état actif change selon des commandes.
L'interface doit permettre de passer à la LED suivante, précédente ou de réinitialiser l'affichage.

**Contraintes:**

* **Composants fonctionnels React**
* **Props** pour transmettre l'état actif au composant d'affichage
* **useReducer** pour gérer un **état avec transitions** (plutôt qu'un simple `useState`), on a plus d'algorithmique.
* **TailwindCSS** pour la mise en forme des LEDs (couleurs, transitions, animations)
* Logique de **cycle** des états - récupérez les sources pour ne pas perdre de temps avec le design pour l'instant.

Les fonctionnalités de vos boutons

1. `NEXT` : rouge → jaune → vert → rouge
1. `PREV` : rouge → vert → jaune → rouge
1. `RESET` : retour au rouge

---

### **Organisation des composants**

Vous allez créer deux composants: `App` et `LedPanel`.

**Composant principal (`App`) :**

1. Initialise un état `active = "red"` via `useReducer`
1. Fournit des boutons permettant d'envoyer des actions au reducer
1. Transmet la valeur `active` au composant d'affichage

**Composant d'affichage (`LedPanel`) :**

1. Reçoit `active` comme prop
1. Définit une liste de LEDs (chaque LED = couleur + classe CSS)
1. Applique un style différent à la LED dont la couleur correspond à `active` :

LED active : taille légèrement augmentée + opacité forte + ombre
LEDs inactives : opacité réduite

**La partie UI:**

Un panneau visuel clair avec une **LED active bien mise en évidence**
Des transitions fluides entre les états grâce aux classes Tailwind

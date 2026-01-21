---
marp: true
theme: default
paginate: true
class: lead
---


### **Zustand plusieurs stores - organisation**

---


### Architecture en composant 

```txt
src/
  components/
    Header.jsx
    ThemeButton.jsx
    UserMenu.jsx

  stores/
    useUserStore.js     // état utilisateur
    useUIStore.js       // état interface (thème, modals…)
    useTasksStore.js    // état métier (ex : liste de tâches)

  pages/               // utile quand on va faire du routing
    Home.jsx
    Dashboard.jsx

  services/

...
```

---

### Exercice Zustand

1. Créez une application avec Zustand, Tailwind CSS qui affiche une liste de nombres numériques, ajoutez les fonctionnalités suivantes 
  1.1 Mélangez la liste
  1.1 Ajoutez un nombre qui n'est pas dans la liste et gérez le cas où ce nombre est déjà dans la liste
  1.1 Comptez le nombre de nombre divisible par 3.

---


## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

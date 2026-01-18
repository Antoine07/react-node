#  Exercice — SRP et Interface : mini panier

---

## Présentation

Créer un petit programme TypeScript qui respecte le **principe SRP**
(Single Responsibility Principle) :

> Chaque partie du code doit avoir **une seule mission claire**.

---

## 🛒 Contexte

On veut simuler un **petit panier de courses** :

* Ajouter un produit
* Calculer le total
* Afficher le contenu

Mais chaque responsabilité doit être **séparée**.

---

## Étapes à suivre

### 1️⃣ Créer une interface `Product`

Définir un produit avec :

* `name` (chaîne)
* `price` (nombre)

Créer **deux produits d'exemple**, par exemple “Café” et “Croissant”.

---

### 2️⃣ Créer une classe `Cart`

Cette classe contient :

* une **liste de produits**
* une méthode `add(product)` pour ajouter un produit
* une méthode `getTotal()` pour calculer le prix total

**Responsabilité unique :** gérer les données du panier.

---

###  Créer une classe `CartDisplay`

Cette classe contient une méthode `show(cart)` qui :

* affiche tous les produits du panier
* affiche le total

**Responsabilité unique :** afficher les informations.

---

### Tester

Créer une instance du panier, y ajouter quelques produits,
puis afficher le contenu avec `CartDisplay`.

---

## Résultat attendu

L'affichage doit ressembler à :

```
Café - 3 €
Croissant - 2 €
Total : 5 €
```

---

## Rappel du SRP

> Si une classe a plusieurs raisons de changer, elle viole le SRP.
> Ici, `Cart` gère les données, `CartDisplay` gère la présentation.

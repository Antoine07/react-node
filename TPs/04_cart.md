# TP n°2 — Panier d'achat avec Zustand

## Présentation

Dans un nouveau projet React.

Créez un menu avec Tanstack router avec les items de menus suivants : Home, Catalogues. La page Home présente les derniers produits et la page `Catalogues` permet de commander les produits dans le paniers.

Créer une mini-application React permettant de gérer un panier d'achat (add / remove / total).
Le panier sera stocké **dans Zustand** pour être accessible depuis n'importe quel composant.

Créez un thème sombre et clair qui persistera si vous avez le temps.

Vous êtes libre pour la partie UX.


---

## Contraintes

Vous devez créer un store Zustand contenant :

| Propriété                   | Type             | Description                                              |
| --------------------------- | ---------------- | -------------------------------------------------------- |
| `products`                  | tableau d'objets | Catalogue disponible (id, nom, prix)                     |
| `cart`                      | tableau d'objets | Articles ajoutés au panier (id, quantité)                |
| `addToCart(productId)`      | fonction         | Ajoute un article (ou augmente quantité si déjà présent) |
| `removeFromCart(productId)` | fonction         | Diminue la quantité, ou supprime si quantité = 0         |
| `clearCart()`               | fonction         | Vide complètement le panier                              |
| `total()`                   | fonction         | Renvoie le prix total calculé                            |

---

## Exemple de store (à compléter)

`useCartStore.js`

```js
import create from "zustand";
import { produce } from "immer";

const useCartStore = create((set, get) => ({
  products: [
    { id: 1, name: "Café", price: 3 },
    { id: 2, name: "Thé", price: 2 },
    { id: 3, name: "Chocolat", price: 4 }
  ],

  cart: [],

    // TODO
}));

export default useCartStore
```

---

## Interface à réaliser

Vous devez créer **deux composants** :

### 1) Catalogue (`ProductList.js`)

* Afficher la liste des produits
* Bouton **"Ajouter au panier"** pour chacun


### 2) Panier (`Cart.js`)

* Liste des articles du panier
* Boutons **+** et **–**
* Affichage du **total**
* Bouton **Vider le panier**

### 3) Page catégorie des Produit - route paramètrique

*Si vous le souhaitez vous pouver repartir sur un nouveau projet*

```js
// Fichier : routes/catalogue.$name.jsx
import { useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/catalogue/$name")({
  component: ProductDetail,
})

function ProductDetail() {
  const { name } = useParams()
  return <h2>Catégorie du produit : {name}</h2>
}

```

Si vous devez récupérez les paramètres d'une route dans un composant écrivez votre paramètre comme suit 

```js
 const params = useParams({ from: '/catalogue/$name' }) // ici vous récupérez le nom de votre route 

// une autre syntaxe
 const postId = useParams({
    from: '/catalogue/$name',
    select: (params) => params.postId,
})

 ```

Vous partirez de ces données enrichies et afficherez les produits par catégorie : boissons, gâteaux et pâtisseries, en créant des routes paramètriques. Créez des liens pour afficher le détails de ces produits.

```js
products: [
  {
    id: 1,
    name: "Café Arabica",
    price: 3.5,
    category: "boissons",
    description: "Un café 100% Arabica torréfié lentement pour un goût doux et équilibré.",
    rating: 4.6,
    stock: 24,
    origin: "Colombie"
  },
  {
    id: 2,
    name: "Thé Vert Matcha",
    price: 2.8,
    category: "boissons",
    description: "Thé vert matcha premium avec une légère amertume et des notes végétales.",
    rating: 4.2,
    stock: 15,
    origin: "Japon"
  },
  {
    id: 3,
    name: "Chocolat Noir 80%",
    price: 4.2,
    category: "gâteaux",
    description: "Tablette de chocolat noir intense (80%) à la texture fondante.",
    rating: 4.7,
    stock: 40,
    origin: "Belgique"
  },
  {
    id: 4,
    name: "Croissant Beurre AOP",
    price: 1.9,
    category: "pâtisseries",
    description: "Croissant pur beurre AOP croustillant et doré, fait chaque matin.",
    rating: 4.5,
    stock: 32,
    origin: "France"
  },
  {
    id: 5,
    name: "Cookie Double Chocolat",
    price: 2.2,
    category: "pâtisseries",
    description: "Cookie moelleux au chocolat noir et lait, pépites généreuses.",
    rating: 4.8,
    stock: 18,
    origin: "États-Unis"
  },
  {
    id: 6,
    name: "Jus d'Orange Pressé",
    price: 3.0,
    category: "boissons",
    description: "Jus d'orange pressé à froid, riche en vitamines, sans sucre ajouté.",
    rating: 4.4,
    stock: 12,
    origin: "Espagne"
  }
],

```
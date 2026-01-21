---
marp: true
theme: default
paginate: true
class: lead
---

# **Les Props et la Composition dans React**

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

---

## 1. Introduction

### Définition

Les **props** (abréviation de *properties*) sont les **valeurs transmises d'un composant parent à un composant enfant**.
Elles permettent de rendre un composant **réutilisable, configurable et dynamique**.

En React, un composant est une fonction qui reçoit un objet `props` en paramètre et retourne une interface JSX.

> Les props sont **en lecture seule** : elles ne peuvent **jamais être modifiées directement** dans le composant (avec une nuance à propos de la déstructuration).

---

## 2. Syntaxe de base

```jsx
function Welcome(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Le composant `App` **envoie** une prop `name` à `Welcome`.
Le composant `Welcome` **reçoit** cette donnée via `props.name`.
Chaque appel à `<Welcome />` crée une version personnalisée du composant.

---

## 3. Comment React interprète les props

```jsx
<Welcome name="Alice" />
```

est équivalent à :

```js
Welcome({ name: "Alice" });
```

Les props sont simplement un **objet JavaScript passé en argument** à la fonction composant.

---

## 4. Plusieurs props

```jsx
function Profile(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.role}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

function App() {
  return <Profile name="Charlie" role="Designer" age={25} />;
}
```

Chaque attribut du composant (`name`, `role`, `age`) devient une propriété de `props`.

---

## 5. Déstructuration des props

Pour alléger la syntaxe, on peut **déstructurer** l'objet `props` :

```jsx
function Profile({ name, role, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{role}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

C'est équivalent à `props.name`, `props.role`, etc.,
mais plus clair et plus lisible.

---

## 6. Lecture seule et déstructuration

Les **props** sont **en lecture seule**, mais cette immutabilité a des limites qu'il faut comprendre.

### Lecture seule

Un composant ne doit jamais modifier ses props directement :

```jsx
function Profile(props) {
  props.name = "Bob"; // ❌ ne marche pas
  return <h3>{props.name}</h3>;
}
```

Modifier une prop casse le **flux de données unidirectionnel** de React —
le principe selon lequel les données vont du parent vers l'enfant.
Cela contredit la philosophie déclarative et prévisible de la programmation orientée composants.

---

### Cas particulier : la déstructuration

Lorsqu'on écrit :

```jsx
function Profile({ name, user }) {
  name = name.toUpperCase(); // autorisé (copie locale, primitive)
  user.age = 30;             // dangereux (mutation d'un objet)
  return <h3>{name} — {user.age}</h3>;
}
```

---

### Résumé sur props

| Type de donnée                          | Comportement                                                | Recommandation |
| --------------------------------------- | ----------------------------------------------------------- | -------------- |
| Valeur primitive (string, number, bool) | Copie locale → modifier la variable n'affecte pas le parent | Sans risque    |
| Objet / tableau (référence)             | La référence est partagée → modifier impacte le parent      | À éviter       |

---

### Exemple à ne pas faire

```jsx
function App() {
  const user = { name: "Alice", age: 20 };
  return <Profile user={user} />;
}

function Profile({ user }) {
  user.age = 99; // ❌ Modifie aussi l'objet dans App
  return <p>{user.name} is {user.age}</p>;
}
```

React ne bloque pas cette mutation, mais cela **viole le principe de données descendantes**.

---

### Bonne pratique

Ne jamais modifier un objet reçu par props.
Si une donnée doit changer :

1. Gère-la dans le **parent** (via un `state`).
2. Passe une **fonction callback** pour notifier le parent.
3. Ou crée une **copie immuable** (`{ ...user, age: newAge }`).

---

## 7. Exercice – `ProductCard`

1. Définissez un composant `ProductCard` (`name`, `price`, `image`).
   Exemple d'image :

   ```jsx
   <img src={image} alt={name} width="80" />
   ```

   Vous pouvez utiliser le site : [https://picsum.photos/](https://picsum.photos/)

2. Ajoutez une prop `inStock={true}`

3. Si `inStock` vaut `false`, affichez “Out of stock” en rouge à la place du prix.
   Si `inStock` vaut `true`, affichez le prix et “On Sale!” si `price < 20`.

---

*Suite de l'exercie*

4. Ajoutez un troisième produit pour tester les trois cas :

   * disponible et en promotion
   * disponible sans promotion
   * non disponible

**Résultat attendu :**

```
Mouse – 15 € – On Sale!
Keyboard – 45 €
Headphones – Out of stock
```

---

## 8. La composition

### Principe

La **composition** consiste à **assembler plusieurs composants** pour construire une interface.
C'est le cœur de la **programmation orientée composants** : chaque partie est indépendante, réutilisable et combinable.

> En React, on compose plutôt qu'on hérite.

---

### Exemple simple

```jsx
function Header() { return <h1>My Site</h1>; }
function Footer() { return <footer>© 2025 My Site</footer>; }

function App() {
  return (
    <div>
      <Header />
      <p>Welcome!</p>
      <Footer />
    </div>
  );
}
```

Chaque composant a un rôle précis et peut être réutilisé ailleurs.

---

### Les `props.children`

Un composant peut afficher du contenu passé **entre ses balises** grâce à la prop spéciale `children`.

```jsx
function Card({ title, children }) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Info">
      <p>This is inside the card!</p>
    </Card>
  );
}
```

`children` contient tout ce qui est écrit entre `<Card>...</Card>`.

---

### 8. Exercice – Composition

Créer trois composants :

```jsx
<Header />
<Main>
  <p>Welcome to my blog!</p>
</Main>
<Footer text="© 2025 React Academy" />
```

* `Main` doit utiliser `props.children`
* `Footer` reçoit son texte via `props.text`

---

## 9. Résumé

En React, on **compose les composants** comme des briques indépendantes.
Les **props** permettent de transmettre des données,
et `props.children` permet d'insérer du contenu dynamique dans un composant.


---

## Merci d'avoir écouté cette partie sur les props

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

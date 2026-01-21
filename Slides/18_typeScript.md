---
marp: true
theme: default
paginate: true
class: lead
---

# Introduction à TypeScript (cours progressif)

---

## 1. Comprendre TypeScript

**TypeScript** est un langage créé par Microsoft.
C'est une **extension de JavaScript** qui ajoute des **types**.
Le code TypeScript se **compile** ensuite en JavaScript classique.

> 👉 TypeScript = JavaScript + typage statique

---

### Pourquoi l'utiliser ?

1. **Moins d'erreurs** : détectées avant même d'exécuter le code.
2. **Auto-complétion** et **documentation automatique**.
3. **Code plus clair et plus sûr**.
4. **Refactoring plus facile** : TypeScript vous aide à corriger partout.

---

### Exemple comparatif

#### En JavaScript :

```js
function add(a, b) {
  return a + b
}

add("3", 5) // "35" -> Erreur logique
```

#### En TypeScript :

```ts
function add(a: number, b: number): number {
  return a + b
}

// Erreur de compilation : "3" n'est pas un nombre
add("3", 5)
```

✅ L'erreur est détectée avant même de lancer le programme.

---

## 2. Installation et configuration

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

Le fichier `tsconfig.json` permet de configurer la compilation (target, dossier de sortie, etc.).

Ensuite, créer un fichier :

```
index.ts
```

et exécuter :

```bash
npx tsc index.ts
```

---

## 3. Typage des variables

```ts
let name: string = "Pikachu"
let age: number = 10
let isElectric: boolean = true
```

Les types possibles :

| Type                | Exemple                   |
| ------------------- | ------------------------- |
| `string`            | `"Hello"`                 |
| `number`            | `42`                      |
| `boolean`           | `true`                    |
| `string[]`          | `["a", "b", "c"]`         |
| `any`               | désactive le typage       |
| `unknown`           | valeur inconnue à valider |
| `null`, `undefined` | valeurs spéciales         |

---

## ✏️ Exercice 1

Créer trois variables :

* `playerName` (chaîne)
* `level` (nombre)
* `isChampion` (booléen)

Affichez une phrase :

> "Le joueur [nom] est niveau [level]. Champion : [isChampion]."

*Essayez de modifier un type et observez l'erreur.*

---

## 4. Typage des fonctions

```ts
function multiply(a: number, b: number): number {
  return a * b
}
```

* `a: number`, `b: number` → paramètres typés
* `: number` après la parenthèse → type du retour

### Exemple

```ts
function greet(name: string): string {
  return `Bonjour ${name}!`
}
```

### Paramètre optionnel

```ts
function greet(name?: string) {
  console.log("Bonjour", name || "inconnu")
}
```

---

## ✏️ Exercice 2

Créer une fonction `square` qui :

* prend un nombre `n` en paramètre,
* retourne son carré.

Créer une autre fonction `isEven` :

* prend un nombre,
* retourne `true` s'il est pair, sinon `false`.

Testez avec plusieurs valeurs.

---

## 5. Typage des tableaux et objets

### Tableaux

```ts
let scores: number[] = [10, 20, 30]
let names: string[] = ["Ash", "Misty", "Brock"]
```

### Objets

```ts
let user: { name: string; age: number } = {
  name: "Ash",
  age: 12,
}
```

### Interface (plus lisible)

```ts
interface User {
  name: string
  age: number
}

const user: User = { name: "Misty", age: 14 }
```

---

## ✏️ Exercice 3

Créer une interface `Pokemon` avec :

* `name` (string)
* `type` (string)
* `level` (number)

Créer un tableau de trois Pokémon et afficher leurs noms.

---

## 6. Typage des fonctions qui manipulent des objets

```ts
interface Pokemon {
  name: string
  level: number
}

function levelUp(p: Pokemon): Pokemon {
  return { ...p, level: p.level + 1 }
}

const pikachu = { name: "Pikachu", level: 5 }
console.log(levelUp(pikachu))
```

---

## ✏️ Exercice 4

Créer une fonction `strongestPokemon` :

* prend un tableau de Pokémon,
* retourne celui avec le niveau le plus haut.

---

## 7. Types avancés (intro)

### Union de types

```ts
let id: string | number
id = "abc"
id = 123
```

### Type alias

```ts
type ID = string | number
let userId: ID = "user-42"
```

### Littéraux

```ts
let direction: "north" | "south" | "east" | "west"
direction = "north" // ✅
direction = "up" // ❌
```

---

## ✏️ Exercice 5

Créer un type `Move` représentant une direction possible :
`"up" | "down" | "left" | "right"`

Créer une fonction `moveCharacter` qui affiche :

> “Le joueur se déplace vers [direction].”

Testez avec chaque direction.

---

## 8. Typage des fonctions asynchrones

```ts
async function fetchData(): Promise<string> {
  return "Data chargée"
}
```

### Exemple concret :

```ts
async function getPokemon(): Promise<void> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/1")
  const data: any = await res.json()
  console.log(data.name)
}
```

---

## ✏️ Exercice 6

Créer une fonction asynchrone `fetchUser(id: number)` :

* Appelle `https://jsonplaceholder.typicode.com/users/{id}`
* Affiche le nom de l'utilisateur récupéré.

---

## 9. Étapes pour adopter TypeScript progressivement

1. Ajouter TypeScript au projet.
2. Renommer quelques fichiers `.js` → `.ts`.
3. Corriger les erreurs principales.
4. Ajouter peu à peu des interfaces et types.
5. Configurer un niveau strict progressivement.

---

## 10. Récapitulatif

| Concept         | Exemple                           | Rôle                |                 |
| --------------- | --------------------------------- | ------------------- | --------------- |
| `: type`        | `let x: number`                   | Typage de variable  |                 |
| `interface`     | `interface User { name: string }` | Modèle de données   |                 |
| `type`          | `type ID = string                 | number`             | Alias ou unions |
| `function`      | `function f(x: number): number`   | Typage de fonctions |                 |
| `Promise<Type>` | `Promise<string>`                 | Typage asynchrone   |                 |
| `any`           | libre                             | À éviter            |                 |

---

## 🧩 Projet de synthèse (15 min)

Créer un mini programme qui :

1. Contient une interface `Pokemon` avec `name`, `level`, `type`.
2. Crée un tableau de Pokémon.
3. Contient une fonction `train(pokemon)` qui augmente le niveau.
4. Affiche le Pokémon le plus fort.

---

## Ce qu'il faut retenir

* TypeScript est une **aide à la rigueur**, pas une contrainte.
* Il améliore la **sécurité du code** sans changer sa logique.
* On peut l'adopter **progressivement**, fichier par fichier.
* Une fois intégré, il rend le code **plus clair, robuste et maintenable**.

---

[tp solid](https://github.com/Antoine07/react_web2/blob/main/TPs/07_srp_cart.md)


---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

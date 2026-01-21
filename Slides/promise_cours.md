---
marp: true
class: lead
paginate: true
theme: default
---

# Promesses (Promises) & `async/await`

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

---

## Plan

- Pourquoi l'asynchrone ?
- Promesse: définition + états
- `then/catch/finally` + chaînage
- `Promise.all` / `allSettled` / `race` / `any`
- `async/await` (et pièges courants)
- Exercices

---

## Pourquoi l'asynchrone ?

Exemples d'opérations "lentes":
- requêtes réseau (API)
- timers (`setTimeout`)
- lecture/écriture (fichiers, DB)

Objectif: ne pas bloquer l'UI / le serveur pendant l'attente.

---

## Exemple: timer (asynchrone)

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```

Résultat:
- `A`, `C`, puis `B`

---

## Callback hell (problème)

```js
getUser(id, (err, user) => {
  if (err) return console.error(err);
  getPosts(user.id, (err2, posts) => {
    if (err2) return console.error(err2);
    getComments(posts[0].id, (err3, comments) => {
      if (err3) return console.error(err3);
      console.log(comments);
    });
  });
});
```

Lisibilité + gestion d'erreurs difficiles.

---

## Définition d'une promesse

Une *promise* représente une opération asynchrone qui:
- n'a pas encore terminé au moment où le code s'exécute
- finira soit par une valeur (succès), soit par une erreur (échec)

---

## Les 3 états d'une Promise

- **pending** : en cours
- **fulfilled** : réussie (résolue)
- **rejected** : échouée (rejetée)

---

## Créer une Promise (exemple pédagogique)

```js
const maPromesse = new Promise((resolve, reject) => {
  const ok = true;
  if (ok) resolve("Succès");
  else reject(new Error("Erreur"));
});
```

`resolve(value)` → fulfilled  
`reject(error)` → rejected

---

## Règle pratique (très importante)

On évite `new Promise(...)` quand une API renvoie déjà une promesse.

Exemples qui renvoient déjà une Promise:
- `fetch(...)`
- la plupart des libs modernes (Axios, DB clients, etc.)

---

## Consommer une Promise: `then/catch/finally`

```js
maPromesse
  .then((value) => {
    console.log("OK:", value);
  })
  .catch((error) => {
    console.error("KO:", error);
  })
  .finally(() => {
    console.log("Toujours exécuté");
  });
```

---

## Chaînage (chaining)

Le `then` renvoie une nouvelle promesse.

```js
wait(500)
  .then((msg) => msg.toUpperCase())
  .then((upper) => console.log(upper))
  .catch(console.error);
```

Si vous retournez une valeur → elle devient le résultat du prochain `then`.

---

## Chaînage: retourner une Promise

```js
fetch("/api/posts")
  .then((res) => res.json()) // res.json() renvoie une Promise
  .then((posts) => console.log(posts))
  .catch(console.error);
```

---

## Propagation des erreurs

Une exception dans un `then` devient un rejet:

```js
Promise.resolve("ok")
  .then(() => {
    throw new Error("Boom");
  })
  .catch((e) => console.error("attrapé:", e.message));
```

---

## Exemple: `wait(ms)`

```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Terminé après ${ms} ms`), ms);
  });
}
```

---

## Promesses en parallèle (combinators)

Quand on lance plusieurs opérations:
- en parallèle (plus rapide)
- ou en séquence (si dépendances)

---

## `Promise.all` (tout doit réussir)

```js
const [user, posts] = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);
```

- Résout si tout réussit
- Rejette dès qu'une promesse échoue

---

## `Promise.allSettled` (collecter succès + erreurs)

```js
const results = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),
]);

for (const r of results) {
  if (r.status === "fulfilled") console.log("OK", r.value);
  else console.log("KO", r.reason);
}
```

---

## `Promise.race` (le premier qui termine)

Utile pour des timeouts:

```js
const result = await Promise.race([
  fetch("/api/posts").then((r) => r.json()),
  wait(2000).then(() => {
    throw new Error("Timeout");
  }),
]);
```

---

## `Promise.any` (le premier succès)

```js
const firstOk = await Promise.any([
  fetch("/mirror-1").then((r) => r.json()),
  fetch("/mirror-2").then((r) => r.json()),
]);
```

Rejette seulement si **toutes** échouent.

---

## `async/await` (syntaxe)

`async/await` est du "sucre syntaxique" sur les Promises.

```js
async function run() {
  const value = await maPromesse;
  return value;
}
```

Une fonction `async` renvoie toujours une Promise.

---

## Gestion d'erreurs avec `try/catch`

```js
async function run() {
  try {
    const value = await maPromesse;
    console.log(value);
  } catch (e) {
    console.error(e);
  }
}
```

---

## Parallèle vs séquence (avec `await`)

Séquence (plus lent si indépendant):

```js
const a = await fetch("/api/a").then((r) => r.json());
const b = await fetch("/api/b").then((r) => r.json());
```

Parallèle (recommandé si indépendant):

```js
const [a, b] = await Promise.all([
  fetch("/api/a").then((r) => r.json()),
  fetch("/api/b").then((r) => r.json()),
]);
```

---

## Piège: `forEach` + `async`

`forEach` n'attend pas les `await`:

```js
items.forEach(async (item) => {
  await save(item); // ❌ pas attendu globalement
});
```

Correct (séquentiel):

```js
for (const item of items) {
  await save(item);
}
```

Correct (parallèle):

```js
await Promise.all(items.map((item) => save(item)));
```

---

## `for await...of` (Async Iterables)

`for await...of` permet d'itérer sur des **valeurs asynchrones**:
- un *async iterable* (streams, cursors, etc.)
- ou un tableau de Promises (traitement séquentiel)

---

## `for await...of` sur un tableau de Promises

Traitement **séquentiel** (une par une):

```js
const promises = [
  wait(200).then(() => "A"),
  wait(100).then(() => "B"),
];

for await (const value of promises) {
  console.log(value);
}
```

Remarque: les Promises sont créées immédiatement, mais on attend leurs résultats au fur et à mesure.

---

## Séquence "propre" avec fonctions (recommandé)

Si vous voulez éviter de lancer toutes les tâches d'un coup:

```js
const tasks = [
  () => wait(200).then(() => "A"),
  () => wait(100).then(() => "B"),
];

for (const task of tasks) {
  const value = await task();
  console.log(value);
}
```

---

## `for await...of` sur un stream (ex: Node.js)

Exemple avec un stream (lecture asynchrone par chunks):

```js
import fs from "node:fs";

const stream = fs.createReadStream("file.txt", "utf8");

for await (const chunk of stream) {
  console.log("chunk:", chunk);
}
```

---

## Piège: oublier `await`

```js
const data = fetch("/api/posts").then((r) => r.json());
console.log(data); // Promise (pas les données)
```

Correct:

```js
const data = await fetch("/api/posts").then((r) => r.json());
```

---

## Exercices

Les exercices sont faisables en Node ou dans le navigateur.

---

## Exercice 1 — `wait(ms)`

Créer `wait(ms)` qui:
- retourne une Promise
- résout après `ms`
- renvoie un message (string)

---

## Exercice 2 — `timeout(promise, ms)`

Écrire `timeout(promise, ms)` qui:
- résout comme `promise` si elle termine à temps
- sinon rejette avec `Error("Timeout")`

Indice: `Promise.race`.

---

## Exercice 3 — `retry(fn, times)`

Écrire `retry(fn, times)` qui:
- appelle `fn()` (qui renvoie une Promise)
- en cas d'échec, réessaie jusqu'à `times` fois
- à la fin: résout (si succès) ou rejette (si tous les essais échouent)

---

## Corrigé — Ex 1

```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Terminé après ${ms} ms`), ms);
  });
}
```

---

## Corrigé — Ex 2

```js
function timeout(promise, ms) {
  return Promise.race([
    promise,
    wait(ms).then(() => {
      throw new Error("Timeout");
    }),
  ]);
}
```

---

## Corrigé — Ex 3

```js
async function retry(fn, times) {
  let lastError;

  for (let attempt = 1; attempt <= times; attempt += 1) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError;
}
```

---

## Fin

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

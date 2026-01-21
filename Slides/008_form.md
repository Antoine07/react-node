---
marp: true
theme: default
paginate: true
class: lead
---

# **Les Formulaires en React et la Validation avec Zod**

---

## 1. Introduction : Gérer les données utilisateur

Les formulaires permettent de **récupérer et manipuler** les données saisies par l'utilisateur.
En React, ils sont souvent dits **contrôlés**, car leur état est géré par le **state** du composant.

---

## 2. Les formulaires contrôlés

Un **formulaire contrôlé** est un composant dont la valeur est **liée au state React**.
Cela permet un contrôle total sur les données et leur validation.

---

```jsx
function SimpleForm() {
  const [name, setName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bonjour ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Votre nom"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

---

### Points importants

| Élément              | Rôle                                   |
| -------------------- | -------------------------------------- |
| `value`              | reflète le state                       |
| `onChange`           | met à jour le state                    |
| `onSubmit`           | intercepte la soumission du formulaire |
| `e.preventDefault()` | empêche le rechargement de la page     |

---

## 3. Plusieurs champs dans un même formulaire

```jsx
function SignupForm() {
  const [form, setForm] = React.useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Valider</button>
    </form>
  );
}
```

---

On crée une **copie immuable** du `form` avant de le modifier :
`{ ...form, [e.target.name]: e.target.value }`

---

## 4. Validation native (limitée)

HTML propose déjà des validations simples :
`required`, `type="email"`, `minLength`, etc.

```jsx
<input type="email" required placeholder="Entrez votre email" />
```

Mais pour des validations **plus complexes et dynamiques**,
il faut utiliser une bibliothèque dédiée → **Zod**.

---

## 5. Introduction à Zod

Zod est une **librairie de validation déclarative**.
Elle permet de **décrire la forme attendue** des données et de **vérifier leur conformité**.

### Installation

Dans un projet Vite déjà configuré dans un projet avec `vite`, ajoutez la dépendance `zod`de manière classique :

```bash
npm install zod
```

Puis importer dans ton code :

```js
import { z } from "zod"
```

---

## 6. Définir un schéma de validation

```jsx
const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Mot de passe trop court."),
});
```

---

## 7. Validation avec `safeParse()`

```jsx
const result = formSchema.safeParse({
  name: "A",
  email: "invalid@",
  password: "123",
});

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log("✅ Données valides :", result.data);
}
```

➡️ `safeParse()` retourne :

* `{ success: true, data }` si tout est correct,
* `{ success: false, error }` sinon.

---

## 8. Formulaire React + Zod

Voyez l'exemple sur le dépôt suivant.

---

## 9. Points clés à retenir

| Concept                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| **Formulaire contrôlé** | Les champs sont synchronisés avec le state   |
| **Zod**                 | Valide les données via un schéma             |
| **safeParse()**         | Vérifie la validité sans lever d'erreur      |
| **Immutabilité**        | Toujours créer un nouvel objet `{ ...form }` |
| **Messages d'erreur**   | Affichés dynamiquement selon la validation   |

---

## 10. Exercices pratiques

1. Crée un formulaire d'inscription avec `name`, `email`, `password`, `confirmPassword`.
   → Valide que les mots de passe sont identiques.
2. Ajoute une validation : email doit se terminer par `@example.com`.
3. Bonus : affiche un message "Formulaire envoyé avec succès” dans le DOM.




---

## Merci d'avoir écouté cette première partie

Pour revenir à la page d'accueil

[Plan du cours](https://antoine07.github.io/react-node/)

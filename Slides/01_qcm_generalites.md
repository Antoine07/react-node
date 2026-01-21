---
marp: true
theme: default
paginate: true
class: lead
---


# QCM — Introduction à React

### 1. Quel est le rôle principal de React ?

[ ] Manipuler directement le DOM réel pour optimiser le rendu.
[ ] Décrire l'interface utilisateur à l'aide de composants déclaratifs.
[ ] Gérer la base de données côté serveur.
[ ] Compiler le JavaScript en C++.

---

## Décrire l'interface utilisateur à l'aide de composants déclaratifs.

---


### 2. Que fait `React.createElement()` ?

[ ] Crée directement un élément HTML dans le navigateur.
[ ] Exécute une fonction React.
[ ] Compile le code JSX en JavaScript.
[ ] Crée un objet JavaScript représentant un élément du DOM (Virtual DOM).

---

## Crée un objet JavaScript représentant un élément du DOM (Virtual DOM).

---


### 3. Le Virtual DOM permet :

[ ] De remplacer complètement le DOM réel.
[ ] D'exécuter du JavaScript côté serveur.
[ ] D'optimiser les mises à jour du DOM réel.
[ ] De créer des fichiers HTML statiques.

---

##  D'optimiser les mises à jour du DOM réel.

---


### 4. Quelle méthode rend le Virtual DOM dans le DOM réel ?

[ ] `React.render()`
[ ] `ReactDOM.create()`
[ ] `renderDOM()`
[ ] `root.render()`

---

## `root.render()`

---


### 5. Un composant React est :

[ ] Une classe CSS appliquée à un élément.
[ ] Une fonction qui retourne un élément React.
[ ] Un module Node.js.
[ ] Un script externe importé.

---

## Une fonction qui retourne un élément React.

---


### 6. Le rôle de Babel est :

[ ] Compiler les fichiers CSS.
[ ] Créer le Virtual DOM.
[ ] Gérer les dépendances du projet React.
[ ] Transformer le code JSX en JavaScript compréhensible par le navigateur.

---

##  Transformer le code JSX en JavaScript compréhensible par le navigateur.

---


### 7. Quelle syntaxe est correcte dans du JSX ?

[ ] `<div class="box"></div>`
[ ] `<div classname="box"></div>`
[ ] `<div ClassName="box"></div>`
[ ] `<div className="box"></div>`

---

## `<div className="box"></div>`

---


### 8. Dans JSX, les expressions JavaScript s'écrivent :

[ ] Entre guillemets `" "`.
[ ] Entre crochets `[ ]`.
[ ] Entre parenthèses `( )`.
[ ] Entre accolades `{}`.

---

## Entre accolades `{}`.

---


### 9. Quelle est la méthode sûre pour afficher une donnée utilisateur dans JSX ?

[ ] `dangerouslySetInnerHTML={{ __html: userInput }}` sans nettoyage.
[ ] `<div>{innerHTML: userInput}</div>`.
[ ] `{{ userInput }}`.
[ ] `{userInput}`.

---

## `{userInput}`.

---


### 10. Quelle règle JSX est obligatoire ?

[ ] Les composants doivent toujours être des classes.
[ ] Les balises doivent être écrites en majuscules.
[ ] Il faut obligatoirement utiliser `React.Fragment`.
[ ] Un seul élément parent doit envelopper le retour du composant.

---

##  Un seul élément parent doit envelopper le retour du composant.


---


### 11. Que sont les props dans React ?

[ ] Des fonctions permettant de modifier le DOM directement.
[ ] Des valeurs transmises du composant enfant vers le composant parent.
[ ] Des variables locales internes à un composant.
[ ] Des valeurs transmises du composant parent vers le composant enfant.

---

## Des valeurs transmises du composant parent vers le composant enfant.

---


### 12. Que signifie le fait que les props soient « en lecture seule » ?

[ ] On peut les modifier si elles sont des objets.
[ ] Elles ne peuvent pas être changées directement dans le composant enfant.
[ ] Elles se mettent automatiquement à jour dès que le DOM change.
[ ] Elles ne peuvent contenir que des chaînes de caractères.

---

## Elles ne peuvent pas être changées directement dans le composant enfant.

---


### 13. Quelle est la différence entre `props` et la déstructuration `{ name, role }` dans un composant ?

[ ] Aucune, les deux écrivent la même chose avec une syntaxe différente.
[ ] La déstructuration crée de nouvelles props modifiables.
[ ] `props` est un objet unique, la déstructuration permet d'accéder directement à ses clés.
[ ] La déstructuration supprime la lecture seule des props.

---

## `props` est un objet unique, la déstructuration permet d'accéder directement à ses clés.

---


### 14. Quelle est la bonne pratique si un composant doit modifier une donnée reçue par props ?

[ ] Modifier la prop directement avec `props.value = ...`.
[ ] Créer un `useState` dans l'enfant pour écraser la prop.
[ ] Demander au parent de gérer la donnée et passer une fonction callback.
[ ] Utiliser `dangerouslySetInnerHTML`.

---

## Demander au parent de gérer la donnée et passer une fonction callback.

---

### 15. À quoi sert `props.children` ?

[ ] À afficher des éléments HTML internes à ReactDOM.
[ ] À insérer le contenu passé entre les balises d'un composant.
[ ] À définir un état interne du composant.
[ ] À gérer les événements utilisateur.

---

## À insérer le contenu passé entre les balises d'un composant.

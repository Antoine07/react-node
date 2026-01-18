# Mini TP — Liste de Pokémon avec TanStack Query

## Objectif

Créer un petit composant React qui affiche la **liste des 20 premiers Pokémon** à partir de la **PokéAPI**,
en utilisant **TanStack Query** pour gérer le chargement, les erreurs et le cache.

---

## Étapes à suivre

1. **Installer** TanStack Query dans un projet React existant.
2. **Configurer** le client (`QueryClient` + `QueryClientProvider`).
3. **Créer un composant** `PokemonList` :

   * Utiliser `useQuery` pour appeler l’API :
     `https://pokeapi.co/api/v2/pokemon?limit=20`
   * Afficher :

     * "Chargement..." pendant la requête
     * "Erreur..." si la requête échoue
     * La **liste des noms** des Pokémon si tout va bien
4. (Bonus) Ajouter un bouton “Recharger” pour relancer la requête.

---

## Critères de réussite

* Les Pokémon s’affichent correctement.
* Les états *chargement* et *erreur* sont visibles.
* Le composant reste simple, clair et sans `useEffect`.


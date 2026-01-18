# Step 00 — PK (clés primaires) & contraintes d'unicité

## Objectif

Avant de faire des relations (FK/JOIN), on s'assure de maîtriser:
- `PRIMARY KEY`
- `UNIQUE`
- clé primaire composite

## À faire

Compléter `setup.sql`:

1) Créer la base `blog` (si besoin) et la sélectionner
2) Créer une table `users`
   - `id` en PK auto-incrémentée
   - `email` en `UNIQUE` (et `NOT NULL`)
3) Créer une table `post_tags`
   - colonnes: `post_id`, `tag`
   - PK composite: `(post_id, tag)`

## Tester

- Insérer 2 users
- Tenter d'insérer 2 users avec le même email (doit échouer)
- Insérer 2 tags identiques pour le même post (doit échouer)


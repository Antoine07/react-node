# Step 02 — DDL (schéma `blog`)

## Objectif

Créer le schéma relationnel complet:
- `users`
- `posts`
- `comments`

## À faire

Compléter `schema.sql`:
- PK sur chaque table
- FK:
  - `posts.author_id` → `users.id`
  - `comments.post_id` → `posts.id`
- `users.email` unique
- champs obligatoires en `NOT NULL`


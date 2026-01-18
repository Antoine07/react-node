# TP — SQL / MySQL (fil rouge: `blog`)

## Pré-requis

- Accès à un serveur MySQL (local, Docker, VM, etc.)
- Un client MySQL (`mysql`) ou une interface graphique (Workbench / DBeaver)

## Organisation

Chaque step contient:
- des fichiers `.sql` à exécuter
- un `README.md` avec l'énoncé

Corrigés:
- `Corrections/sql-mysql/`

## Steps

- `step-00-primary-keys`: PK / UNIQUE / PK composite
- `step-01-mysql-intro`: créer une base + 1 table + inserts
- `step-02-schema-ddl`: schéma `blog` (DDL)
- `step-03-select-basics`: seed + SELECT (bases)
- `step-04-joins`: JOINs
- `step-05-aggregation`: agrégations
- `step-06-indexes`: index + EXPLAIN
- `step-07-transactions`: transactions
- `step-08-json`: JSON (type + requêtes)

## Bonus (contextes alternatifs)

- `bonus-cart`: panier e-commerce (calculs + upsert)
- `bonus-cinema`: films/séances/réservations/tags (N-N + agrégations)

## Conseils d'exécution

1) Exécuter `schema.sql` (structure)
2) Exécuter `seed.sql` (données)
3) Écrire/exécuter `exercises.sql` (requêtes demandées)

Astuce: exécuter par morceaux (table par table, puis requête par requête).

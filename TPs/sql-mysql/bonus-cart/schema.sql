-- Bonus — Panier e-commerce (schéma)

CREATE DATABASE IF NOT EXISTS shop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE shop;

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- TODO: créer users
-- colonnes: id (PK), email (UNIQUE), name

-- TODO: créer products
-- colonnes: id (PK), name, price_cents

-- TODO: créer carts
-- colonnes: id (PK), user_id (FK users), status ('open' / 'checked_out'), created_at

-- TODO: créer cart_items
-- colonnes: cart_id (FK carts), product_id (FK products), quantity
-- contrainte clé: PK composite (cart_id, product_id)


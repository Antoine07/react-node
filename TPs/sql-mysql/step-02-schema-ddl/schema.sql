-- Step 02 — DDL: schéma blog

CREATE DATABASE IF NOT EXISTS blog;
USE blog;

-- Optionnel: repartir propre
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- TODO: créer users
-- CREATE TABLE users (...);

-- TODO: créer posts (avec FK vers users)
-- CREATE TABLE posts (...);

-- TODO: créer comments (avec FK vers posts)
-- CREATE TABLE comments (...);


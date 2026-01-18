-- Step 00 — PK & contraintes

-- TODO: créer la base (si besoin) + la sélectionner
-- CREATE DATABASE IF NOT EXISTS blog;
-- USE blog;

-- TODO: repartir propre
-- DROP TABLE IF EXISTS post_tags;
-- DROP TABLE IF EXISTS users;

-- TODO: créer users avec:
-- - id PK AUTO_INCREMENT
-- - email UNIQUE NOT NULL
-- CREATE TABLE users (...);

-- TODO: créer post_tags avec PK composite (post_id, tag)
-- CREATE TABLE post_tags (...);

-- TODO: insérer des users
-- INSERT INTO users (...) VALUES (...);

-- TODO: tester l'unicité email (doit échouer)
-- INSERT INTO users (...) VALUES (...);

-- TODO: insérer des tags
-- INSERT INTO post_tags (...) VALUES (...);

-- TODO: tester PK composite (doit échouer)
-- INSERT INTO post_tags (...) VALUES (...);


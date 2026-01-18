-- Bonus — Cinéma (schéma)

CREATE DATABASE IF NOT EXISTS cinema
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE cinema;

DROP TABLE IF EXISTS movie_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS movies;

-- TODO: movies(id PK, title UNIQUE, release_year, duration_min)
-- TODO: screenings(id PK, movie_id FK, starts_at, capacity)
-- TODO: reservations(id PK, screening_id FK, customer_name, seats, created_at)
-- TODO: tags(id PK, name UNIQUE)
-- TODO: movie_tags(movie_id, tag_id) PK composite + FKs


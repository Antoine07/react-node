USE blog;

-- TODO: ajouter la colonne meta JSON (si elle n'existe pas déjà)
-- ALTER TABLE posts ADD COLUMN meta JSON NULL;

-- TODO: ajouter un JSON sur quelques posts
-- Exemple:
-- UPDATE posts
-- SET meta = JSON_OBJECT('tags', JSON_ARRAY('sql','mysql'), 'readingTime', 3)
-- WHERE id = 1;


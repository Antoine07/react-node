USE blog;

-- Expliquer la même requête (après index)
EXPLAIN
SELECT *
FROM posts
WHERE author_id = 1
ORDER BY datetime DESC;


USE blog;

-- Expliquer la requête (avant index)
EXPLAIN
SELECT *
FROM posts
WHERE author_id = 1
ORDER BY datetime DESC;


USE bank;

-- Objectif: transférer 30 de Alice vers Bob
-- Contraintes: atomicité (tout ou rien)

-- TODO:
-- START TRANSACTION;
-- UPDATE accounts SET balance = balance - 30 WHERE name = 'Alice';
-- UPDATE accounts SET balance = balance + 30 WHERE name = 'Bob';
-- COMMIT;

-- Vérifier:
SELECT * FROM accounts;


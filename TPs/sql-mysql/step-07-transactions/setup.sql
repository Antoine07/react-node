CREATE DATABASE IF NOT EXISTS bank;
USE bank;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  balance INT NOT NULL
) ENGINE=InnoDB;

INSERT INTO accounts (name, balance)
VALUES ('Alice', 100), ('Bob', 50);

SELECT * FROM accounts;


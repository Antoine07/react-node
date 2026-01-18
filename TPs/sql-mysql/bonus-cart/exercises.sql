USE shop;

-- Ex 1: lister le contenu du panier id=1
-- Colonnes: product_id, name, price_cents, quantity, line_total_cents
-- TODO

-- Ex 2: calculer le total du panier id=1 (total_cents)
-- TODO

-- Ex 3: ajouter un produit (product_id=2) au panier id=1:
-- - si la ligne n'existe pas → créer avec quantity=1
-- - si elle existe → quantity = quantity + 1
-- Indice: PK composite + ON DUPLICATE KEY UPDATE
-- TODO

-- Ex 4: top 3 des produits les plus présents dans les paniers (somme des quantities)
-- Colonnes: product_id, name, total_quantity
-- TODO


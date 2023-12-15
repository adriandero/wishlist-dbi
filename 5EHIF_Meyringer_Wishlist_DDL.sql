-- Schema dbi
CREATE SCHEMA IF NOT EXISTS dbi;

-- Table dbi.child
CREATE TABLE IF NOT EXISTS dbi.child (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(45),
    lastname VARCHAR(45),
    age INT
);

-- Table dbi.item
CREATE TABLE IF NOT EXISTS dbi.item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    currentprice DOUBLE PRECISION
);

-- Table dbi.historic_price
CREATE TABLE IF NOT EXISTS dbi.historic_price (
    item_id INT REFERENCES dbi.item(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    "from" DATE NOT NULL,
    price DOUBLE PRECISION,
    "until" DATE,
    PRIMARY KEY (item_id, "from")
);

-- Table dbi.wishlist
CREATE TABLE IF NOT EXISTS dbi.wishlist (
    id SERIAL PRIMARY KEY,
    year INT,
    child_id INT REFERENCES dbi.child(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table dbi.wishlist_has_item
CREATE TABLE IF NOT EXISTS dbi.wishlist_has_item (
    wishlist_id INT REFERENCES dbi.wishlist(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    item_id INT REFERENCES dbi.item(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    PRIMARY KEY (wishlist_id, item_id)
);


--Cruds
-- Delete
DELETE FROM dbi.wishlist_has_item
WHERE wishlist_id IN (
    SELECT id
    FROM dbi.wishlist
    WHERE child_id = (SELECT id FROM dbi.child WHERE firstname = 'Zachariah' AND lastname = 'Downer')
    AND year = 2003
)
AND item_id = 1;


-- Update
UPDATE dbi.wishlist_has_item
SET item_id = (
    SELECT id
    FROM dbi.item
    WHERE name = 'Arrowroot'
)
WHERE wishlist_id = 10
AND wishlist_id IN (
    SELECT year
    FROM dbi.wishlist
    WHERE year = 2010);




-- 4 Finds
--1
SELECT * FROM dbi.child;

--2
SELECT
    w.id AS wishlist_id,
    w.year,
    c.firstname AS child_firstname,
    c.lastname AS child_lastname,
    i.name AS item_name
FROM
    dbi.wishlist w
    JOIN dbi.child c ON w.child_id = c.id
    JOIN dbi.wishlist_has_item whi ON w.id = whi.wishlist_id
    JOIN dbi.item i ON whi.item_id = i.id
WHERE
    c.firstname = 'Opalina' AND c.lastname = 'Yurocjhin';

--3
SELECT
    c.id AS child_id,
    c.firstname,
    c.lastname,
    COUNT(wi.item_id) AS num_items_in_wishlist
FROM
    dbi.child c
    LEFT JOIN dbi.wishlist w ON c.id = w.child_id
    LEFT JOIN dbi.wishlist_has_item wi ON w.id = wi.wishlist_id
GROUP BY
    c.id, c.firstname, c.lastname;

--4
SELECT
    c.id AS child_id,
    c.firstname,
    c.lastname,
    AVG(i.currentprice) AS avg_item_price_in_wishlist
FROM
    dbi.child c
    LEFT JOIN dbi.wishlist w ON c.id = w.child_id
    LEFT JOIN dbi.wishlist_has_item wi ON w.id = wi.wishlist_id
    LEFT JOIN dbi.item i ON wi.item_id = i.id
GROUP BY
    c.id, c.firstname, c.lastname;








-- Inserts via ChatGPT
-- Inserts for dbi.child
INSERT INTO dbi.child (firstname, lastname, age) VALUES
('John', 'Doe', 12),
('Jane', 'Smith', 14),
('Alice', 'Johnson', 10),
('Bob', 'Williams', 16),
('Eva', 'Brown', 13),
('Michael', 'Jones', 11),
('Sophia', 'Miller', 9),
('David', 'Davis', 15),
('Emma', 'Moore', 12),
('Daniel', 'Wilson', 14),
('Olivia', 'Anderson', 10),
('William', 'Taylor', 13),
('Grace', 'Martinez', 11),
('Henry', 'Harris', 9),
('Lily', 'Clark', 15);

-- Inserts for dbi.item
INSERT INTO dbi.item (name, currentprice) VALUES
('Laptop', 1400.00),
('Smartphone', 699.99),
('Headphones', 99.95),
('Tablet', 499.00),
('Camera', 799.99),
('TV', 1499.99),
('Gaming Console', 399.50),
('Printer', 199.95),
('Fitness Tracker', 79.99),
('Bluetooth Speaker', 49.99),
('Mouse', 29.95),
('Keyboard', 79.95),
('External Hard Drive', 129.00),
('Smartwatch', 199.99),
('Router', 79.99);

-- Inserts for dbi.historic_price
INSERT INTO dbi.historic_price (item_id, "from", price, "until") VALUES
(1, '2023-01-01', 1200.50, '2023-02-01'),
(1, '2023-02-01', 1400.00, null);

-- Inserts for dbi.wishlist
INSERT INTO dbi.wishlist (year, child_id) VALUES
(2023, 1),
(2023, 2),
(2023, 3),
(2023, 4),
(2023, 5),
(2023, 6),
(2023, 7),
(2023, 8),
(2023, 9),
(2023, 10),
(2023, 11),
(2023, 12),
(2023, 13),
(2023, 14),
(2023, 15);

-- Inserts for dbi.wishlist_has_item
INSERT INTO dbi.wishlist_has_item (wishlist_id, item_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10),
(6, 11),
(6, 12),
(7, 13),
(7, 14),
(8, 15),
(8, 1),
(9, 2),
(9, 3),
(10, 4),
(10, 5),
(11, 6),
(11, 7),
(12, 8),
(12, 9),
(13, 10),
(13, 11),
(14, 12),
(14, 13),
(15, 14),
(15, 15);
COMMIT;
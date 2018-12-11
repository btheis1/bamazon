DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(200),
	department_name VARCHAR(200),
	price DECIMAL(10, 2),
	stock_quantity INTEGER(10),
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Victoria's Secret Push-Up Bra", "Clothing", 52.99, 80), 
("Raw Power- The Stooges", "Music", 20.87, 15), 
("Charles Bukowski, The Collected Works", "Books", 32.15, 9), 
("Lit- Mary Karr", "Books", 15.95, 7),
("Quip Toothbrush", "Toiletries", 25.00, 54),
("Women's Leggings- Black", "Clothing", 34.89, 200),
("Mega Blender", "Kitchen Supplies", 200.87, 46),
("Theremin", "Instruments", 1000.00, 3),
("Toilet Scrub Brush", "Cleaning Supplies", 13.99, 6000),
("Edible Arrangement", "Food", 47.99, 10);

SELECT * FROM products;
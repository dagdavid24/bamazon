DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id) 
    );
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ('Playstation 4', 'Electronics', 400.00, 10),
	('Emporio Armani Quartz Watch', 'Jewellery & Watches', 199.97, 3),
    ('Alexa Rolled Arm Sofa', 'Home, Furniture & Appliances', 262.00, 5),
    ('Comrad Coffee Table ', 'Home, Furniture & Appliances', 49.00, 8),
    ('Louisville Ladder', 'Home Improvement', 61.00, 20),
    ('Callimont 3-Seat Porch Swing 4', 'Patio and Garden', 88.00, 12),
    ('Sony Ericsson', 'Electronics', 95.00, 5),
    ('Michael Kors Turtleneck tank top', 'Clothing & Accessories', 299.00, 2),
    ('Captain America Action Figure', 'Video Games & Toys', 10.15, 50),
    ('Tomatoes', 'Groceries', 400.00, 20);
    
    select * from products 
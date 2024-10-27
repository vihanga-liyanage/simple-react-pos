DROP DATABASE IF EXISTS react_pos;
CREATE DATABASE react_pos;
USE react_pos;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    total_price DECIMAL(10, 2),
    payment_method ENUM('card', 'cash'),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ALTER TABLE order_products
-- ADD CONSTRAINT order_products_ibfk_1
-- FOREIGN KEY (order_id)
-- REFERENCES orders(id)
-- ON DELETE CASCADE;

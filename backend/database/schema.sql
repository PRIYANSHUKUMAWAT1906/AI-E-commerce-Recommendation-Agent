-- Products Table

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

-- Categories Table

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Add Category Relationship

ALTER TABLE products
ADD COLUMN category_id INT REFERENCES categories(id);

-- Users Table

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Orders Table

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_amount INT NOT NULL
);

-- Reviews Table

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    rating INT,
    comment TEXT
);
ALTER TABLE users
ADD COLUMN password VARCHAR(255);
ALTER TABLE users
ADD COLUMN role VARCHAR(20) DEFAULT 'user';
UPDATE users
SET role='admin'
WHERE id=1;
ALTER TABLE products
ADD COLUMN description TEXT;
ALTER TABLE orders
ADD COLUMN product_id INT REFERENCES products(id);
ALTER TABLE orders
ADD COLUMN quantity INT DEFAULT 1;

ALTER TABLE orders
ADD COLUMN order_date TIMESTAMP DEFAULT NOW();
UPDATE orders
SET product_id = 1
WHERE id = 1;
ALTER TABLE products
ADD COLUMN brand VARCHAR(100);

ALTER TABLE products
ADD COLUMN rating NUMERIC(2,1);

ALTER TABLE products
ADD COLUMN description TEXT;
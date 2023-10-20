-- SQL Script to Drop and Create the 'products' Table

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    description TEXT,
    size VARCHAR(50),
    color VARCHAR(50),
    price DECIMAL(10,2),
    owner_id INT REFERENCES users(id),
    is_sold BOOLEAN DEFAULT FALSE,
    photo_url TEXT
);

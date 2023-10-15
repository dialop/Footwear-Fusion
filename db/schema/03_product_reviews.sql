-- DROP and CREATE products_reviews TABLE

DROP TABLE IF EXISTS products_reviews CASCADE;
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    content TEXT NOT NULL
);


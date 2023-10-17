-- DROP and CREATE products_reviews TABLE

DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    content TEXT NOT NULL
);


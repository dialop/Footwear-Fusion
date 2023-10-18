-- DROP and CREATE products_reviews TABLE

DROP TABLE IF EXISTS product_reviews CASCADE;
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    content TEXT NOT NULL
);


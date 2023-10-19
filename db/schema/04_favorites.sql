-- DROP and CREATE favorites TABLE

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    products INT REFERENCES products(id) ON DELETE CASCADE
);



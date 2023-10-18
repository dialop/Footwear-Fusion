-- DROP and CREATE favorites TABLE

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
<<<<<<< HEAD
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE
=======
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    products INT REFERENCES products(id)
>>>>>>> feature/add-favorites
);



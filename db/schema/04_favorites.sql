-- SQL Script to Drop and Create the 'favorites' Table

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    products INT REFERENCES products(id)
);



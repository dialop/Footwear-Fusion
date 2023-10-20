-- SQL Script to Create the 'user_favorites' Table

CREATE TABLE user_favorites (
  user_id INT,
  product_id INT,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

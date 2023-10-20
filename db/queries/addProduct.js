// ---- HANDLES DATABASE QUERY RELATED TO ADD PRODUCT ----//

const db = require('../connection');

// Function to add a product to the database
const addProduct = async(product, userId) => {
  return db.query(
    'INSERT INTO products (title, model, description, size, color, price, owner_id, photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
    [product.title, product.model, product.description, product.size, product.color, product.price, userId, product.photo_url]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Failed to add product with ID ${product.id} by user with ID ${userId}: ${err.message}`);
    });
};


module.exports = { addProduct };

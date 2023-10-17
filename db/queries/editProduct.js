// ---- HANDLES DATABASE QUERIES RELATED TO EDIT PRODUCT ----//

const db = require('../connection');

const editProduct = async(product, productID) => {
  return db.query(
    'UPDATE products SET title = $1, model = $2, description = $3, size = $4, color = $5, price = $6, photo_url = $7  WHERE id = $8 RETURNING *;',
      [product.title, product.model, product.description, product.size, product.color, product.price, product.photo_url, productID]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Failed to edit product with ID ${product.id} }: ${err.message}`);
    })
  };


  module.exports = { editProduct };

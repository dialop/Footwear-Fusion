// ---- HANDLES DATABASE QUERIES RELATED TO DELETE PRODUCT ----//

const db = require('../connection');

const deleteProduct = (productId) => {
  return db.query(
    'DELETE FROM products WHERE id = $1 RETURNING *;',
    [productId]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Failed to delete product with ID ${productId} }: ${err.message}`);
    });
};


module.exports = { deleteProduct };

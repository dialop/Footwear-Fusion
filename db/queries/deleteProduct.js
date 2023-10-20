// ---- HANDLES DATABASE QUERY RELATED TO DELETE PRODUCT ----//

const db = require('../connection');

// Function to delete a product based on its ID
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

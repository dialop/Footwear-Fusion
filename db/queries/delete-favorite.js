// ---- HANDLES DATABASE QUERY RELATED TO DELETE FAVORITE PRODUCT ----//

const db = require('../connection');

// Function to delete a favorite product based on its product ID
const deleteFavorite = (productId) => {
  return db.query(
    'DELETE FROM favorites WHERE product_id = $1 RETURNING *;',
    [productId]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Failed to delete favorite with product ID ${productId}: ${err.message}`);
    });
};
  
  
module.exports = { deleteFavorite };
  
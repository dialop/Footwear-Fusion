// ---- HANDLES DATABASE QUERIES TO ADD FAVORITE PRODUCT ----//

const db = require('../connection');

const addToFavorites = async (productId, userId) => {
  try {
    const queryResult = await db.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *;',
      [userId, productId]
    );
    console.log(productId, 'Product ID Verification');

    if (queryResult.rows.length > 0) {
      return queryResult.rows[0];
    } else {
      throw new Error('Failed to add product to favorites');
    }
  } catch (error) {
    console.error(`Failed to add product ${productId} to favorites for user ${userId}:`, error);
    throw error; // Rethrow the error to handle it in the route handler
  }
};

module.exports = { addToFavorites };

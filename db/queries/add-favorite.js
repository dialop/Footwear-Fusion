// ---- HANDLES DATABASE QUERY TO ADD FAVORITE PRODUCT ----//

const db = require('../connection');

// Function to add a product to the user's favorites
const addToFavorites = async(productId, userId) => {
  try {
    const queryResult = await db.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *;',
      [userId, productId]
    );
    console.log(productId, 'Product ID Verification');

    // Check if the query result contains rows
    if (queryResult.rows.length > 0) {
      return queryResult.rows[0];
    } else {
      throw new Error('Failed to add product to favorites');
    }
  } catch (error) {
    console.error(`Failed to add product ${productId} to favorites for user ${userId}:`, error);
    throw error; 
  }
};

module.exports = { addToFavorites };

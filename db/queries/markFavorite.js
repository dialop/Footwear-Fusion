// ----  HANDLES QUERY TO MARK FAVORITE PRODUCTS ---- //

const db = require('../connection');

/**
 * @param {number|string} userId - ID of user marking the favorite
 * @param {number|string} productId - ID of the product being marked as favorite
 * @returns {Promise<Object>} Data related to favorite action
 * @throws {Error} If error marking product as favorite
 */

const markFavorite = async(userId, productId) => {
  try {
    const result = await db.query('INSERT INTO favorites(user_id, product_id) VALUES($1, $2) RETURNING *;', [userId, productId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to mark product with ID ${productId} as favorite for user with ID ${userId}: ${error.message}`);
  }
};

module.exports = { markFavorite };

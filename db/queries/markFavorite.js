// ----  HANDLES QUERY TO MARK FAVORITE PRODUCTS ---- //

const db = require('../connection');

const markFavorite = async(userId, productId) => {
  try {
    const result = await db.query('INSERT INTO favorites(user_id, product_id) VALUES($1, $2) RETURNING *;', [userId, productId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to mark product with ID ${productId} as favorite for user with ID ${userId}: ${error.message}`);
  }
};

/**
 * @param {number|string} userId - ID of user whose favorites are being fetched
 * @returns {Promise<Array>} List of favorite products for the user
 * @throws {Error} If error occurs during query
 */
const getFavoritesForUser = async(userId) => {
  try {
    const result = await db.query('SELECT product_id FROM favorites WHERE user_id = $1;', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving favorites for user with ID ${userId}: ${error.message}`);
  }
};




module.exports = { markFavorite, getFavoritesForUser };

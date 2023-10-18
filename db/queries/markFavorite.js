// ----  HANDLES QUERY TO MARK FAVORITE PRODUCTS ---- //

const { query } = require('express');
const db = require('../connection');

const markFavorites = async(userId, productId) => {
  try {
    const result = await db.query('INSERT INTO favorites(user_id, product_id) VALUES($1, $2) RETURNING *;', [userId, productId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to mark product with ID ${productId} as favorite for user with ID ${userId}: ${error.message}`);
  }
};


//-- ACCESS USER PRODUCTS THAT HAVE BEEN MARKED AS FAVORITE --//
const getFavoritesForUser = async() => {
  const hardcodedUserId = 2;  // Hardcoded user id
  try {
    const result = await db.query('SELECT product_id FROM favorites WHERE user_id = $1;', [hardcodedUserId]);
    console.log(result.rows, "query", hardcodedUserId);
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving favorites for user with ID ${hardcodedUserId}: ${error.message}`);
  }
};



module.exports = { markFavorites, getFavoritesForUser };

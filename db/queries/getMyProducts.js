// ---- HANDLES DATABASE QUERIES TO FETCH PRODUCTS OWNED BY A SPECIFIC USER ---- //

const db = require('../connection');

const getMyProducts = async(userId) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE owner_id = $1;', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to get products for user with ID ${userId}: ${error.message}`);
  }
};

module.exports = { getMyProducts };

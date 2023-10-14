// ----  HANDLES QUERY TO REMOVE A PRODUCT  ----//

const db = require('../connection');

/**
 * @param {number|string} productId - Product id to be removed
 * @returns {Promise<Object>} Removed product data
 * @throws {Error} If product not found || error occurs during removal
 */

const removeProduct = async(productId) => {
  try {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *;', [productId]);
    if (result.rows.length === 0) {
      throw new Error(`Product with id ${productId} not found and could not be removed.`);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to remove product with id ${productId}: ${error.message}`);
  }
};

module.exports = { removeProduct };

const db = require('../connection');

/**
 * @returns {Promise<Array>} List of products owned by user
 * @throws {Error} If error fetching products
 */


module.exports = { getUserByEmail };
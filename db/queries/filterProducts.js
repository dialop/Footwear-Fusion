// ---- HANDLES QUERY TO FILTER PRODUCTS ---- //

const db = require('../connection');

/**
 * @param {Object} criteria - Object containing filtering criteria
 * @returns {Promise<Array>} List of filtered products
 * @throws {Error} If error filtering the products
 */

const filterProducts = async(criteria) => {
  let query = 'SELECT * FROM products WHERE ';
  let values = [];
  let conditions = [];

  for (let key in criteria) {
    if (Object.hasOwnProperty.call(criteria, key)) {
      conditions.push(`${key} = $${values.length + 1}`);
      values.push(criteria[key]);
    }
  }

  query += conditions.join(' AND ');

  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to filter products based on criteria ${JSON.stringify(criteria)}: ${error.message}`);
  }
};

module.exports = { filterProducts };

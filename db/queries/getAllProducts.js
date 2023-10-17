// ---- HANDLES DATABASE QUERIES TO FETCH ALL PRODUCTS ---- //

const db = require('../connection');

/**
 * @returns {Promise<Array>} List of products owned by user
 * @throws {Error} If error fetching products
 */

const getAllProducts = () => {
  return db.query('SELECT * FROM products')
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllProducts };

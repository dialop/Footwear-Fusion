// ---- HANDLES DATABASE QUERIES TO FETCH PRODUCT DETAILES ---- //

const db = require('../connection');

/**
 * @returns {Promise<Array>} List of products owned by user
 * @throws {Error} If error fetching products
 */

const getProductDetail = (productId) => {
  return db.query('SELECT * FROM products WHERE id = $1;', [productId])
  .then((res) => {
    return res.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
  };  



module.exports = { getProductDetail };

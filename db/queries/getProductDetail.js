// ---- HANDLES DATABASE QUERIES TO FETCH PRODUCT DETAILES ---- //

const db = require('../connection');

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

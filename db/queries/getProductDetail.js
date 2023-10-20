// ---- HANDLES DATABASE QUERY TO FETCH PRODUCT DETAILES ---- //

const db = require('../connection');

// Function to fetch product details by product ID
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

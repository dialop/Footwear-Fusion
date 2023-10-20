// ---- HANDLES DATABASE QUERIES TO FETCH ALL PRODUCTS ---- //

const db = require('../connection');

// Function to fetch all products from the database
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

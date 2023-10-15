// ----  ROUTE TO FETCH ALL PRODUCTS ---- //

const express = require('express');
const router  = express.Router();
const { getAllProducts } = require('../db/queries/getAllProducts'); // Import the function

router.get('/', (req, res) => {
  getAllProducts()
  .then(products => {
    console.log('Products:', products);
    res.render('products', { products });
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
  
});



module.exports = router;
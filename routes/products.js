
const express = require('express');
const router  = express.Router();
const { getAllProducts } = require('../db/queries/getAllProducts'); // Import the function
const { getProductDetail } = require('../db/queries/getProductDetail'); // Import the function

// ----  ROUTE TO FETCH ALL PRODUCTS ---- //
//Ichmoukhametov

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

// ----  ROUTE TO FETCH PRODUCT DETAIL ---- //
//Ichmoukhametov

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  getProductDetail(productId)
    .then(product => {
      const templateVars = {
        productDetail: product 
      };
      res.render('productDetail', templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});



module.exports = router;
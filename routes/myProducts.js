const express = require('express');
const router  = express.Router();
const { getMyProducts  } = require('../db/queries/getMyProducts'); // Import the function


// ----  ROUTE TO FETCH USERS PRODUCTS ---- //
//Ichmoukhametov

router.get('/', (req, res) => {
  getMyProducts()
    .then(products => {
      console.log('Products:', products);
      res.render('myProducts', { products }); // Move this line inside the promise callback
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
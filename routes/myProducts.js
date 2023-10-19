const express = require('express');
const router  = express.Router();
const { getMyProducts  } = require('../db/queries/getMyProducts'); // Import the function
const { addProduct  } = require('../db/queries/addProduct'); // Import the function


// ----  ROUTE TO FETCH USERS PRODUCTS ---- //
//Ichmoukhametov


router.get('/', (req, res) => {
  const user = req.session.user;

  getMyProducts(user.id)
    .then(products => {
      // console.log('Products:', products);
      res.render('myProducts', { products, user }); // Move this line inside the promise callback
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// ----  ROUTE TO ADD NEW PRODUCT ---- //
router.post('/new', (req, res) => {
  //This is just for testing, before we have login
  const user = req.session.user;
  
  addProduct(req.body, user.id)
  .then(product => {
    console.log(req.query);
    console.log('Add product:', product);
    res.json({ product })
  })
  .catch((e) => {
    console.error(e);
    res.send(e);
  });
  res.redirect('/myProducts');
});


// ----  ROUTE TO DISPLAY ADD PRODUCT PAGE---- //
router.get('/new', (req, res) => {
  const user = req.session.user;
  res.render('add-product', { user });
});

module.exports = router;
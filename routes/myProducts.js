// ---- USER PRODUCTS ROUTES ---- //

const express = require('express');
const router  = express.Router();
const { getMyProducts  } = require('../db/queries/getMyProducts'); 
const { addProduct  } = require('../db/queries/addProduct'); 

// GET route to fetch user products 
router.get('/', (req, res) => {
  const user = req.session.user;

  getMyProducts(user.id)
    .then(products => {
      // console.log('Products:', products);
      res.render('myProducts', { products, user }); 
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// GET route to display the 'Add Product' page
router.get('/new', (req, res) => {
  res.render('add-product');
});


// POST route to add a new product
router.post('/new', (req, res) => {
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


// GET route to display the 'Add Product' page
router.get('/new', (req, res) => {
  const user = req.session.user;
  res.render('add-product', { user });
});

module.exports = router;
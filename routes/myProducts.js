// ---- USER PRODUCTS ROUTES ---- //

const express = require('express');
const router  = express.Router();
const { getMyProducts  } = require('../db/queries/getMyProducts'); 
const { addProduct  } = require('../db/queries/addProduct'); 

// GET route to fetch user products 
router.get('/', (req, res) => {
  getMyProducts()
    .then(products => {
      res.render('myProducts', { products }); 
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// GET route to fetch user products 
router.get('/new', (req, res) => {
  res.render('add-product');
});


// POST route to fetch user products 
router.post('/new', (req, res) => {
  req.session.user_id = {id : 1};
  
  addProduct(req.body, req.session.user_id.id)
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



module.exports = router;
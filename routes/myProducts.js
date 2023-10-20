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
<<<<<<< HEAD
      res.render('myProducts', { products }); 
=======
      // console.log('Products:', products);
      res.render('myProducts', { products, user }); // Move this line inside the promise callback
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
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
<<<<<<< HEAD
  req.session.user_id = {id : 1};
=======
  //This is just for testing, before we have login
  const user = req.session.user;
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
  
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


<<<<<<< HEAD
=======
// ----  ROUTE TO DISPLAY ADD PRODUCT PAGE---- //
router.get('/new', (req, res) => {
  const user = req.session.user;
  res.render('add-product', { user });
});
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c

module.exports = router;
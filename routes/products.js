
// ---- ALL USER PRODUCTS ROUTES ---- //

const express = require('express');
const router = express.Router();

const { getFilteredProducts } = require('../db/queries/filterProducts');
const { getProductDetail } = require('../db/queries/getProductDetail');
const { editProduct } = require('../db/queries/editProduct');
const { deleteProduct } = require('../db/queries/deleteProduct');
const { markAsSold } = require('../db/queries/sold');


//GET route to fetch all products 
router.get('/', (req, res) => {
<<<<<<< HEAD
    getFilteredProducts(req.query)
        .then(products => {
            res.render('products', { products });
=======
    const user = req.session.user;

    // Get products based on the parsed query string from the URL
    getFilteredProducts(req.query)
        .then(products => {
            // Render the results using Express and EJS template
            res.render('products', { products, user });
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
        })
        .catch(err => {
            console.error('Error fetching filtered products:', err);
            res.status(500).send('Internal Server Error');
        });
});

//GET route to fetch product details
router.get('/:id', (req, res) => {
<<<<<<< HEAD
=======
    const user = req.session.user;
    // Extract product ID from the request parameters
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
    const productId = req.params.id;
    console.log('from product Details:', user, productId);

    getProductDetail(productId)
        .then(product => {
<<<<<<< HEAD
            res.render('productDetail', { productDetail: product });
=======
            // Render the product detail using Express and EJS template
            res.render('productDetail', { productDetail: product, user });
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
});


//GET route to fetch all products 
router.get('/:id/edit', (req, res) => {
    const productId = req.params.id;
    getProductDetail(productId)
        .then(product => {
            console.log(product);
            // Render the product detail using Express and EJS template
            res.render('edit-product', { product });
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
});

<<<<<<< HEAD
//POST route to edit product details
router.post('/:id/edit', (req, res) => {
=======


// ----  ROUTE TO DISPLAY EDIT PRODUCT DETAILS PAGE---- //
router.get('/:id/edit', (req, res) => {
    const user = req.session.user;
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
    const productId = req.params.id;
    const { title, model, description, size, color, price, photo_url } = req.body;

    editProduct({ title, model, description, size, color, price, photo_url }, productId)
        .then(product => {
<<<<<<< HEAD
            res.json({ product });
=======
            console.log(product);
            // Render the product detail using Express and EJS template
            res.render('edit-product', { product, user });
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
    res.redirect('/myProducts');
});



//GET route to fetch all products 
router.post('/:id/delete', (req, res) => {
    const productId = req.params.id;

    deleteProduct(productId)
        .then((data) => {
            console.log(data);
            res.redirect('/myProducts');
        })
        .catch(err => console.log(err));
});


<<<<<<< HEAD
=======
// ----  ROUTE TO MARK PRODUCT AS SOLD ---- //
router.post('/:id/sold', (req, res) => {
    const productId = req.params.id;

    markAsSold(productId)
        .then((data) => {
            console.log(data);
            res.redirect('/myProducts');
        })
        .catch(err => console.log(err));
});


// Export the router for use in the main application
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
module.exports = router;

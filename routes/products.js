
// ---- ALL USER PRODUCTS ROUTES ---- //

const express = require('express');
const router = express.Router();

const { getFilteredProducts } = require('../db/queries/filterProducts');
const { getProductDetail } = require('../db/queries/getProductDetail');
const { editProduct } = require('../db/queries/editProduct');
const { deleteProduct } = require('../db/queries/deleteProduct');
const { markAsSold } = require('../db/queries/sold');


// GET route to fetch all products 
router.get('/', (req, res) => {
    const user = req.session.user;

    getFilteredProducts(req.query)
        .then(products => {
            res.render('products', { products, user });
        })
        .catch(err => {
            console.error('Error fetching filtered products:', err);
            res.status(500).send('Internal Server Error');
        });
});

// GET route to fetch product details
router.get('/:id', (req, res) => {
    const user = req.session.user;
    const productId = req.params.id;
    console.log('from product Details:', user, productId);

    getProductDetail(productId)
        .then(product => {
            res.render('productDetail', { productDetail: product, user });
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
});




// ----  ROUTE TO DISPLAY EDIT PRODUCT DETAILS PAGE---- //
router.get('/:id/edit', (req, res) => {
    const user = req.session.user;
    const productId = req.params.id;
    getProductDetail(productId)
        .then(product => {
            console.log(product);
            // Render the product detail using Express and EJS template
            res.render('edit-product', { product, user });
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
});


// ----  ROUTE TO EDIT PRODUCT DETAILS ---- //
router.post('/:id/edit', (req, res) => {
    const productId = req.params.id;
    const { title, model, description, size, color, price, photo_url } = req.body;

    editProduct({ title, model, description, size, color, price, photo_url }, productId)
        .then(product => {
            // Render the product detail using Express and EJS template
            res.json({ product });
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
    res.redirect('/myProducts');
});



// POST route to delete a product
router.post('/:id/delete', (req, res) => {
    const productId = req.params.id;

    deleteProduct(productId)
        .then((data) => {
            console.log(data);
            res.redirect('/myProducts');
        })
        .catch(err => console.log(err));
});


// POST route to mark a product as sold
router.post('/:id/sold', (req, res) => {
    const productId = req.params.id;

    markAsSold(productId)
        .then((data) => {
            console.log(data);
            res.redirect('/myProducts');
        })
        .catch(err => console.log(err));
});


module.exports = router;

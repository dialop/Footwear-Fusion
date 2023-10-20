
// ---- ALL USER PRODUCTS ROUTES ---- //

const express = require('express');
const router = express.Router();

const { getFilteredProducts } = require('../db/queries/filterProducts');
const { getProductDetail } = require('../db/queries/getProductDetail');
const { editProduct } = require('../db/queries/editProduct');
const { deleteProduct } = require('../db/queries/deleteProduct');


//GET route to fetch all products 
router.get('/', (req, res) => {
    getFilteredProducts(req.query)
        .then(products => {
            res.render('products', { products });
        })
        .catch(err => {
            console.error('Error fetching filtered products:', err);
            res.status(500).send('Internal Server Error');
        });
});

//GET route to fetch product details
router.get('/:id', (req, res) => {
    const productId = req.params.id;

    getProductDetail(productId)
        .then(product => {
            res.render('productDetail', { productDetail: product });
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

//POST route to edit product details
router.post('/:id/edit', (req, res) => {
    const productId = req.params.id;
    const { title, model, description, size, color, price, photo_url } = req.body;

    editProduct({ title, model, description, size, color, price, photo_url }, productId)
        .then(product => {
            res.json({ product });
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


module.exports = router;


// Express Router setup
const express = require('express');
const router = express.Router();

// Database queries
const { getFilteredProducts } = require('../db/queries/filterProducts');
const { getProductDetail } = require('../db/queries/getProductDetail');
const { editProduct } = require('../db/queries/editProduct');
const { deleteProduct } = require('../db/queries/deleteProduct');




// ----  GET ROUTE TO FETCH ALL PRODUCTS ---- //
router.get('/', (req, res) => {
    // Get products based on the parsed query string from the URL
    getFilteredProducts(req.query)
        .then(products => {
            // Render the results using Express and EJS template
            res.render('products', { products });
        })
        .catch(err => {
            console.error('Error fetching filtered products:', err);
            res.status(500).send('Internal Server Error');
        });
});

// ----  ROUTE TO FETCH PRODUCT DETAILS ---- //

router.get('/:id', (req, res) => {
    // Extract product ID from the request parameters
    const productId = req.params.id;

    getProductDetail(productId)
        .then(product => {
            // Render the product detail using Express and EJS template
            res.render('productDetail', { productDetail: product });
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



// ----  ROUTE TO DISPLAY EDIT PRODUCT DETAILS PAGE---- //
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

// ----  ROUTE TO DELETE NEW PRODUCT ---- //
router.post('/:id/delete', (req, res) => {
    const productId = req.params.id;

    deleteProduct(productId)
        .then((data) => {
            console.log(data);
            res.redirect('/myProducts');
        })
        .catch(err => console.log(err));
});






// Export the router for use in the main application
module.exports = router;

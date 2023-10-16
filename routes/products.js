
// Express Router setup
const express = require('express');
const router = express.Router();

// Database queries
const { getFilteredProducts } = require('../db/queries/filterProducts');
const { getProductDetail } = require('../db/queries/getProductDetail');




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

// Export the router for use in the main application
module.exports = router;

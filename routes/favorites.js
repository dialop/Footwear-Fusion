// ----  ROUTE TO MARK PRODUCT AS FAVORITE ---- //

const express = require('express');
const router = express.Router();
const { markFavorite } = require('../db/markFavorites'); // Import the function

router.post('/mark', (req, res) => {
    const userId = req.body.userId; 
    const productId = req.body.productId; 

    if (!userId || !productId) {
        return res.status(400).json({ error: 'userId and productId need to be added' });
    }

    markFavorite(userId, productId)
        .then(favoriteResult => {
            if (favoriteResult) {
                res.status(201).json(favoriteResult);
            } else {
                throw new Error('Failed to mark product as favorite');
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;

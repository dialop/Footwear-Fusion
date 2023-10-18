// ----  API ROUTE TO MARK PRODUCT AS FAVORITE ---- //

const express = require('express');
const router = express.Router();
const { markFavorite, getFavoritesForUser } = require('../db/queries/markFavorite');  

router.post('/mark', (req, res) => {
    const userId = req.body.userId; 
    const productId = req.body.productId; 

    if (!userId || !productId) {
        return res
        .status(400)
        .json({ error: 'userId and productId need to be added' });
    }

    markFavorite(userId, productId)
        .then(favoriteResult => {
            if (favoriteResult) {
                res
                .status(201)
                .json(favoriteResult);
            } else {
                throw new Error('Failed to mark product as favorite');
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({ error: err.message });
        });
});

// ----  GET ROUTE TO FETCH FAVORITE PRODUCTS FOR A USER ---- //
router.get('/favorites/:userId', (req, res) => {
    const userId = req.params.userId;

    getFavoritesForUser(userId)
        .then(favorites => {
            res.json({ favorites });
        })
        .catch(err => {
            res
            .status(500)
            .json({ error: err.message });
        });
});



router.post('/favorites/add', (req, res) => {
    const productId = req.body.productId; // Assuming the product ID is sent in the request body
    const userId = req.session.user_id.id; // Get the user ID from the session
  
    // Call the addToFavorites function to add the product to favorites
    addToFavorites(productId, userId)
      .then(() => {
        res.status(200).json({ message: 'Product added to favorites successfully' });
      })
      .catch((error) => {
        console.error('Error adding product to favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  

module.exports = router;
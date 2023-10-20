// ---- FAVORITES ROUTES ---- //

const express = require('express');
const router = express.Router();
const { markFavorite, getFavoritesForUser, addToFavorites } = require('../db/queries/markFavorite');

// GET route to fetch favorite products for a user
router.get('/favorites/:userId', (req, res) => {
  const userId = req.params.userId;

  // Fetch user's favorite products and send a JSON response
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

// POST route to mark a product as favorite
router.post('/mark', (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: 'userId and productId need to be added' });
  }

  // Call the markFavorite function to mark a product as a favorite
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

// POST route to add a product to favorites
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

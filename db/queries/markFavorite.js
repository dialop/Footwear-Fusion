// ----  HANDLES DATABASE QUERIES TO MARK FAVORITE PRODUCTS ---- //

const db = require('../connection');

// Function to mark a product as a favorite for a user
const markAsFavorite = (productId) => {
  return db.query(`
    INSERT INTO user_favorites (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, product_id) DO NOTHING; 
  `, [productId]);
};

// Function to retrieve products marked as favorites for a user
const getFavoritesForUser = async(userId) => {

  try {
    const result = await db.query(`
      SELECT 
      p.id,
      p.title,
      p.model,
      p.description,
      p.size,
      p.color,
      p.price,
      p.owner_id,
      p.photo_url
  FROM
      favorites f
  LEFT JOIN 
      products p ON f.product_id = p.id 
  WHERE 
      f.user_id = $1;
`, [userId]);
      console.log('from db', userId);
      return result.rows;
  } catch (error) {
      throw new Error(`Error retrieving favorites for user with ID ${userId}: ${error.message}`);
  }
};

// Function to delete a product from favorites
function deleteFavorite(productId) {

  return new Promise((resolve, reject) => {
      // Example with a hypothetical DB library:
      db.query("DELETE FROM favorites WHERE product_id = $1", [productId], function(err, results) {
          if (err) return reject(err);
          resolve(results);
      });
  });
}



module.exports = { markAsFavorite, getFavoritesForUser, deleteFavorite };

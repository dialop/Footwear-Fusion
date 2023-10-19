// ----  HANDLES QUERY TO MARK FAVORITE PRODUCTS ---- //

const { query } = require('express');
const db = require('../connection');

const markAsFavorite = (productId) => {
  return db.query(`
    INSERT INTO user_favorites (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, product_id) DO NOTHING; 
  `, [productId]);
};


//-- ACCESS USER PRODUCTS THAT HAVE BEEN MARKED AS FAVORITE --//


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


function deleteFavorite(productId) {
  // Logic to remove the product with productId from the favorites table
  return new Promise((resolve, reject) => {
      // Example with a hypothetical DB library:
      db.query("DELETE FROM favorites WHERE product_id = $1", [productId], function(err, results) {
          if (err) return reject(err);
          resolve(results);
      });
  });
}



module.exports = { markAsFavorite, getFavoritesForUser, deleteFavorite };

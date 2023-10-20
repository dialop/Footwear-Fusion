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

<<<<<<< HEAD
// Function to retrieve products marked as favorites for a user
const getFavoritesForUser = async() => {
  const hardcodedUserId = 2;  // Hardcoded user id
=======

//-- ACCESS USER PRODUCTS THAT HAVE BEEN MARKED AS FAVORITE --//


const getFavoritesForUser = async(userId) => {
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c

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
<<<<<<< HEAD
`, [hardcodedUserId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving favorites for user with ID ${hardcodedUserId}: ${error.message}`);
=======
`, [userId]);
      console.log('from db', userId);
      return result.rows;
  } catch (error) {
      throw new Error(`Error retrieving favorites for user with ID ${userId}: ${error.message}`);
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
  }
};

// Function to delete a product from favorites
function deleteFavorite(productId) {

  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    db.query("DELETE FROM favorites WHERE product_id = ?", [productId], function(err, results) {
      
      if (err) return reject(err);
      resolve(results);
    });
=======
      // Example with a hypothetical DB library:
      db.query("DELETE FROM favorites WHERE product_id = $1", [productId], function(err, results) {
          if (err) return reject(err);
          resolve(results);
      });
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
  });
}



module.exports = { markAsFavorite, getFavoritesForUser, deleteFavorite };

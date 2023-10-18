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


const getFavoritesForUser = async() => {
  const hardcodedUserId = 2;  // Hardcoded user id

  try {
      const result = await db.query(`
      SELECT 
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
`, [hardcodedUserId]);
      console.log(result.rows, "query", hardcodedUserId);
      return result.rows;
  } catch (error) {
      throw new Error(`Error retrieving favorites for user with ID ${hardcodedUserId}: ${error.message}`);
  }
};



module.exports = { markAsFavorite, getFavoritesForUser };

// ---- HANDLES DATABASE QUERIES RELATED TO PRODUCT REVIEWS ----//

const db = require('../connection');

const addReview = async(reviewDetails) => {
  const { user_id, product_id, content } = reviewDetails;
  try {
    const result = await db.query(
      'INSERT INTO reviews (user_id, product_id, content) VALUES ($1, $2, $3) RETURNING *;',
      [user_id, product_id, content]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to add review for product with ID ${product_id} by user with ID ${user_id}: ${error.message}`);
  }
};

module.exports = { addReview };
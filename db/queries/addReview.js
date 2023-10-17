// ---- HANDLES DATABASE QUERIES RELATED TO PRODUCT REVIEWS ----//

const db = require('../connection');

/**
 * @param {Object} reviewDetails - Details of review added
 * @param {number|string} reviewDetails.user_id - ID of user adding review
 * @param {number|string} reviewDetails.product_id - ID of product being reviewed
 * @param {string} reviewDetails.content - Content of the review
 * @returns {Promise<Object>}  Added review data
 * @throws {Error} If error adding the review
 */

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
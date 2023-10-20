// ----  HANDLES DATABASE QUERY TO MARK PRODUCT AS SOLD  ----//

const db = require('../connection');

// Marks a product as sold 
const markAsSold = async(productId) => {
  try {
    const result = await db.query('UPDATE products SET is_sold = true WHERE id = $1 RETURNING *;', [productId]);
    if (!result.rows[0]) {
      throw new Error(`No product found with ID ${productId}.`);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to mark product with ID ${productId} as sold: ${error.message}`);
  }
};

module.exports = { markAsSold };

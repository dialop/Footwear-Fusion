// Database connection setup
const db = require('../connection');

// ---- HANDLES QUERY TO FILTER PRODUCTS ---- //

const getFilteredProducts = (products, limit = 10) => {
  const queryParams = [];

  // Base query string to fetch products
  let queryString = `
  SELECT products.*
  -- , AVG(product_reviews.rating) as average_rating
  FROM products
  LEFT JOIN product_reviews ON products.id = product_id
  WHERE 1 = 1
  `;
  
  // Add filter for product title
  if (products.title) {
    queryParams.push(`%${products.title}%`);
    queryString += ` AND title ILIKE $${queryParams.length}`;
  }

  // Add filter for product size
  if (products.size) {
    queryParams.push(products.size);
    queryString += ` AND size = $${queryParams.length}`;
  }

  // Handle price filtering
  if (products.minimumPrice || products.maximumPrice) {
    if (products.minimumPrice) {
      const minPrice = parseFloat(products.minimumPrice);
      queryParams.push(minPrice);
      queryString += ` AND price >= $${queryParams.length}`;
    }

    if (products.maximumPrice) {
      const maxPrice = parseFloat(products.maximumPrice);
      queryParams.push(maxPrice);
      queryString += ` AND price <= $${queryParams.length}`;
    }
  }

  // Group the results by product ID
  queryString += `
    GROUP BY products.id
  `;

  // Uncomment to filter by minimum rating
  // if (products.minimum_rating) {
  //   queryParams.push(products.minimum_rating);
  //   queryString += ` HAVING AVG(product_reviews.rating) >= $${queryParams.length}`;
  // }

  // Add order and limit to the query
  queryParams.push(limit);
  queryString += `
    ORDER BY price
    LIMIT $${queryParams.length};
  `;

  // Execute the query and return the results
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error("Error fetching filtered products:", err.message);
      throw err;
    });
};


module.exports = { getFilteredProducts };

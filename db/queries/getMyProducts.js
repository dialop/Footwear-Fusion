// ---- HANDLES DATABASE QUERIES TO FETCH PRODUCTS OWNED BY A SPECIFIC USER ---- //

const db = require('../connection');

// Ichmoukhametov: Hard codded user ID
const getMyProducts = async() => {
  try {
    const result = await db.query('SELECT * FROM products WHERE owner_id = 1;');
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to get products for user with ID `);
  }
};

// Ichmoukhametov: Use this when login works

// const getMyProducts = async(userId) => {
//   try {
//     const result = await db.query('SELECT * FROM products WHERE owner_id = $1;', [userId]);
//     return result.rows;
//   } catch (error) {
//     throw new Error(`Failed to get products for user with ID ${userId}: ${error.message}`);
//   }
// };

module.exports = { getMyProducts };

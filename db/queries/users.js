// ---- HANDLES DATABASE QUERIES TO FETCH USERS ----//

const db = require('../connection');

/**
 * @returns {Promise<Array>} List of users
 * @throws {Error} If error during occurs during query
 */


const getUsers = async() => {
  try {
    const result = await db.query('SELECT * FROM users;');
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

module.exports = { getUsers };
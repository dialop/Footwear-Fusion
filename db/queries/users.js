// ---- HANDLES DATABASE QUERIES TO FETCH USERS ----//

const db = require('../connection');


// Retrieves all users from the database
const getUsers = async() => {
  try {
    const result = await db.query('SELECT * FROM users;');
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

// Retrieves a user by their email from the database
const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((error) => {
      throw new Error(`Failed to fetch user with email ${email}: ${error.message}`);
    });
};

// Function to add a new user to the database

const addUser = async (name, email, password) => {
  return db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [name, email, password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw new Error(`Failed to add user: ${error.message}`);
    });
}



module.exports = { getUsers, getUserByEmail, addUser };
// ---- HANDLES DATABASE QUERIES TO FETCH USERS ----//

const db = require('../connection');

<<<<<<< HEAD

// Retrieves all users from the database
const getUsers = async() => {
=======
const getUsers = async () => {
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
  try {
    const result = await db.query('SELECT * FROM users;');
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

<<<<<<< HEAD
// Retrieves a user by their email from the database
const getUserByEmail = (email) => {
=======
const getUserByEmail = async (email) => {
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
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
<<<<<<< HEAD
=======

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


>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c

module.exports = { getUsers, getUserByEmail, addUser };
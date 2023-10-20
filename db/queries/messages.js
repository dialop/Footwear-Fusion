// ----  HANDLES DATABASE QUERIES TO SEND AND RETRIEVE MESSAGES  ----//

const db = require('../connection');

// Sends a message and returns the sent message details
const sendMessage = async(messageDetails) => {
  const { sender_id, receiver_id, product_id, message } = messageDetails;
  
  try {
<<<<<<< HEAD
    const result = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, product_id, message, date_sent) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;',
      [sender_id, receiver_id, product_id, message]
    );
      
    return result.rows[0];
=======
      const result = await db.query(
          'INSERT INTO messages (sender_id, receiver_id, product_id, message, date_sent) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;',
          [sender_id, receiver_id, product_id, message]
      );
      return result.rows[0];
>>>>>>> a2edd879383f7cd37b256fa7f66ed7a00bc53e5c
  } catch (error) {
    throw new Error(`Failed to send message: ${error.message}`);
  }
};


//Retrieves all messages sorted by the date they were sent (latest first)
const getAllMessages = async(userId) => {
  try {
    const result = await db.query('SELECT * FROM messages WHERE sender_id = $1 ORDER BY date_sent DESC;', [userId]);
    console.log('from db: ', userId);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to retrieve messages: ${error.message}`);
  }
};

module.exports = { sendMessage, getAllMessages };

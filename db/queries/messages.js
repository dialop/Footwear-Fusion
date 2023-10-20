// ----  HANDLE FUNCTIONS TO SEND AND RETRIEVE MESSAGES  ----//

const db = require('../connection');

// Sends a message and returns the sent message details
const sendMessage = async(messageDetails) => {
  const { sender_id, receiver_id, product_id, message } = messageDetails;
  
  try {
      const result = await db.query(
          'INSERT INTO messages (sender_id, receiver_id, product_id, message, date_sent) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;',
          [sender_id, receiver_id, product_id, message]
      );
      return result.rows[0];
  } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
  }
};


//Retrieves all messages sorted by the date they were sent (latest first)
const getAllMessages = async(userId) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY date_sent DESC;');
    console.log('from db: ', userId);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to retrieve messages: ${error.message}`);
  }
};

module.exports = { sendMessage, getAllMessages };

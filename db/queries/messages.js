// ----  HANDLES QUERY TO SEND AND RETRIEVE MESSAGES  ----//

const db = require('../connection');

/**
 * Sends a new message
 *
 * @param {Object} messageDetails - Details of the message being sent
 * @param {number|string} messageDetails.sender_id - ID of the sender
 * @param {number|string} messageDetails.receiver_id - ID of the receiver
 * @param {string} messageDetails.content - Content of message
 * @returns {Promise<Object>} Message data sent
 * @throws {Error} If error sending message
 */
const sendMessage = async(messageDetails) => {
  const { sender_id, receiver_id, content } = messageDetails;
  try {
    const result = await db.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *;', [sender_id, receiver_id, content]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to send message from user ${sender_id} to user ${receiver_id}: ${error.message}`);
  }
};

/**
 * Retrieves all messages for a specific user
 *
 * @param {number|string} userId - ID of user whose messages to be retrieved
 * @returns {Promise<Array>} List of messages for user
 * @throws {Error} If error retrieving the messages
 */
const getMessagesForUser = async(userId) => {
  try {
    const result = await db.query('SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY created_at DESC;', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to retrieve messages for user with ID ${userId}: ${error.message}`);
  }
};

module.exports = { sendMessage, getMessagesForUser };

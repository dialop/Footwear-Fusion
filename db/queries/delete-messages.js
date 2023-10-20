// ---- HANDLES DATABASE QUERY RELATED TO DELETING MESSAGES ---- //

const db = require('../connection');

// Import the necessary database connection module
const deleteMessage = async(messageId) => {
  try {
    const result = await db.query('DELETE FROM messages WHERE id = $1;', [messageId]);
  
    // Checks if a message was deleted
    if (result.rowCount === 0) {
      throw new Error(`Message with ID ${messageId} not found`);
    }
  
    return result.rows[0]; // Return the deleted message
  } catch (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }
};
    
module.exports = { deleteMessage };

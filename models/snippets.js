const mongoose = require('mongoose')
// the information stored about each snippet is the snippet itself, and the username
// of the user who wrote it
const snippetsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('snippet', snippetsSchema, 'snippets')

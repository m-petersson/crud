const mongoose = require('mongoose')
// the information stored for each user in the database, is their username and password
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('user', userSchema, 'users')

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})


schema.plugin(uniqueValidator)


module.exports = mongoose.model('User', schema)
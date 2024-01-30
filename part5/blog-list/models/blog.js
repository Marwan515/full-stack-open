const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, 'Minimum title Length is 5'],
    required: [true, 'Title cannot be blank!']
  },
  author: {
    type: String,
    minLength: [3, 'Authors name minimum length is 3'],
    required: [true, 'Authors name cant be blank']
  },
  url: {
    type: String,
    minLength: [10, 'Url Length Must be more than 10'],
    required: [true, 'url cant be blank!']
  },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog", blogSchema)
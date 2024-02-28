const bcrypt = require('bcrypt') 
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    return response.status(400).json({error:{message: "Minimum length for password is 3"}})
  }
  const saltRounds = 10
  const passHash = await bcrypt.hash(body.password, saltRounds)
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passHash,
  })

  const createdUser = await newUser.save()
  response.status(201).json(createdUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title:1, author: 1, url: 1, likes: 1})
  response.json(users)
})

module.exports = usersRouter
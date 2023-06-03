const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const userName = request.body.username
  const password = request.body.password
  const user = await User.findOne({ username: userName})
  const passwordVerified = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordVerified)) {
    return response.status(401).json({error: 'Invalid username or password'})
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
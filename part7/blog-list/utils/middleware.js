/* eslint-disable no-undef */
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "Unkown endpoint"})
}

const logger = (...params) => {
  console.log(...params)
}

const errorHandler = (error, request, response, next) => {
  if (error) {
    logger(error.message)
    return response.status(400).send({error: error.message})
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  request.token = null
  if (authorization && (authorization.startsWith('bearer ') || authorization.startsWith('Bearer '))) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token , process.env.SECRET)
  if (request.token && decodedToken.id) {
    const user = await User.findById(decodedToken.id)
    request.user = user
  }
  next()
}


module.exports = {errorHandler, unknownEndpoint, logger, tokenExtractor, userExtractor}
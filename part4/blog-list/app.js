const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

middleware.logger('connecting to ', config.mongodUrl)

mongoose.connect(config.mongodUrl)
  .then(() => {
    middleware.logger('connected to MongoDB')
  })
  .catch((error) => {
    middleware.logger('Error connecting to MongoDB:',error.message)
  })
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
// app.use(express.static('build'))

app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
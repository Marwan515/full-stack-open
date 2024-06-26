const { ApolloServer } = require('@apollo/server')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const http = require('http')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const User = require('./models/user')

require('dotenv').config()

const jwSecret = 'part8'

const MONGOD_URI = process.env.MONGOD_URI
if (!MONGOD_URI) {
  console.log('Mongod Uri Required Argument')
  return 1
}
console.log(MONGOD_URI)
console.log('Establishing a connection to mongoose -> ', MONGOD_URI)

mongoose
  .connect(MONGOD_URI)
  .then(() => {
    console.log('Connection Established To MongoDB -> ', MONGOD_URI)
  })
  .catch((error) => {
    console.log('Failed To Establish a Connection Due to -> ', error.message)
  })


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const serverCleanup = useServer({schema}, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), jwSecret
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => 
    console.log(`Server Currently Running On Port http://localhost:${PORT}`)
  )
}

start()
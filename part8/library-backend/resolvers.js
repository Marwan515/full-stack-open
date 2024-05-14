const { GraphQLError } = require('graphql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/books')
const saltRounds = 10
const jwSecret = 'part8'


const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    me: async (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => { 
      let query = {}
      if (args.author && args.genres) { 
        query = { 
          author: args.author, 
          genres: { $in: args.genres.includes(' ') ? args.genre.split(' '): args.genre}
        }
      } else if (args.author) {
        query = { author: args.author }
      } else if (args.genres) {
        query = { genres: { $in: args.genres.includes(' ') ? args.genre.split(' '): args.genre} }
      }

      try {
        const books = await Book.find(query).populate('author')
        return books
      } catch (error) {
        throw new GraphQLError(`Failed to Fetch Data ${error}`, {
          extensions: {
            code: 'Failed_To_Fetch_Data',
          }
        })
      }

    },
    allAuthors: async () => await Author.find({}),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let newAuthor = await Author.findOne({ name: args.author})
      if (!newAuthor) {
        newAuthor = new Author({name: args.author})
        await newAuthor.save()
      } else {
        newAuthor.bookCount = newAuthor.bookCount + 1
        await newAuthor.save()
      }
      const book = new Book({ ...args, author: newAuthor._id})
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Unauthenticated User Request Failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Creating new Book Failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      const newBook = await Book.findOne({title: book.title}).populate('author')
      pubsub.publish('BOOK_ADDED', {bookAdded: newBook})
      return newBook
    },
    createUser: async (root, args) => {
      const hashedPassword = await bcrypt.hash(args.password, saltRounds)
      const user = new User({ ...args, password: hashedPassword })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const correctPass = user === null ? false : await bcrypt.compare(args.password, user.password)
      if (!(user && correctPass)) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, jwSecret) }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Unauthenticated User Request Failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Ipdating Author Failed!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
}

module.exports = resolvers
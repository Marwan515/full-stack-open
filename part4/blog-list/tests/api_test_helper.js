// eslint-disable-next-line no-unused-vars
const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


const initialBlogs = [
  {
    title: "binary tree",
    author: "Ivan Livshits",
    url: "https://dev.to/livshits_ivan/binary-tree-26f3",
    likes: 22,
    user: "64774e0edf6e771f4abcfafa"
  },
  {
    title: "Introduction to open source",
    author: "Samuel Kalu",
    url: "https://dev.to/eskayml/introduction-to-open-source-4gae",
    likes: 1,
    user: "64774e0edf6e771f4abcfafa"
  }
]

const testPostBlog = {
  title: "Easy React data fetching with the new `use()` hook",
  author: "Alex Chiu",
  url: "https://dev.to/chiubaca/easy-react-data-fetching-with-use-16jg",
  likes: 2,
  user: "64774e0edf6e771f4abcfafa"
}

const testLikeDeafault = {
  title :"Creating a RESTful API with Node.js and MongoDB From Dev.to",
  author :"Leandro Lima",
  url: "https://dev.to/limaleandro1999/creating-a-restful-api-with-nodejs-and-mongodb-3o7o",
  user: "64774e0edf6e771f4abcfafa"
}

const missingTitle = {
  url: "https://dev.to/ytskk/open-project-ideas-27nh",
  author: "Andrey",
  likes: 5,
  user: "64774e0edf6e771f4abcfafa"
}

const missingUrl = {
  user: "64774e0edf6e771f4abcfafa",
  title: "Mobile App Ideas",
  author: "Andrey",
  likes: 5
}

const missingAuthor = {
  user: "64774e0edf6e771f4abcfafa",
  title: "Mobile App Ideas",
  url: "https://dev.to/ytskk/open-project-ideas-27nh",
  likes: 5
}

module.exports = {initialBlogs, testPostBlog, testLikeDeafault, missingAuthor, missingTitle, missingUrl, blogsInDb, usersInDb}
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor
const tokenExtractor = require('../utils/middleware').tokenExtractor
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {username:1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  // eslint-disable-next-line no-undef
  const user = request.user
  const blogNew = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blogNew.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (blog.user._id.toString() === request.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {likes: body.likes}, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
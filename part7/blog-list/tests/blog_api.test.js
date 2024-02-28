/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./api_test_helper')

const initialLength = helper.initialBlogs.length
const userName = 'testing'
const passWord = 'testingUser'

let testToken = ''

const setToken = async () => {
  const tData = await api.post('/api/login').send({username: userName, password: passWord})
  testToken = tData.body.token
}

beforeAll(async () => {
  await setToken()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('When the db has data', () =>  {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check if the id is a valid object property', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
   })
})

describe('Adding a new blogs', () => {
  
  test("Adding blog with valid data", async () => {
    const blog = helper.testPostBlog
    await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const newResponse = await api.get('/api/blogs')
    const urls = newResponse.body.map(bd => bd.url)
    expect(newResponse.body).toHaveLength(initialLength + 1)
    expect(urls).toContain(helper.testPostBlog.url)
  })

  test('like property default', async () => {
    const withoutLike = helper.testLikeDeafault
    await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(withoutLike)
      .expect(201)
  })

  test('Invalid data title, author, url any of these missing should return 400', async () => {
    const invTitle = helper.missingTitle
    const invAut = helper.missingAuthor
    const invUrl = helper.missingUrl
    await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(invTitle)
      .expect(400)
    await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(invUrl)
      .expect(400)
    await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(invAut)
      .expect(400)
  })
})

describe('Deletion of blog', () => {
  test('delete with an valid id', async () => {
    const deletedBlog = await api
      .post('/api/blogs')
      .set({Authorization: `Bearer ${testToken}`})
      .send(helper.testPostBlog)
    await api
      .delete(`/api/blogs/${deletedBlog.body.id}`)
      .set({Authorization: `Bearer ${testToken}`})
      .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(initialLength)

    const urls = blogsAfterDelete.map(b => b.url)
    expect(urls).not.toContain(deletedBlog.url)
  })

  test('delete with an invalid id', async () => {
    const initBlogs = await helper.blogsInDb()
    const deletedBlog = initBlogs[0]

    await api
     .delete(`/api/blogs/${deletedBlog.id}13892`)
     .set({Authorization: `Bearer ${testToken}`})
     .expect(400)
    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(initialLength)

    const urls = blogsAfterDelete.map(b => b.url)
    expect(urls).toContain(deletedBlog.url)
  })
})

describe('Getting a Single blog', () => {
  test('getting with an valid id', async () => {
    const initBlogs = await helper.blogsInDb()
    const blogToGet = Object.assign({}, initBlogs[0])
    const getBlog = await api.get(`/api/blogs/${blogToGet.id}`).expect(200)
    expect(getBlog.body.title).toBe(blogToGet.title)
    expect(getBlog.body.url).toBe(blogToGet.url)
  })

  test('getting with an invalid id', async () => {
    const initBlogs = await helper.blogsInDb()
    const blogToGet = initBlogs[0]

    const getBlog = await api.get(`/api/blogs/${blogToGet.id}fake23`).expect(400)
    expect(getBlog.body).not.toEqual(blogToGet)
    expect(getBlog.body.url).not.toBe(blogToGet.url)
  })
})

describe('updating a blog likes', () => {
  test('update with an valid id', async () => {
    const initBlogs = await helper.blogsInDb()
    const updatingBlog = initBlogs[0]
    const newUpdateBlog = Object.assign({},updatingBlog)
    newUpdateBlog.likes = 10
    const updateBlog = await api
      .put(`/api/blogs/${updatingBlog.id}`)
      .set({Authorization: `Bearer ${testToken}`})
      .send(newUpdateBlog).expect(200)
    expect(updateBlog.body.likes).toBe(10)
    const getBlog = await api.get(`/api/blogs/${updatingBlog.id}`).expect(200)
    expect(getBlog.body.likes).toBe(10)
  })

  test('update with an invalid id', async () => {
    const initBlogs = await helper.blogsInDb()
    const updatingBlog = initBlogs[0]
    const newUpdateBlog = Object.assign({}, updatingBlog)
    newUpdateBlog.likes = 10
    await api
      .put(`/api/blogs/${updatingBlog.id}f2`)
      .set({Authorization: `Bearer ${testToken}`})
      .send(newUpdateBlog)
      .expect(400)
    const getBlog = await api.get(`/api/blogs/${updatingBlog.id}`).expect(200)
    expect(getBlog.body.likes).toBe(initBlogs[0].likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
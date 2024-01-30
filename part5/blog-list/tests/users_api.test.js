/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./api_test_helper')

describe('when there is initially One user in the db', () => {
  beforeEach(async () => {
    await helper.firstUser()
    })

  test('user creation with valid data', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'Henry12',
      name: 'henry jackson',
      password: 'henryjack12',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
    const userNames = usersAfter.map(u => u.username)
    expect(userNames).toContain(newUser.username)
  })

  test('user creation with existing username expected to fail with 400', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'Johnny',
      name: 'Johnny jackson',
      password: 'henryjack12'
    }
    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(res.body.error).toContain('expected `username` to be unique')
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
    expect(usersBefore).toEqual(usersBefore)
  })

  test('user creation without username', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      name: 'henry jackson',
      password: 'fakepass'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
    const userNames = usersAfter.map(u => u.name)
    expect(userNames).not.toContain(newUser.name)
  })
  test('user creation with invalid data', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'He',
      password: 'fakepass'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
    const userNames = usersAfter.map(u => u.username)
    expect(userNames).not.toContain(newUser.username)
  })
})
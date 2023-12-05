const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    username: 'testusername',
    name: 'Test Tester',
    passwordHash: '$2b$10$D6Wj.RdmrI7SV/qNF.IydOcxq2xH9bsKGdoP5Yt4ux78tXItVIc/C'
  }
]

const initialLength = 1

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()
})

test('adding a new user into database increases the number of users', async () => {
  const newUser = {
    username: 'newuser123',
    name: 'New User',
    password: 'qwerty123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength + 1)
})

test('adding an already existing user doesnt affect the number of users', async () => {
  const newUser = {
    username: 'testusername',
    name: 'New User',
    password: 'qwerty123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})

test('too short usernames are not added to database', async () => {
  const newUser = {
    username: 'ab',
    name: 'New User',
    password: 'qwerty123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})

test('too short passwords are not added to database', async () => {
  const newUser = {
    username: 'newuser123',
    name: 'New User',
    password: 'qw'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})

test('username must be defined', async () => {
  const newUser = {
    name: 'New User',
    password: 'qwerty123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})


test('password must be defined', async () => {
  const newUser = {
    username: 'newuser123',
    name: 'New User',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})

afterAll(async () => {
  await mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('6 blogs are returned', async () => {
  await api
    .get('/api/blogs')

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.content)
  expect(contents).toHaveLength(6)
})


afterAll(async () => {
  await mongoose.connection.close()
})
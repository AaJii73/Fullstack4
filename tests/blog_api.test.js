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


test('at least 6 blogs are returned', async () => {

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.content)
  expect(contents.length).toBeGreaterThanOrEqual(6)
})


test('the blog posts contain id property', async () => {

  const response = await api.get('/api/blogs')
  const contents = response.body

  contents.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('adding a blog increases the number of blogs in the database', async () => {

  const response = await api.get('/api/blogs')
  const oldLength = response.body.length

  const newBlog = {
    title: 'new blog',
    author: 'test author',
    url: 'testUrl.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newResponse = await api.get('/api/blogs')

  expect(newResponse.body).toHaveLength(oldLength + 1)

})

afterAll(async () => {
  await mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs =[
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const initialLength = 6

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test(initialLength + ' blogs are returned', async () => {

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.content)
  expect(contents.length).toEqual(initialLength)
})


test('the blog posts contain id property', async () => {

  const response = await api.get('/api/blogs')
  const contents = response.body

  contents.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})


test('adding a blog increases the number of blogs in the database', async () => {

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

  expect(newResponse.body).toHaveLength(initialLength + 1)
})

test('deleting a blog removes the blog from database', async () => {

  const id = initialBlogs[0]._id
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength - 1)

})

test('deleting incorrect id does not change database', async () => {

  const id = 'incorrectID'
  await api
    .delete(`/api/blogs/${id}`)
    .expect(400)

  const response = await api.get('/api/blogs')
  const newLength = response.body.length

  expect(newLength).toEqual(initialLength)
})

test('the information of individual posts can be changed', async () => {

  const id = initialBlogs[0]._id

  const newInformation = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 15,
    __v: 0
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(newInformation)
    .expect(200)

  const response = await api.get(`/api/blogs/${id}`)

  expect(response.body.likes).toEqual(15)
})

test('trying to update the information of incorrect id returns 400 error', async () => {

  const id = 'incorrectID'

  const newInformation = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 15,
    __v: 0
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(newInformation)
    .expect(400)

})


afterAll(async () => {
  await mongoose.connection.close()
})
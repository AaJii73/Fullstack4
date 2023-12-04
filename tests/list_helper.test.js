const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'A test blog',
      author: 'Test author',
      url: 'http://www.testURLforFullstackCourse.com',
      likes: 17,
      __v: 0
    }
    ,
    {
      _id: '5a422aa71b54b676234d17f4',
      title: 'A test blog 2',
      author: 'Another Test author',
      url: 'http://www.testURLforFullstackCourse2.com',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa21b54b676234d17f4',
      title: 'A test blog 3',
      author: 'Test author',
      url: 'http://www.testURLforFullstackCourse3.com',
      likes: 7,
      __v: 0
    }
  ]



  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('of list with one blog equals the likes of the blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a larger list equals the sum of likes', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(5+17+4+7)
  })
})
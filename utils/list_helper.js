const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  var maxValue = 0
  var currentFavorite = null
  blogs.forEach(blog => {
    if (blog.likes > maxValue)
    {
      maxValue = blog.likes
      currentFavorite = blog
    }
  })

  if (currentFavorite === null)
  {
    return null
  }

  return {
    title:currentFavorite.title,
    author: currentFavorite.author,
    likes:currentFavorite.likes
  }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0)
  {
    return null
  }

  const blogsByAuthor = {}
  var currentTopAuthor = blogs[0].author
  var currentMostBlogs = 0
  blogs.forEach(blog => {
    if (blog.author in blogsByAuthor)
    {
      blogsByAuthor[blog.author] += 1
      if (blogsByAuthor[blog.author] > currentMostBlogs)
      {
        currentMostBlogs = blogsByAuthor[blog.author]
        currentTopAuthor = blog.author
      }
    }else{
      blogsByAuthor[blog.author] = 1
    }
  })

  return currentTopAuthor
}


const mostLikes = (blogs) => {
  if (blogs.length === 0)
  {
    return null
  }

  const likesForAuthor = {}
  var currentTopAuthor = blogs[0].author
  var currentMostLikes = 0
  blogs.forEach(blog => {
    if (blog.author in likesForAuthor)
    {
      likesForAuthor[blog.author] += blog.likes
      if (likesForAuthor[blog.author] > currentMostLikes)
      {
        currentMostLikes = likesForAuthor[blog.author]
        currentTopAuthor = blog.author
      }
    }else{
      likesForAuthor[blog.author] = blog.likes
      if (blog.likes > currentMostLikes)
      {
        currentMostLikes = blog.likes
        currentTopAuthor = blog.author
      }
    }
  })

  return { author: currentTopAuthor, likes: currentMostLikes }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
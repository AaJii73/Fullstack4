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

module.exports = {
  dummy, totalLikes, favoriteBlog
}
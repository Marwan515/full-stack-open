const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) {
    return 1
  } else {
    const blog = blogs.reduce((highLiked, curVal) => { return highLiked.likes > curVal.likes ? highLiked : curVal })
    return blog
  }
}

const mostBlogs = (blogsList) => {
  if (blogsList.length < 1) {
    return 0
  } else {
   const x = _.countBy(_.flatMap(blogsList), 'author')
   const nameAuthor = _.max(Object.keys(x), o => x[o])
   const mostBlog = { 
    author: nameAuthor,
    blogs: x[nameAuthor]
   }
   return mostBlog
  }
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return 0
  } else {
    const result = _(blogs)
                    .groupBy('author')
                    .mapValues(arr => _.sumBy(arr, 'likes'))
                    .entries()
                    .map(values => 
                      _.zipObject(['author', 'likes'], values)
                    )
                    .maxBy('likes')
    return result
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
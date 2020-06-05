const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => Number(blog.likes))
    return likes.reduce((sum, blog) => sum + blog, 0)
}

const favouriteBlog = (blogs) => {
    if (Array.isArray(blogs) && blogs.length) {
        return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
    } else {
        return []
    }
}

const mostBlogs = (blogs) => {
    if (Array.isArray(blogs) && blogs.length) {
        const authorCount = lodash.countBy(blogs, "author")
        const topAuthor = lodash.maxBy(lodash.entries(authorCount), lodash.last)
        return {author: topAuthor[0], blogs: topAuthor[1]}
    } else {
        return ""
    }
}

const mostLikes = (blogs) => {
    if (Array.isArray(blogs) && blogs.length) {
        const authorList = lodash.entries(lodash.groupBy(blogs, "author"))
        const authors = authorList.map(author => author[0])
        const likes = authorList.map(author => author[1].map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0))
        const maxIndex = likes.reduce((maxIndex, x, i, likes) => x > likes[maxIndex] ? i : maxIndex, 0)
        return {author: authors[maxIndex], likes: likes[maxIndex]}
    } else {
        return ""
    }
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}
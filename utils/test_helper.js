const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "Blog 1",
        author: "Author 1",
        url: "URL 1",
        likes: 3
    },
    {
        title: "Blog 2",
        author: "Author 2",
        url: "URL 2",
        likes: 14
    },
    {
        title: "Blog 3",
        author: "Author 3",
        url: "URL 3",
        likes: 16
    },
]

const returnBlogs = async () => {
    const blogs = await Blog.find()
    return blogs.map(blog => blog.toJSON())
}

module.exports = {initialBlogs, returnBlogs}
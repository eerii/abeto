const router = require('express').Router()
const Blog = require('../models/blog')

//ROUTES
router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
})

module.exports = router
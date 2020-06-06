const router = require('express').Router()
const Blog = require('../models/blog')

//ROUTES
router.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post("/", async (req, res) => {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
})

router.delete("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) { return res.status(404).json({ error: 'There is no blog for the given ID' }) }

    await blog.remove()
    return res.status(204).end()
})

router.put("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    return blog ? res.json(blog) : res.status(404).json({ error: 'There is no blog for the given ID' })
})

module.exports = router
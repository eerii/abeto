const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

//ROUTES
router.get("/", async (req, res) => {
    const blogs = await Blog.find().populate('user', { blogs: 0, passwordHash: 0, name: 0})
    res.json(blogs)
})

router.post("/", async (req, res) => {
    const user = await User.findById(req.body.user)

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.url,
        user: req.body.user
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

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
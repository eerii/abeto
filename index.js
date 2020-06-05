//IMPORTS
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')

require('dotenv').config();

//MONGODB
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URL
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

//ROUTES
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

//START SERVER
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
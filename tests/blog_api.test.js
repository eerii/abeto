const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const Blog = require("../models/blog")

const helper = require('../utils/test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        await new Blog(blog).save()
    }
})

describe("GET", () => {
    test("The return type for the get request is json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("The field of the unique identifier is \"id\" and not \"_id\"", async () => {
        const res = await api.get("/api/blogs")
        res.body.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
        })
    })
})

describe("POST", () => {
    const newBlog = {
        title: "New Blog",
        author: "New Author",
        url: "New URL",
        likes: 6
    }

    const createBlog = async () => {
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        return await helper.returnBlogs()
    }

    test("Creating a new blog post increases the number of blogs by one", async () => {
        const newBlogList = await createBlog()
        expect(newBlogList.length).toBe(helper.initialBlogs.length + 1)
    })

    test("Verify title of a new blog post", async () => {
        const newBlogList = await createBlog()
        const title = newBlogList.map(blog => blog.title)
        expect(title).toContain(newBlog.title)
    })

    test("Verify author of a new blog post", async () => {
        const newBlogList = await createBlog()
        const author = newBlogList.map(blog => blog.author)
        expect(author).toContain(newBlog.author)
    })

    test("Verify url of a new blog post", async () => {
        const newBlogList = await createBlog()
        const url = newBlogList.map(blog => blog.url)
        expect(url).toContain(newBlog.url)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

afterAll(() => {
    mongoose.connection.close()
})
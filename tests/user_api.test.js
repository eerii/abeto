const supertest = require("supertest")
const bcrypt = require("bcrypt")

const app = require("../app")
const api = supertest(app)

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)
const User = require("../models/user")

const helper = require("../utils/test_helper")


beforeEach(async () => {
    await User.deleteMany({})

    const hash = await bcrypt.hash("asecurepassword1!", 10)
    const user = new User({username: "test", passwordHash: hash})

    await user.save()
})

describe("GET", () => {
    test("The return type for the get request is json", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
})

describe("POST", () => {
    test("Create a user with valid information", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            username: "newusername",
            password: "embarrassingpassword1!",
            name: "New User"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length + 1)

        const usernames = after.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("Create a user with no username", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            password: "embarrassingpassword1!",
            name: "New User"
        }

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain("The username is required")

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length)
    })

    test("Create a user with short username", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            username: "us",
            password: "embarrassingpassword1!",
            name: "New User"
        }

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain("The username need to be at least 3 characters long")

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length)
    })

    test("Create a user with the same username", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            username: "test",
            password: "embarrassingpassword1!",
            name: "New User"
        }

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain("to be unique")

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length)
    })

    test("Create a user with no password", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            username: "newusername",
            name: "New User"
        }

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain("The password is missing")

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length)
    })

    test("Create a user with short password", async () => {
        const before = await helper.returnUsers()

        const newUser = {
            username: "newusername",
            password: "pass",
            name: "New User"
        }

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain("The password needs to be at least 8 characters long")

        const after = await helper.returnUsers()
        expect(after.length).toBe(before.length)
    })
})

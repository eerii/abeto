//IMPORTS
//Environmental variables
const env = require("./utils/env")
//Express
const express = require("express")
require("express-async-errors")
const app = express()
//Mongoose
const mongoose = require("mongoose")
//Cors
const cors = require("cors")
//Custom modules
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const logs = require("./utils/logs")
const middleware = require("./utils/middleware")

//DATABASE
logs.info("Connecting to the MongoDB database")
mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {logs.info("Successfully connected!")})
    .catch(error => {logs.error("There has been an error with MongoDB: ", error.message)})

//MIDDLEWARE
app.use(cors())
//app.use(express.static('build'))
app.use(express.json())

app.use(middleware.logRequests)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
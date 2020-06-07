const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is missing"]
    },
    author: {
        type: String,
    },
    url: {
        type: String,
        required: [true, "URL is missing"]
    },
    likes: {
        type: Number,
        default: 0
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
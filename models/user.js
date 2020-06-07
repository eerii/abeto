const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
        minlength: [3, "The username need to be at least 3 characters long"],
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: [true, "The password hash is missing"]
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
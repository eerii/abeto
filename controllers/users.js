const router = require('express').Router()

const bcrypt = require('bcrypt')

const User = require('../models/user')

//ROUTES
router.get("/", async (req, res) => {
    const users = await User.find().populate('blogs', { likes: 0, user: 0, author: 0, url: 0})
    res.json(users)
})

router.post("/", async (req, res) => {
    const saltRounds = 10

    if (!req.body.password) {
        res.status(400).json({error: "The password is missing"})
    } else if (req.body.password.trim().length < 8) {
        res.status(400).json({error: "The password needs to be at least 8 characters long"})
    } else if (req.body.password.search(/[a-z]/i) < 0) {
        res.status(400).json({error: "The password needs to contain at least one letter" })
    } else if (req.body.password.search(/[0-9]/) < 0) {
        res.status(400).json({error: "The password needs to contain at least one number" })
    /*} else if (req.body.password.search(/[!@#$%^&*]/) < 0) {
        res.status(400).json({error: "The password needs to contain at least one special character" })*/
    } else {
        const hash = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User({
            username: req.body.username,
            name: req.body.name,
            passwordHash: hash
        })

        const result = await user.save()
        res.status(201).json(result)
    }
})

module.exports = router
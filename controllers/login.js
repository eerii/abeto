const router = require("express").Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/user")
const {SECRET} = require("../utils/env")


router.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    const passCheck = user === null ? false : await bcrypt.compare(req.body.password, user.passwordHash)

    if (!(user && passCheck)) {
        return res.status(401).json({ error: 'Invalid username or password' })
    }

    const tokenUser = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokenUser, SECRET)

    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = router
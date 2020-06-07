const logs = require("./logs")

const logRequests = (req, res, next) => {
    logs.info("Method:", req.method, "|", "Path:", req.path, "|", "Body:", req.body)
    next()
}

const tokenHandler = (req, res, next) => {
    const auth = req.get("authorization")
    req.token = (auth && auth.toLowerCase().startsWith("bearer ")) ? auth.substring(7) : null
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown endpoint"})
}

const errorHandler = (error, req, res, next) => {
    if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ error: "The ID is not formatted correctly" });
    }
    if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "The token is invalid" })
    }
    logs.error(error.message)
    next(error)
}

module.exports = {logRequests, tokenHandler, unknownEndpoint, errorHandler}
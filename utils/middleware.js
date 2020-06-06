const logs = require("./logs")

const logRequests = (req, res, next) => {
    logs.info("Method:", req.method, "|", "Path:", req.path, "|", "Body:", req.body)
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
    logs.error(error.message)
    next(error)
}

module.exports = {logRequests, unknownEndpoint, errorHandler}
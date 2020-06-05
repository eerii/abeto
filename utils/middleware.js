const logs = require("./logs")

const logRequests = (req, res, next) => {
    logs.info("Method:", req.method, "|", "Path:", req.path, "|", "Body:", req.body)
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown endpoint"})
}

const errorHandler = (error, req, res, next) => {
    logs.error(error.message)
    next(error)
}

module.exports = {logRequests, unknownEndpoint, errorHandler}
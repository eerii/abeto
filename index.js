const app = require("./app")
const env = require("./utils/env")
const logs = require("./utils/logs")

app.listen(env.PORT, () => {
    logs.info(`Server running on port ${env.PORT}`)
})
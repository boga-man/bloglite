const verifyUser = require("../middleware/verifyUser")

module.exports = (app => {
    const users = require("../controllers/users.controller")

    var router = require("express").Router()

    // create new user
    router.post("/signup", users.create)

    // retrieve user details by id
    router.get("/:id", verifyUser ,users.findOneById)

    app.use('/api/users', router)
})
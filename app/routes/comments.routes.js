const verifyUser = require("../middleware/verifyUser")

module.exports = app => {
    const comments = require("../controllers/comments.controller")
    var router = require("express").Router()

    // create a new comment
    router.post('/', verifyUser, comments.create)

    // retrieve a comment by id
    router.get("/:id", verifyUser, comments.findOneById)

    // retrieve all the comments 
    router.get('/post/:id', verifyUser, comments.findAll)

    // update a comment by id
    router.put("/:id", verifyUser, comments.updateOneById)

    // delete a comment by id
    router.delete("/:id", verifyUser, comments.deleteOneById)

    app.use('/api/comments', router);
}
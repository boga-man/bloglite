const verifyUser = require("../middleware/verifyUser");

module.exports = app => {
  const posts = require("../controllers/posts.controller")

  var router = require("express").Router();

  // Create a new post
  router.post("/", verifyUser, posts.create);

  // Retrieve all posts
  router.get("/", verifyUser, posts.findAll);

  // Retrieve a single post with id
  router.get("/:id", verifyUser, posts.findOneById);

  // Update a post with id
  router.put("/:id", verifyUser, posts.updateOneById);

  // Delete a post with id
  router.delete("/:id", verifyUser, posts.deleteOneById);

  // Like a post
  router.put("/like/:id", verifyUser, posts.likePost);

  // Unlike a post
  router.put("/unlike/:id", verifyUser, posts.unlikePost)

  app.use('/api/posts', router);
};

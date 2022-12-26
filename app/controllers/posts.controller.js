const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Post
const create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      message: "Title/Content can not be empty!"
    });
    return;
  }

  // Create a Post
  const post = {
    ...req.body,
    authorId: req.body.userId
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Posts from the database based on the searchquery
const findAll = (req, res) => {
  const query = req.body.query;
  const limit = req.body.limit;
  const offset = req.body.offset;

  if(!query){
    Post.findAll({limit, offset}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    });
  }
  Post.findAll({ limit, offset, where: {
    [Op.or] : [
      {category:{[Op.like]:  '%'+query+'%'}},
      {title:{[Op.like]:  '%'+query+'%'}},
      {content:{[Op.like]:  '%'+query+'%'}}
    ]
   
  }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    });
};

// Find a single Post with an id
const findOneById = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};

// Update a Post by the id in the request
const updateOneById = (req, res) => {
  Post.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
const deleteOneById = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};


// Like a post
const likePost = (req, res) => {
  const id = req.params.id

  Post.findByPk(id)
  .then(data=>{
    const likedUsers = data.likedUsers
    var i = 0;
    for(i=0; i<likedUsers.length; i++){
      if(likedUsers[i]===req.body.userId){
        return res.send("Post already liked by the user");
      }
    }
    likedUsers.push(req.body.userId)
    const post = {
      ...data,
      likedUsers,
      likes: data.likes+1
    }
    Post.update(post, {where: {id: id}})
    .then(num=>{
      // console.log(num)
      if(num[0]===1){
        res.status(200).send({
          message: "Post liked!"
        })
      }else{
        res.status(500).send({
          message: "Post not liked!"
        })
      }
    }).catch(err => {res.status(500).send(err.message)})
  }).catch(err=>{res.status(500).send(err.message)})
  
}

const unlikePost = (req, res) => {
  const id = req.params.id

  Post.findByPk(id)
  .then(data=>{
    const likedUsers = data.likedUsers
    console.log(likedUsers)
    var i = 0;
    var cnt = 0;
    for(i=0; i<likedUsers.length; i++){
      if(likedUsers[i]===req.body.userId){
        cnt++;
      }
    }
    if(cnt===0){
      return res.send("Cannot unlike as the user didnot like the post to begin with")
    }
    var newLikedUsers = []  
    var i = 0;
    while (i < likedUsers.length) {
      if (likedUsers[i] !== parseInt(req.body.userId)) {
        newLikedUsers.push(likedUsers[i])
      } 
      ++i;
    }
    const post = {
      ...data,
      likedUsers: newLikedUsers,
      likes: data.likes+1
    }
    Post.update(post, {where: {id: id}})
    .then(num=>{
      // console.log(num)
      if(num[0]===1){
        res.status(200).send({
          message: "Post unliked!"
        })
      }else{
        res.status(500).send({
          message: "Post not unliked!"
        })
      }
    }).catch(err => {res.status(500).send(err.message)})
  }).catch(err=>{res.status(500).send(err.message)})
  
}


module.exports = {
  findAll,
  updateOneById,
  deleteOneById,
  findOneById,
  create,
  likePost,
  unlikePost
}
const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Post
const create = (req, res) => {
  // Validate request
  if (!req.body.comment) {
    res.status(400).send({
      message: "Comment can not be empty!"
    });
    return;
  }

  // Create a Post
  const comment = {
    ...req.body,
    authorId: req.body.id,
  };

  // Save Post in the database
  Comment.create(comment)
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

// Retrieve all Posts from the database based on the search query
const findAll = (req, res) => {
  Comment.findAll({where:{postId: req.params.id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments"
      });
    });
};

// Find a single Post with an id
const findOneById = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
};

// Update a comment by the id in the request
const updateOneById = (req, res) => {
  console.log("Running the update")
  Comment.update({...req.body}, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id
      });
    });
};

// Delete a comment with the specified id in the request
const deleteOneById = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};

// Delete all Posts from the database.
// const deleteAll = (req, res) => {
//   Comment.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Posts were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Posts."
//       });
//     });
// };


module.exports = {
  findAll,
  updateOneById,
//   deleteAll,
  deleteOneById,
  findOneById,
  create
}
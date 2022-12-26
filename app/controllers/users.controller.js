const db = require("../models")
const User = db.users


// Create new user
const create = (req, res) => {
    // validate request
    if(!req.body.username || !req.body.emailId || !req.body.password){
        res.status(400).send({
            message: "Username/Email/Password field cannot be empty!"
        });

        return;
    }

    // create the user
    const user = {
        username: req.body.username,
        emailId: req.body.emailId,
        password: req.body.password,
    };

    // save the user to the database
    User.create(user)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Post."
            });
        })
}

// retrieve a user by its id
const findOneById = (req, res) => {
    const id = req.params.id;
    if(req.body.userId != parseInt(id)){
      res.status(403).send({
        message: "User is forbidden to access this resource"
      })
    }
  
    User.findByPk(id)
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


module.exports = {
    findOneById,
    create
}


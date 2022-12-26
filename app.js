const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Bloglite!!</h1>");
});


// setup the routers
// posts router
const postRouter = require("./app/routes/posts.routes");
postRouter(app)

// users router
const usersRouter = require("./app/routes/users.routes");
usersRouter(app)

// comments router
const commentsRouter = require("./app/routes/comments.routes")
commentsRouter(app)

// login router
const loginRouter = require("./app/routes/login.routes")
loginRouter(app)



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

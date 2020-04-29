const db = require("../models");
const Taskcomment = db.TaskComment;
const Op = db.Sequelize.Op;

// Create and Save a new task comment
exports.create = (req, res) => {
  // Save task comment in the database
  Taskcomment.create({
    tType: req.body.tType
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new comments."
      });
    });
};

// Retrieve all taskcomment from the database.
exports.findAll = (req, res) => {
    Taskcomment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
};

// Find a single taskcomment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  taskcomment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving comment with id=" + id
      });
    });
};
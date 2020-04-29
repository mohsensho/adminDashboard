const db = require("../models");
const Taskplatform = db.TaskPlatform;
const Op = db.Sequelize.Op;

// Create and Save a new task platform
exports.create = (req, res) => {
  // Save task platform in the database
  Taskplatform.create({
    tType: req.body.tType
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new platforms."
      });
    });
};

// Retrieve all taskplatform from the database.
exports.findAll = (req, res) => {
    Taskplatform.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving platforms."
      });
    });
};

// Find a single taskplatform with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  taskplatform.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving platform with id=" + id
      });
    });
};
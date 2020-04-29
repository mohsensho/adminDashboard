const db = require("../models");
const Tasktype = db.tasktype;
const Op = db.Sequelize.Op;

// Create and Save a new task
exports.create = (req, res) => {
  // Save task in the database
  Tasktype.create({
    tType: req.body.tType
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new task."
      });
    });
};

// Retrieve all taskstatus from the database.
exports.findAll = (req, res) => {
    Tasktype.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single taskstatus with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tasktype.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
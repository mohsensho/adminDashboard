const db = require("../models");
const Taskstatus = db.taskstatus;
const Op = db.Sequelize.Op;


// Retrieve all taskstatus from the database.
exports.findAll = (req, res) => {
    Taskstatus.findAll()
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

  Taskstatus.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
const db = require("../models");
const Taskstatus = db.taskstatus;
const Op = db.Sequelize.Op;


// Retrieve all taskstatus from the database.
exports.findAll = (req, res) => {
  console.log("+++++  start taskstatus controller +++++++++++++++++++");
  console.log("taskstatus req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;
  console.log("filter is in taskstatus = "+ filter.id);
  
  console.log("condition===============  "+JSON.stringify(filter.id, null, 2));
  Taskstatus.findAndCountAll({
    where: {
      id: {
        [Op.or]: filter.id
      }
    }
    }).then(data => {
      console.log(data.count);
      res.setHeader('content-range', data.count);
      console.log(JSON.stringify(data.rows, null, 2));
      res.send(data.rows);
    })
    .catch(err => {
      console.log("error "+JSON.stringify(err.message, null, 2));
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taskstatus."
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
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
  console.log("+++++  start tasktype controller +++++++++++++++++++");
  console.log("tasktype req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let tasktypeid = null;
  //let sort = JSON.parse(req.query['sort']) ? JSON.parse(req.query['sort']) : null;
  //let range = JSON.parse(req.query['range']) ? JSON.parse(req.query['range']) : null;
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;


  //console.log("sort in tasktype= " + sort);
  //console.log("range in tasktype= " + range);
  console.log("filter in tasktype= " +filter);
  console.log("tasktype controller +++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + " (inside for in tasktype): " + filter[myKey]);
    if(myKey === "id"){
      tasktypeid = {id: { [Op.eq]: filter[myKey] }};
      console.log("for tasktype controller inside for= "+tasktypeid);
    }
  }

  Tasktype.findAndCountAll({
      where: [{},
        tasktypeid,
      ]
    }).then(data => {
      console.log(data.count);
      res.setHeader('content-range', data.count);
      console.log(JSON.stringify(data.rows, null, 2));
      res.send(data.rows);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasktype."
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
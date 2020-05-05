const db = require("../models");
const Taskplatform = db.taskplatform;
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
  console.log("+++++  start taskplatform controller +++++++++++++++++++");
  console.log("taskplatform req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let taskplatformid = null;
  //let sort = JSON.parse(req.query['sort']) ? JSON.parse(req.query['sort']) : null;
  //let range = JSON.parse(req.query['range']) ? JSON.parse(req.query['range']) : null;
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;


  //console.log("sort in taskplatform= " + sort);
  //console.log("range in taskplatform= " + range);
  console.log("filter in taskplatform= " +filter);
  console.log("taskplatform controller +++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + " (inside for in taskplatform): " + filter[myKey]);
    if(myKey === "id"){
      taskplatformid = {id: { [Op.eq]: filter[myKey] }};
      console.log("for taskplatform controller inside for= "+taskplatformid);
    }
  }

  Taskplatform.findAndCountAll({
      where: [{},
        taskplatformid,
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
          err.message || "Some error occurred while retrieving taskplatform."
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
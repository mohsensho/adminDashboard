const db = require("../models");
const Taskstatus = db.taskstatus;
const Op = db.Sequelize.Op;


// Retrieve all taskstatus from the database.
exports.findAll = (req, res) => {
  console.log("+++++  start taskstatus controller +++++++++++++++++++");
  console.log("taskstatus req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let taskstatusid = null;
  //let sort = JSON.parse(req.query['sort']) ? JSON.parse(req.query['sort']) : null;
  //let range = JSON.parse(req.query['range']) ? JSON.parse(req.query['range']) : null;
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;


  //console.log("sort in taskstatus= " + sort);
  //console.log("range in taskstatus= " + range);
  console.log("filter in taskstatus= " +filter);
  console.log("taskstatus controller +++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + " (inside for in taskstatus): " + filter[myKey]);
    if(myKey === "id"){
      taskstatusid = {id: { [Op.eq]: filter[myKey] }};
      console.log("for taskstatus controller inside for= "+taskstatusid);
    }
  }

  Taskstatus.findAndCountAll({
      where: [{},
        taskstatusid,
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
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allUsers = (req, res) => {
  console.log("+++++  start user controller +++++++++++++++++++");
  console.log("user req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let userid = null;
  //let sort = JSON.parse(req.query['sort']) ? JSON.parse(req.query['sort']) : null;
  //let range = JSON.parse(req.query['range']) ? JSON.parse(req.query['range']) : null;
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;


  //console.log("sort in user= " + sort);
  //console.log("range in user= " + range);
  console.log("filter in user= " +filter);
  console.log("user controller +++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + " (inside for in user): " + filter[myKey]);
    if(myKey === "userId"){
      userid = {userId: { [Op.eq]: filter[myKey] }};
      console.log("for user controller inside for= "+userid);
    }
  }

    User.findAndCountAll({
      where: [{},
        userid,
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
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
/*
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
*/

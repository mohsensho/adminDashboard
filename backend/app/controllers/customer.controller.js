const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;


// Retrieve all taskstatus from the database.
exports.findAll = (req, res) => {
  console.log("+++++  start customer controller +++++++++++++++++++");
  console.log("customer req= "+ req.query);
  console.log(JSON.stringify(req.query, null, 2));
  let customerid = null;
  //let sort = JSON.parse(req.query['sort']) ? JSON.parse(req.query['sort']) : null;
  //let range = JSON.parse(req.query['range']) ? JSON.parse(req.query['range']) : null;
  let filter = JSON.parse(req.query['filter']) ? JSON.parse(req.query['filter']) : null;


  //console.log("sort in customer= " + sort);
  //console.log("range in customer= " + range);
  console.log("filter in customer= " +filter);
  console.log("customer controller +++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + " (inside for in customer): " + filter[myKey]);
    if(myKey === "id"){
      customerid = {id: { [Op.eq]: filter[myKey] }};
      console.log("for customer controller inside for= "+customerid);
    }
  }

  Customer.findAndCountAll({
      where: [{},
        customerid,
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
          err.message || "Some error occurred while retrieving customer."
      });
    });
};

// Find a single taskstatus with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
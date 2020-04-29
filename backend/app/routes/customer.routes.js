module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
   
    // Retrieve all 
    router.get("/", customers.findAll);
  
    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);
  
    app.use('/api/customer', router);
  };
  
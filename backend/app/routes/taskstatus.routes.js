module.exports = app => {
    const taskStatuses = require("../controllers/taskstatus.controller.js");
  
    var router = require("express").Router();
   
    // Retrieve all 
    router.get("/", taskStatuses.findAll);
  
    // Retrieve a single taskStatuses with id
    router.get("/:id", taskStatuses.findOne);
  
    app.use('/api/taskstatus', router);
  };
  
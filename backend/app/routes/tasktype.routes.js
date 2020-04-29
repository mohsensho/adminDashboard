module.exports = app => {
    const tasktype = require("../controllers/tasktype.controller.js");
  
    var router = require("express").Router();
  
    // // // Create a new 
    //  router.post("/", tasktype.create);
  
    // Retrieve all 
    router.get("/", tasktype.findAll);
  
    // Retrieve a single TaskType with id
    router.get("/:id", tasktype.findOne);
  
    app.use('/api/tasktype', router);
  };
  
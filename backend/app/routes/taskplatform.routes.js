module.exports = app => {
    const taskplatform = require("../controllers/taskplatform.controller");
  
    var router = require("express").Router();
 
    // Retrieve all 
    router.get("/", taskplatform.findAll);
  
    // Retrieve a single TaskType with id
    router.get("/:id", taskplatform.findOne);
  
    app.use('/api/taskplatform', router);
  };
  
module.exports = app => {
    const taskcomment = require("../controllers/taskcomment.controller");
  
    var router = require("express").Router();
 
    // Retrieve all 
    router.get("/", taskcomment.findAll);
  
    // Retrieve a single TaskType with id
    router.get("/:id", taskcomment.findOne);
  
    app.use('/api/taskcomment', router);
  };
  
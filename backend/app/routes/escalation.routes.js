module.exports = app => {
    const escalation = require("../controllers/escalation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", task.create);
  
    // Retrieve all Tutorials
    router.get("/", escalation.findAndCountAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", escalation.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", escalation.update);

    // Delete a Tutorial with id
    router.delete("/", escalation.delete);
    // Delete a Tutorial with id
    //router.delete("/:id", task.delete);
  
    app.use('/api/escalation', router);
  };
  
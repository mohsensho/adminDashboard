module.exports = app => {
    const patch = require("../controllers/patch.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", task.create);
  
    // Retrieve all Tutorials
    router.get("/", patch.findAndCountAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", patch.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", patch.update);

    // Delete a Tutorial with id
    router.delete("/", patch.delete);
    // Delete a Tutorial with id
    //router.delete("/:id", task.delete);
  
    app.use('/api/patch', router);
  };
  
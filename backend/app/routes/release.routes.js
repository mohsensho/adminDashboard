module.exports = app => {
    const release = require("../controllers/release.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", task.create);
  
    // Retrieve all Tutorials
    router.get("/", release.findAndCountAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", release.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", release.update);

    // Delete a Tutorial with id
    router.delete("/", release.delete);
    // Delete a Tutorial with id
    //router.delete("/:id", task.delete);
  
    app.use('/api/release', router);
  };
  
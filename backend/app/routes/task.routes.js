module.exports = app => {
    const task = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", task.create);
  //GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
  
    // Retrieve all Tutorials
    router.get("/", task.findAndCountAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", task.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", task.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", task.delete);
  
    app.use('/api/task', router);
  };
  
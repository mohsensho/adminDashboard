const db = require("../models");
const Task = db.task;
const User = db.user;
const TaskType = db.tasktype;
const TaskStatus = db.taskstatus;
const Customer = db.customer;
const Platform = db.taskplatform;
//const Comment = db.taskcomments;
const Op = db.Sequelize.Op;

// Create and Save a new task
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.taskname) {
  //   res.status(400).send({
  //     message: "Task name can not be empty!"
  //   });
  //   return;
  // }

  // Create a Task
  const taskValues = {
    taskName: req.body.taskName,
    taskDate: req.body.taskDate,
    numberOfResource: req.body.numberOfResource,
    numberOfRound: req.body.numberOfRound,
    percentOfComplete: req.body.percentOfComplete,
    ECD: req.body.ECD,
    timeSpent: req.body.timeSpent,
    userId: req.body.userId,
    tasktypeId: req.body.tasktypeId,
    customerId: req.body.customerId,
    taskstatusId: req.body.taskstatusId,
    taskPlatformId: req.body.taskPlatformId,
    taskComments: req.body.taskComments
  };

  // Save task in the database
  Task.create(taskValues)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new task."
      });
    });
};

//GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
// Retrieve all task from the database.
exports.findAndCountAll = (req, res) => {
  let taskname = null;
  let taskdatefrom = null;
  let taskdateto = null;
  let resource = null;
  let round = null;
  let completefrom = null;
  let completeto = null;
  let ECDfrom = null;
  let ECDto = null;
  let timespentfrom = null;
  let timespentto = null;
  let userid = null;
  let tasktypeid = null;
  let customerid = null;
  let taskstatusid = null;
  let taskplatformid = null;
  
  var sort = JSON.parse(req.query['sort']);
  var range = JSON.parse(req.query['range']);
  var filter = JSON.parse(req.query['filter']);

  console.log(sort);
  console.log(range);
  console.log(filter);
  console.log("+++++++++++++++++++");
  //let whereCondition = [{}];
  for(var myKey in filter) {
    console.log(myKey + ":" + filter[myKey]);
    if(myKey === "taskName"){
      taskname = {taskName: { [Op.like]: `%${filter[myKey]}%` }};
    }else if(myKey === "fromDate"){
      taskdatefrom = {taskDate: { [Op.gte]: filter[myKey] }};
    }else if(myKey === "toDate"){
      taskdateto = {taskDate: { [Op.lte]: filter[myKey] }};
    }else if(myKey === "numberOfResource"){
      resource = {numberOfResource: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "numberOfRound"){
      round = {numberOfRound: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "percentOfComplete"){
      completeto = {percentOfComplete: { [Op.lte]: filter[myKey] }};
    }else if(myKey === "fromECD"){
      ECDfrom = {ECD: { [Op.gte]: filter[myKey] }};
    }else if(myKey === "toECD"){
      ECDto = {ECD: { [Op.lte]: filter[myKey] }};
    }else if(myKey === "timeSpent"){
      timespentfrom = {timeSpent: { [Op.gte]: filter[myKey] }};
    }else if(myKey === "userId"){
      userid = {userId: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "tasktypeId"){
      tasktypeid = {tasktypeId: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "customerId"){
      customerid = {customerId: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "taskstatusId"){
      taskstatusid = {taskstatusId: { [Op.eq]: filter[myKey] }};
    }else if(myKey === "taskPlatformId"){
      taskplatformid = {taskPlatformId: { [Op.eq]: filter[myKey] }};
    }    
  }
// console.log("task after for "+JSON.stringify(taskname, null, 2));
// console.log("resource after for "+JSON.stringify(resource, null, 2));
//var condition = { taskname, resource };
//   .findAndCountAll({
//     where: {
//        title: {
//          $like: 'foo%'
//        }
//     },
//     offset: 10,
//     limit: 2
//  })
//  .then(function(result) {
//    console.log(result.count);
//    console.log(result.rows);
//  });
  Task.findAndCountAll({
    include: [{
      model: User,
      required: true
     },{
      model: TaskType,
      required: true
     },{
      model: TaskStatus,
      required: true
     },{
      model: Customer,
      required: true
     },{
      model: Platform,
      required: true
     }],
    where: [{},
      taskname,
      taskdatefrom,
      taskdateto,
      resource,
      round,
      completefrom,
      completeto,
      ECDfrom,
      ECDto,
      timespentfrom,
      timespentto,
      userid,
      tasktypeid,
      customerid,
      taskstatusid,
      taskplatformid,
    ],
    order: [
      sort
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
        err.message || "Some error occurred while retrieving tasks."
    });
  });


};

/*
// Retrieve all task from the database.
exports.findAll = (req, res) => {
 
  let taskname = req.query.taskName;
  let taskdatefrom = req.query.taskDateFrom;
  let taskdateto = req.query.taskDateTo;
  let resource = req.query.resource;
  let round = req.query.round;
  let completefrom = req.query.completeFrom;
  let completeto = req.query.completeTo;
  let ECDfrom = req.query.ECDFrom;
  let ECDto = req.query.ECDTo;
  let timespentfrom = req.query.timeSpentFrom;
  let timespentto = req.query.timeSpentTo;
  let userid = req.query.userId;
  let tasktypeid = req.query.tasktypeId;
  let customerid = req.query.customerId;
  let taskstatusid = req.query.taskstatusId;

  taskname = taskname ? {taskName: { [Op.like]: `%${taskname}%` }} : null;
  taskdatefrom = taskdatefrom ? {taskDate: { [Op.gte]: taskdatefrom }} : null;
  taskdateto = taskdateto ? {taskDate: { [Op.lte]: taskdateto }} : null;
  resource = resource ? {numberOfResource: { [Op.eq]: resource }} : null;
  round = round ? {numberOfRound: { [Op.eq]: round }} : null;
  completefrom = completefrom ? {percentOfComplete: { [Op.gte]: completefrom }} : null;
  completeto = completeto ? {percentOfComplete: { [Op.lte]: completeto }} : null;
  ECDfrom = ECDfrom ? {ECD: { [Op.gte]: ECDfrom }} : null;
  ECDto = ECDto ? {ECD: { [Op.lte]: ECDto }} : null;
  timespentfrom = timespentfrom ? {timeSpent: { [Op.gte]: timespentfrom }} : null;
  timespentto = timespentto ? {timeSpent: { [Op.lte]: timespentto }} : null;
  userid = userid ? {userId: { [Op.eq]: userid }} : null;
  tasktypeid = tasktypeid ? {tasktypeId: { [Op.eq]: tasktypeid }} : null;
  customerid = customerid ? {customerId: { [Op.eq]: customerid }} : null;
  taskstatusid = taskstatusid ? {taskstatusId: { [Op.eq]: taskstatusid }} : null;


  //var condition = { taskname, resource };
  Task.findAll({ 
    include: [{
      model: User,
      required: true
     },{
      model: TaskType,
      required: true
     },{
      model: TaskStatus,
      required: true
     },{
      model: Customer,
      required: true
     }],
    where: [{},
      taskname,
      taskdatefrom,
      taskdateto,
      resource,
      round,
      completefrom,
      completeto,
      ECDfrom,
      ECDto,
      timespentfrom,
      timespentto,
      userid,
      tasktypeid,
      customerid,
      taskstatusid,
    ],
    order: [
      ['id', 'DESC']
  ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
*/
// Find a single task with an id
exports.findOne = (req, res) => {
  console.log("*** start findOne req.params is here: ");
  console.log(req.params.id);
  const tId = req.params.id;
  let findById = {id: { [Op.eq]: tId }}
  Task.findAndCountAll({
    include: [{
      model: User,
      required: true
     },{
      model: TaskType,
      required: true
     },{
      model: TaskStatus,
      required: true
     },{
      model: Customer,
      required: true
     },{
      model: Platform,
      required: true
     }],
    where: [{},
      findById,
    ]
  }).then(data => {
    console.log(data.count);
    res.setHeader('content-range', data.count);
    console.log("**** findOne data: "+JSON.stringify(data.rows, null, 2));
    res.send(data.rows);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tasks."
    });
  });

  // Task.findByPk(id)
  //   .then(data => {
  //     console.log("/////////////////////////response data in task.findone"+JSON.stringify(data, null, 2));
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving Tutorial with id=" + id
  //     });
  //   });
};

// Update a task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: { success: true }
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  console.log("** Delete start here ... ");
  var filter = JSON.parse(req.query['filter']);
  console.log("filter is "+JSON.stringify(filter, null, 2));

  Task.destroy({
    where: filter 
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${filter}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete task with id=" + filter
      });
    });
};
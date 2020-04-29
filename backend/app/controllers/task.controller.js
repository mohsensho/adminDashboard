const db = require("../models");
const Task = db.task;
const User = db.user;
const TaskType = db.tasktype;
const TaskStatus = db.taskstatus;
const Customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.taskname) {
    res.status(400).send({
      message: "Task name can not be empty!"
    });
    return;
  }

  // Create a Task
  const taskValues = {
    taskName: req.body.taskname,
    taskDate: req.body.taskdate,
    numberOfResource: req.body.resourcenumber,
    numberOfRound: req.body.roundnumber,
    percentOfComplete: req.body.completepercent,
    ECD: req.body.ECD,
    timeSpent: req.body.timespent,
    userId: req.body.userid,
    tasktypeId: req.body.tasktypeid,
    customerId: req.body.customerid,
    taskstatusId: req.body.taskstatusid
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

// Find a single task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
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
          message: "Task was updated successfully."
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
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete task with id=" + id
      });
    });
};
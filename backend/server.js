const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');



var corsOptions = {
  origin: "http://localhost:3000",
};

//app.use(cors(corsOptions));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "X-Total-Count, content-range");
  next();
});


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Expose-Headers", "X-Total-Count, content-range");
//     next(); // make sure we go to the next routes and don't stop here
// });
app.set('etag', false);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Customers = db.customer;
const TaskTypes = db.tasktype;
const TaskStatus = db.taskstatus;
const TaskComments = db.taskcomments;
const TaskPlatform = db.taskplatform;
const TaskTable = db.task;

// db.sequelize.sync();
// initial();
/* Just for developing 
//force: true will drop the table if it already exists*/
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SW300 dashboard!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/task.routes')(app);
require('./app/routes/tasktype.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/taskstatus.routes')(app);
require('./app/routes/taskcomment.routes')(app);
require('./app/routes/taskplatform.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // role table initial records
  Role.create({
    name: "admin"
  });
  Role.create({
    name: "user"
  });

  // user table initial record
  User.create({
    username: "shojamo",
    email: "mohsen.shojaeifar@lamresearch.com",
    password: "$2a$08$gDmNSi.g9j2hA8CjPP3f.eMpFVl3Ef3Wq3kzvpE/YMPuZflHKlmv2"
  });
  User.create({
    username: "nasrinmo",
    email: "nasrin.mostajeran@lamresearch.com",
    password: "$2a$08$gDmNSi.g9j2hA8CjPP3f.eMpFVl3Ef3Wq3kzvpE/YMPuZflHKlmv2"
  });

 
  // Task types table initial records
  TaskTypes.create({
    tType: "Escalation"
  }); 
  TaskTypes.create({
    tType: "Release"
  });
  TaskTypes.create({
    tType: "Patch"
  });

  // Task status table initial records
  TaskStatus.create({
    tStatus: "In progress"
  }); 
  TaskStatus.create({
    tStatus: "On Hold"
  });
  TaskStatus.create({
    tStatus: "Completed"
  });

  // customers table initial records
  Customers.create({
    cName: "Intel"
  }); 
  Customers.create({
    cName: "Micron"
  });
  Customers.create({
    cName: "ROW"
  });
  Customers.create({
    cName: "TSMC"
  });
  Customers.create({
    cName: "Samsung"
  });

  // platform table initial records
  TaskPlatform.create({
    tPlatform: "2300 Dep"
  }); 
  TaskPlatform.create({
    tPlatform: "2300 ETCH"
  });
  TaskPlatform.create({
    tPlatform: "2300 Clean"
  });
  TaskPlatform.create({
    tPlatform: "C3 Altus"
  });
  TaskPlatform.create({
    tPlatform: "C3 EF"
  });

  // Comment table initial records
  TaskComments.create({
    tComments: "Comment 1"
  }); 
  TaskComments.create({
    tComments: "Comment 2"
  });
  TaskTable.create({
    taskName: 'task 1',
    taskDate: '2020-05-03 04:03:10',
    numberOfResource: 2,
    numberOfRound: 2,
    percentOfComplete: 55,
    ECD: '2020-05-03 04:03:10',
    timeSpent: 2,
    createdAt: '2020-05-03 04:03:10',
    updatedAt: '2020-05-03 04:03:10',
    userId: 1,
    tasktypeId: 1,
    customerId: 1,
    taskstatusId: 1,
    taskComments: "Comment 1",
    taskPlatformId: 1
  });
  TaskTable.create({
    taskName: 'task 2',
    taskDate: '2021-05-03 04:03:10',
    numberOfResource: 3,
    numberOfRound: 3,
    percentOfComplete: 65,
    ECD: '2022-05-03 04:03:10',
    timeSpent: 3,
    createdAt: '2020-05-03 04:03:10',
    updatedAt: '2020-05-03 04:03:10',
    userId: 2,
    tasktypeId: 2,
    customerId: 2,
    taskstatusId: 2,
    taskComments: "Comment 2",
    taskPlatformId: 2
  });
  TaskTable.create({
    taskName: 'task 22',
    taskDate: '2023-05-03 04:03:10',
    numberOfResource: 4,
    numberOfRound: 4,
    percentOfComplete: 75,
    ECD: '2024-05-03 04:03:10',
    timeSpent: 4,
    createdAt: '2020-05-03 04:03:10',
    updatedAt: '2020-05-03 04:03:10',
    userId: 1,
    tasktypeId: 3,
    customerId: 3,
    taskstatusId: 3,
    taskComments: "Comment 3",
    taskPlatformId: 3
  });
}
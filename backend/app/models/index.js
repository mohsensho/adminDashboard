const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.taskstatus = require("../models/taskstatus.model.js")(sequelize, Sequelize);
db.tasktype = require("../models/tasktype.model.js")(sequelize, Sequelize);
db.taskarchive = require("../models/taskarchive.model.js")(sequelize, Sequelize);
db.taskplatform = require("../models/taskplatform.model.js")(sequelize, Sequelize);
db.taskcomments = require("./taskcomments.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
// Set foreign key to task table
db.user.hasMany(db.task); 
db.task.belongsTo(db.user);

db.tasktype.hasMany(db.task); 
db.task.belongsTo(db.tasktype);

db.customer.hasMany(db.task); 
db.task.belongsTo(db.customer);

db.taskstatus.hasMany(db.task); 
db.task.belongsTo(db.taskstatus);

db.taskcomments.hasMany(db.task); 
db.task.belongsTo(db.taskcomments);

db.taskplatform.hasMany(db.task); 
db.task.belongsTo(db.taskplatform);

// set foreign key to archive task table
db.tasktype.hasMany(db.taskarchive); 
db.taskarchive.belongsTo(db.tasktype);

db.customer.hasMany(db.taskarchive);  
db.taskarchive.belongsTo(db.customer);

db.taskstatus.hasMany(db.taskarchive); 
db.taskarchive.belongsTo(db.taskstatus);

db.task.hasMany(db.taskarchive);  
db.taskarchive.belongsTo(db.task);

db.taskcomments.hasMany(db.taskarchive); 
db.taskarchive.belongsTo(db.taskcomments);

db.taskplatform.hasMany(db.taskarchive); 
db.taskarchive.belongsTo(db.taskplatform);

/*
db.ROLES = ["user", "admin", "moderator"];
*/
db.ROLES = ["user", "admin"];
module.exports = db;

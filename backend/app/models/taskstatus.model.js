module.exports = (sequelize, Sequelize) => {
    const TaskStatus = sequelize.define("taskstatus", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tStatus: {
        type: Sequelize.STRING
      }
    });
  
    return TaskStatus;
  };
  
module.exports = (sequelize, Sequelize) => {
    const TaskType = sequelize.define("tasktype", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tType: {
        type: Sequelize.STRING
      }
    });
  
    return TaskType;
  };
  
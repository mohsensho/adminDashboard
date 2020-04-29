module.exports = (sequelize, Sequelize) => {
    const taskPlatform = sequelize.define("taskPlatform", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tPlatform: {
        type: Sequelize.STRING
      }
    });
  
    return taskPlatform;
  };
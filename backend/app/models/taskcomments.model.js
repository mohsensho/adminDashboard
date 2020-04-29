module.exports = (sequelize, Sequelize) => {
    const taskComments = sequelize.define("taskComments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tComments: {
        type: Sequelize.STRING
      }
    });
  
    return taskComments;
  };
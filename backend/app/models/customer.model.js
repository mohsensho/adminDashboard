module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cName: {
        type: Sequelize.STRING
      }
    });
  
    return Customer;
  };
  
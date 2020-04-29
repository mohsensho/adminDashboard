module.exports = (sequelize, Sequelize) => {
    const TaskArchiveTable = sequelize.define("taskarchivetable",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taskName: {
            type: Sequelize.STRING
        },
        taskDate: {
            type: Sequelize.DATE
        },
        numberOfResource: {
            type: Sequelize.INTEGER
        },
        numberOfRound: {
            type: Sequelize.INTEGER
        },
        percentOfComplete: {
            type: Sequelize.INTEGER
        },
        ECD: {
            type: Sequelize.DATE
        },
        timeSpent: {
            type: Sequelize.INTEGER
        }

     });
    
    return TaskArchiveTable;
};



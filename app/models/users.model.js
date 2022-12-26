module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        userId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        emailId: {
            type: Sequelize.STRING
        }
    });
  
    return Users;
  };
  
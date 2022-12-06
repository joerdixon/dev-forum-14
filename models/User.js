// Extract our model object and datatypes from the sequelize package.
const {Model, DataTypes} = require("sequelize");
// Import our sequelize instance
const sequelize = require("../config/connection");
// Require bcrypt
const bcrypt = require("bcrypt");

// Create User from Model
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// Define the User tables for our database.
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
}, {
    // Before each new user is created.
    hooks: {
        beforeCreate: userObj => {
            // Hash (encrypt) a new users password with 5 rounds of salt.
            userObj.password = bcrypt.hashSync(userObj.password, 5);
            return userObj;
        }
    },
    sequelize
})

module.exports = User;
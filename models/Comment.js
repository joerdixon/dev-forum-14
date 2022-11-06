// Extract our model object and datatypes from the sequelize package.
const {Model, DataTypes} = require("sequelize");
// Import our sequelize instance
const sequelize = require("../config/connection");

// Create Comment from Model
class Comment extends Model {}

// Define the Comment tables for our database.
Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize
})

module.exports = Comment;
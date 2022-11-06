// Extract our model object and datatypes from the sequelize package.
const {Model, DataTypes} = require("sequelize");
// Import our sequelize instance
const sequelize = require("../config/connection");

// Create Post from Model
class Post extends Model {}

// Define the Post tables for our database.
Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize
})

module.exports = Post;
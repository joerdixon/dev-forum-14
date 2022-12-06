// Extract our model object and datatypes from the sequelize package.
const { Model, DataTypes } = require("sequelize");
// Import our sequelize instance
const sequelize = require("../config/connection");

// Create Comment from Model
class Comment extends Model { }

// Define the Comment tables for our database.
Comment.init({
    // Comments will have text content
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "users",
            key: "id",
        },
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "blog",
            key: "id",
        },
    },
}, {
    sequelize
})

module.exports = Comment;
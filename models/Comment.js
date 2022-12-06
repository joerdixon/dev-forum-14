// Extract our model object and datatypes from the sequelize package.
const { Model, DataTypes } = require("sequelize");
// Import our sequelize instance
const sequelize = require("../config/connection");
const moment = require("moment");

// Create Comment from Model
class Comment extends Model { }

// Define the Comment tables for our database.
Comment.init({
    // Comments will have text content
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,                 
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
    },
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
        }
    }
},{
    sequelize
})

module.exports = Comment;
// Require all of our models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Users can have many posts.
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Users can have many comments.
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "CASCADE",

});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Posts can also have many comments.
Post.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: "CASCADE",

});

Comment.belongsTo(Post, {
    foreignKey: 'blog_id'
});

// Export our models for use in other files.
module.exports={
    User,
    Post,
    Comment
}
// Require all of our models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Users can have many posts.
User.hasMany(Post, {
    onDelete: "CASCADE"
});
Post.belongsTo(User);

// Users can have many comments.
User.hasMany(Comment, {
    onDelete: "CASCADE"
});
Comment.belongsTo(User);

// Posts can also have many comments.
Post.hasMany(Comment, {
    onDelete: "CASCADE"
});
Comment.belongsTo(Post);

// Export our models for use in other files.
module.exports={
    User,
    Post,
    Comment
}
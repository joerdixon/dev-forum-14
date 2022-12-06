// Create express router.
const router = require("express").Router();
// Require our models
const {User, Post, Comment} = require('../models');

// See all posts with users + comments
router.get("/", (req, res) => {
    Post.findAll({
        include: [User, Comment]
    }).then(postData => {
        // Respond
        res.json(postData);
    }).catch(err => {
        res.status(500).json({msg: "Error", err})
    })
})

module.exports=router;
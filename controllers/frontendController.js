const router = require("express").Router();
const { User, Post, Comment } = require("../models")

// Serves the homepage with post and comments
router.get("/", (req, res) => {
    // Get all posts
    Post.findAll().then(allPosts => {
        // Serialize the posts
        const posts = allPosts.map(post => post.get({plain: true}))
        console.log(posts.Comments)
        res.render("home", {userInfo:req.session.userInfo, posts:posts});
    })
})

// Serves the dashboard with the current users posts and comments
router.get("/dashboard", (req, res) => {
    // If they are not logged in redirect to the login page.
    if(!req.session.userInfo){
        return res.redirect("/login")
    }
    // Find their data in the database searching by id.
    User.findByPk(req.session.userInfo.id,{
        // Attach posts and comments
        include:[Post, Comment]
    }).then(userInfo=>{
        // Serialize the data.
        const plainData = userInfo.get({plain:true})
        console.log(plainData);
        // Serve our profile template with the serialized data inserted.
       res.render("dashboard", {plainData:plainData});
    }).catch(err=>{
        res.status(500).json({msg:"error occurred",err})
    })  
})

// Serves the login page where users can log in.
router.get("/login", (req, res) => {
    res.render("login")
})

// User Signup
router.get("/signup", (req, res) => {
    res.render("signup")
})

module.exports=router;
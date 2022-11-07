const router = require("express").Router();
const { User, Post, Comment } = require("../models")

// Serves the homepage with post and comments
router.get("/", (req, res) => {
    res.render("home");
})

// TODO: currently seems like the req.session data is not making it to this route.

// Serves the dashboard with the current users posts and comments
router.get("/dashboard", (req, res) => {
    console.log(req.session)
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
        // Serve our profile template with the serialized data inserted.
       res.render("dashboard",plainData);
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

// Ends the session
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
      })
})

module.exports=router;
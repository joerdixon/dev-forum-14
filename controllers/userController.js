// Create express router.
const router = require("express").Router();
const {User, Post, Comment} = require('../models');
const bcrypt = require("bcrypt")

// All Accounts + Posts and Comments
router.get("/",(req,res)=>{
    // Find all users, include their posts and comments in the response
    User.findAll({
        include:[Post, Comment]
    }).then(userData=>{
        // Respond
        res.json(userData)
    }).catch(err=>{
        // Error
        res.status(500).json({msg:"an error occurred",err})
    })
})

// Login
router.post("/login",(req,res)=>{
    // If the username entered exists find the account.
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        //If the username is wrong, send generic fail message
        if(!foundUser){
            return res.status(401).json({msg:"Invalid login credentials"})
        } 
        //Compare the entered password with the decrypted version, if they do not match send generic fail message.
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"Invalid login credentials"})
        }
        // If both fields match, add their username and id to the session memory.
        req.session.userInfo = {
            username:foundUser.username,
            id:foundUser.id
        }
        // Send back their information.
        res.json(foundUser);
    })
})

// Export the router for use in main router file.
module.exports = router;
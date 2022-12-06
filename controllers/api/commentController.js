const router = require("express").Router();
const { User, Post, Comment } = require("../models")

// Get all comments
router.get('/', async(req,res)=>{
    try{
        const comment = await Comment.findAll();
        res.json(comment);
    }catch(err){
        res.json({message:err.message})
    }
});

// Get one comment
router.get('/:id', async(req,res)=>{
    try{
        const comments = await Comment.findByPk(req.params.id);
        res.json(comments);
    }catch(err){
        res.json({message:err.message})
    }
})

// Create a new comment
router.post('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be logged in to comment."})
    }
    try{
        const newcomment = await Comment.create({
            body:req.body.body,
            UserId: req.session.activeUser.id,
            PostId: req.params.id
        });
        res.json(newcomment);
    }catch(err){
        res.json({message:err.message})
    }
})

// Delete a comment
router.delete('/:id', async(req,res)=>{
    try{
        const delData = await Comment.destroy({where:{id:req.params.id}})
        res.json(delData)
    }catch(err){
        res.json({message:err.message})
    }
})

// Export the router for use in main router file.
module.exports = router;
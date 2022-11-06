// Create express router
const router = require("express").Router();

// Import our model controllers
const userRoutes = require("./userController");
// const postRoutes = require("./postController");
// const commentRoutes = require("./commentController");

// Route the appropriate urls to the appropriate controllers
router.use("/users", userRoutes);
// router.use("/posts", postRoutes);
// router.use("/comments", commentRoutes);

router.get("/sess", (req, res) => {
    res.json(req.session)
})

// Export the router for use in the main server file.
module.exports=router;
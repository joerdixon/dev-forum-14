// Create express router
const router = require("express").Router();

// Import our model controllers
const userRoutes = require("./userController");
const postRoutes = require("./postController");
const commentRoutes = require("./commentController");
const frontendRoutes = require("./frontendController");

// Route the appropriate urls to the appropriate controllers
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use(frontendRoutes);

// Root route to see the session data
router.get("/sess", (req, res) => {
    console.log(req.session);
    res.json(req.session)
})

// Export the router for use in the main server file.
module.exports=router;
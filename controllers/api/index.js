const router = require('express').Router();
const userRoutes = require('./userController');
const postRoutes = require('./postController');
const commentRoutes = require('./commentController');


router.use('/users', userRoutes);
router.use('/blogs', postRoutes);
router.use('/comments', commentRoutes);



module.exports = router;
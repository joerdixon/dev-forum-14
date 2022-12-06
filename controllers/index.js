const router = require('express').Router();
// Import our API routes
const apiRoutes = require('./api');
const frontEndController = require("./frontEndController")

router.use('/api', apiRoutes);
router.use(frontEndController);

module.exports = router;
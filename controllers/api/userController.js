// Create express router.
const router = require("express").Router();
// Require our models.
const { User, Post, Comment } = require('../models');

// All Accounts + Posts and Comments
router.get("/", (req, res) => {
    console.log(req.session);
    // Find all users, include their posts and comments in the response
    User.findAll({
        include: [Post, Comment]
    }).then(userData => {
        // Respond
        res.json(userData)
    }).catch(err => {
        // Error
        res.status(500).json({ msg: "an error occurred", err })
    })
})

// Login Route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Logged In!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//create user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;
            res.status(200).json(userData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

// Logout user.
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// Export the router for use in main router file.
module.exports = router;


// Create express router.
const router = require("express").Router();
// Require our models
const { User, Post, Comment } = require('../models');

// See all posts with users + comments
router.get("/", (req, res) => {
    Post.findAll({
        include: [User, Comment]
    }).then(postData => {
        // Respond
        res.json(postData);
    }).catch(err => {
        res.status(500).json({ msg: "Error", err })
    })
})

// Get one post
router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: Comment
    })
        .then((post) => {
            res.json(post)
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ err: err })
        })
})

router.post('/', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(401).json({ msg: "You must be logged in to make a post" })
    }
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"You must be logged in to make a post"})
    }
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No Post Found' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
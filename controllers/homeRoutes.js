const router = require('express').Router(); //route: '/' 
const { Post, User } = require('../models'); //models
const withAuth = require('../utils/auth'); //helper

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })
      .then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
          posts,
          logged_in: req.session.logged_in,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
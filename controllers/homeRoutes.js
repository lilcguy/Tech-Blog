const router = require('express').Router(); //route: '/' 
const { Post, User, Comment} = require('../models'); //models
const withAuth = require('../utils/auth'); //helper

//get all posts
router.get('/', (req, res) => {
    Post.findAll({ include: {all: true}})
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

  //get one post


  //dashboard, use withAuth to prevent access
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // /login

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login'); //sends to handlebars
  });



module.exports = router;
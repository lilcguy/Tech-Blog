const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

// /api/comments endpoint

router.get('/', (req, res) => {
    Comment.findAll({include: {all: true}}).then((comments) => {
        res.json(comments);
    });
});

//post route will need user_id: req.session.user_id
//needs to get the current post_id somehow. maybe from the browser url?


// router.post('/', async (req, res) => {
//     try {
//         const newComment = await Comment.create({
//             ...req.body,
//             user_id: req.session.user_id,
//             post_id: req.params.id
//         });
//         res.redirect(`/posts/${req.params.id}`); //redirect to same post.
//     } catch (err) {
//             res.status(500).json(err);
    
//         }
    

// });

router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        user_id: req.session.user_id,
       
        ...req.body,
       
        

      });

      console.log(newComment);
  
      res.redirect(req.originalUrl); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create new comment' });
    }
  });







module.exports = router;
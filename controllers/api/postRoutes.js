// /api/posts endpoint. 

const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment'); 

const withAuth = require('../../utils/auth');

//get all posts, include their user & comment data
router.get('/', (req, res) => {
    Post.findAll({ include: {all: true}}).then((posts) => {
        res.json(posts);
    });
});

//get 1 post, include their user data
router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {include: {all: true}}).then((post) => {
        res.json(post);
    });
});

//create new post
//req.body = title, contents, user_id
// router.post('/', (req, res) => {
//     Post.create(req.body).then((newPost) => {
        
//         res.json(newPost);
//     });
// });

router.post('/', async (req, res) => {
    try {
      const newPostData = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.redirect('/dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete a post
// router.delete('/:id', (req, res) => {
//     Post.destroy({where: {id: req.params.id}}).then(
//         res.json("Destroyed post.")
        
//         );
// });
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment] // include the associated Comment models
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Delete all associated Comment models first
    await Comment.destroy({ where: { post_id: req.params.id } });
    // Then delete the Post model
    await post.destroy();
    res.json({ message: 'Post and associated comments deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
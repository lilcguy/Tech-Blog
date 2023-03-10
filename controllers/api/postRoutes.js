// /api/posts endpoint. 

const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment'); 

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
router.post('/', (req, res) => {
    Post.create(req.body).then((newPost) => {
        res.json(newPost);
    });
});

//delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({where: {id: req.params.id}}).then((res.json("Destroyed post.")));
});


module.exports = router;
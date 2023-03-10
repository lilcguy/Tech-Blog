const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');



router.get('/', (req, res) => {
    Comment.findAll({include: {all: true}}).then((comments) => {
        res.json(comments);
    });
});

//post route will need user_id: req.session.user_id

//needs to get the current post_id somehow. maybe from the browser url?







module.exports = router;
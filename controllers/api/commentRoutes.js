const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');



router.get('/', (req, res) => {
    Comment.findAll({include: {all: true}}).then((comments) => {
        res.json(comments);
    });
});









module.exports = router;
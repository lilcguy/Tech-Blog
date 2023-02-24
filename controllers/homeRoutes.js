const router = require('express').Router(); //route: '/' 
const { Post, User } = require('../models'); //models
const withAuth = require('../utils/auth'); //helper

//get all posts
router.get('/')

module.exports = router;
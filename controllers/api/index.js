//see challenge 13 /api/index.js for reference on this

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
//const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
//router.use('/comments', commentRoutes);

module.exports = router;
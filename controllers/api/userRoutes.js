// /api/users endpoint

const router = require('express').Router();
const User = require('../../models/User');

//get all users
router.get('/', (req, res) => {
    User.findAll().then((users) => {
        res.json(users);
    });
});

//get one user
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        res.json(user);
    });
});

//add new user
//req.body = name, email, password
router.post('/', (req, res) => {
    User.create(req.body).then((newUser) => {
        res.json(newUser);
    });
});

//delete user
router.delete('/:id', (req, res) => {
    User.destroy({where: {id: req.params.id} }).then((res.json("Destroyed user.")));
});


module.exports = router;

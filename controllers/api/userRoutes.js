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

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;

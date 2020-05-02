const router = require('express').Router();

const bcrypt = require('bcrypt');

const Users = require('./user-model.js');


const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json({new: newUser.username});
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(201).json({ message: `Welcome ${user.username}!`, jwt_token: token});
      } else res.status(401).json({ message: 'invalid credentials' });
    })
    .catch(err => res.status(500).json(err));
});

const generateToken = (user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = secrets.jwt_secret;

  const options = {
    expiresIn: '30min'
  };

  return jwt.sign(payload, secret, options);
})  

module.exports = router;

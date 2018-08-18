const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(account) {
  return jwt.sign({account}, config.JWT_SECRET, {
    subject: account.email,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  const userfirstname = req.user.firstname;
  res.json({authToken, userfirstname});
});

const jwtAuth = passport.authenticate('jwt', {session: false});
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
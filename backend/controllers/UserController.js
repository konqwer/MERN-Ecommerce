const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const createToken = id => jwt.sign({ id }, process.env.SECRET);

exports.postSignup = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Incorrect email')
    .custom(async value => {
      return await User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Passport must be at least 6 symbols'),
  (req, res, next) => {
    const errors = validationResult(req).errors;
    console.log(errors);
    if (errors.length) {
      throw Error(errors[0].msg);
    }
    const { email, password } = req.body;
    bcrypt
      .hash(password, 10)
      .then(password => {
        return User.create({
          email,
          password
        });
      })
      .then(user => res.json({ token: createToken(user._id) }))
      .catch(next);
  }
];

exports.postLogin = [
  body('password').trim(),
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Incorrect email'),
  (req, res, next) => {
    const errors = validationResult(req).errors;
    if (errors.length) {
      throw Error(errors[0].msg);
    }
    const { email, password } = req.body;
    let fixeduser;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          throw Error('No user found');
        }
        fixeduser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(passwordMatch => {
        if (!passwordMatch) {
          throw Error('Wrong password');
        }
        res.json({ token: createToken(fixeduser._id) });
      })
      .catch(next);
  }
];

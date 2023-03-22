const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw Error('No token');
  }

  let decoded;
  try {
    const token = authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    next(Error('Not authorized'));
  }
  User.findById(decoded.id)
    .select('-password')
    .select('-__v')
    .then(user => {
      if (!user) throw Error('No user found');
      req.user = user;
      next();
    })
    .catch(next);
};

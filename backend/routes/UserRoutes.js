const express = require('express');
const User = require('../models/UserModel');

const { body } = require('express-validator');
const { postSignup, postLogin } = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/', requireAuth, (req, res) => res.json(req.user));

module.exports = router;

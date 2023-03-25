const express = require('express');

const {
  postSignup,
  postLogin,
  patchCart,
  resetCart
} = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.post('/cart/reset', requireAuth, resetCart);
router.patch('/cart/:productId', requireAuth, patchCart);
router.get('/', requireAuth, (req, res) => res.json(req.user));

module.exports = router;

const express = require('express');
const {
  postProduct,
  getProduct,
  getProducts
} = require('../controllers/ProductsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', requireAuth, postProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);

module.exports = router;

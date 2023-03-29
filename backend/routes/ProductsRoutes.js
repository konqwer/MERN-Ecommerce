const express = require('express');
const {
  postProduct,
  getProduct,
  getProducts,
  getMyProducts
} = require('../controllers/ProductsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', requireAuth, postProduct);
router.get('/', getProducts);
router.get('/my', requireAuth, getMyProducts);
router.get('/:productId', getProduct);

module.exports = router;

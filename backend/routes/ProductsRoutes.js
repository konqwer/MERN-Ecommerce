const express = require('express');
const {
  postProduct,
  getProduct,
  getProducts,
  getMyProducts,
  deleteProduct,
  patchProduct
} = require('../controllers/ProductsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', requireAuth, postProduct);
router.get('/', getProducts);
router.get('/my', requireAuth, getMyProducts);
router.get('/:productId', getProduct);
router.delete('/:productId', requireAuth, deleteProduct);
router.patch('/:productId', requireAuth, patchProduct);

module.exports = router;

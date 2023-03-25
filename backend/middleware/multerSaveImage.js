const multer = require('multer');
const path = require('path');
const Product = require('../models/ProductModel');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  req.body.price = +req.body.price;
  const { name, price, description } = req.body;
  if (
    !name ||
    !price ||
    !description ||
    typeof price !== 'number' ||
    price < 1
  ) {
    cb(Error('Invalid data'));
  }
  Product.findOne({ name })
    .then(product => {
      if (product) {
        throw Error('Product with this name already exists');
      }
      const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedFileTypes.includes(file.mimetype)) {
        throw Error('Invalid image');
      }
      cb(null, true);
    })
    .catch(cb);
};

module.exports = multer({ storage, fileFilter }).single('image');

const multer = require('multer');
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
  if (!name || !price || !description || typeof price !== 'number') {
    return cb(Error('Invalid data'));
  }
  if (name.length > 24) {
    return cb(Error('Name length must be less than 24 symbols'));
  }
  if (price > 100000 || price < 1) {
    return cb(Error('Price must be less than 100.000 and more than 1'));
  }
  if (description.length > 1000) {
    return cb(Error('Description length must be less than 1000 symbols'));
  }
  Product.findOne({ name })
    .then(product => {
      if (
        product &&
        (!req.params.productId ||
          req.params.productId !== product._id.toString())
      ) {
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

const Product = require('../models/ProductModel');
const fs = require('fs');
//const multerPatch = require('../middleware/multerPatch');
const multerSave = require('../middleware/multerSave');

const getProducts = (req, res, next) => {
  const page = req.query.page || 1;
  const perpage = req.query.perpage || 10;

  let products;
  Product.find()
    .skip((page - 1) * perpage)
    .limit(perpage)
    .select('-description')
    .then(tempproducts => {
      products = tempproducts;
      return Product.count();
    })
    .then(count => res.json({ products, maxPages: Math.ceil(count / perpage) }))
    .catch(next);
};
const getMyProducts = (req, res, next) => {
  const page = req.query.page || 1;
  const perpage = req.query.perpage || 10;

  let products;
  Product.find({ user: req.user._id })
    .skip((page - 1) * perpage)
    .limit(perpage)
    .select('-description')
    .then(tempproducts => {
      products = tempproducts;
      return Product.count();
    })
    .then(count => res.json({ products, maxPages: Math.ceil(count / perpage) }))
    .catch(next);
};
const getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        throw Error('No product found');
      }
      res.json(product);
    })
    .catch(next);
};
const deleteProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        throw Error('No product found');
      }
      if (product.user.toString() !== req.user._id.toString()) {
        throw Error('No permission');
      }
      return Product.findByIdAndDelete(req.params.productId);
    })
    .then(product => {
      fs.unlinkSync(process.cwd() + '/public/images/' + product.image);
      if (err) {
        return next(err);
      }
      res.json(product);
    })
    .catch(next);
};
const patchProduct = [
  (req, res, next) => {
    Product.findById(req.params.productId).then(product => {
      if (!product) {
        return next('No product found');
      }
      if (product.user.toString() !== req.user._id.toString()) {
        return next('No permission');
      }
      next();
    });
  },
  (req, res, next) => {
    multerSave(req, res, next, err => {
      if (err) {
        return next(err);
      }
    });
  },
  (req, res, next) => {
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    const { name, price, description } = req.body;
    console.log(price);
    Product.findById(req.params.productId)
      .then(product => {
        if (image) {
          fs.unlinkSync(process.cwd() + '/public/images/' + product.image);
          image && (product.image = image);
        }
        product.name = name;
        product.price = parseFloat(price).toFixed(2);
        product.description = description;
        return product.save();
      })
      .then(product => res.json(product))
      .catch(next);
  }
];

const postProduct = [
  (req, res, next) => {
    multerSave(req, res, next, err => {
      if (err) {
        return next(err);
      }
    });
  },
  (req, res, next) => {
    if (!req.file) {
      throw Error('No image uploaded');
    }

    const { name, price, description } = req.body;
    const image = req.file.filename;

    Product.create({
      name,
      image,
      price: price.toFixed(2),
      user: req.user._id,
      description: description
    })
      .then(product => res.json(product))
      .catch(next);
  }
];

module.exports = {
  getProduct,
  getProducts,
  postProduct,
  getMyProducts,
  deleteProduct,
  patchProduct
};

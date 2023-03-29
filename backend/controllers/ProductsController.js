const path = require('path');
const Product = require('../models/ProductModel');
const multer = require('multer');
const multerSaveImage = require('../middleware/multerSaveImage');

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

  console.log(req.user);
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
const postProduct = [
  (req, res, next) => {
    multerSaveImage(req, res, next, err => {
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
      description: description || null
    })
      .then(product => res.json(product))
      .catch(next);
  }
];

module.exports = { getProduct, getProducts, postProduct, getMyProducts };

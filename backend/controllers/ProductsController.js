const Product = require('../models/ProductModel');
const fs = require('fs');
const multer = require('multer');
const multerSave = require('../middleware/multerSave');

exports.getProducts = (req, res, next) => {
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
exports.getMyProducts = (req, res, next) => {
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
exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        throw Error('No product found');
      }
      res.json(product);
    })
    .catch(next);
};
exports.deleteProduct = (req, res, next) => {
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
      fs.unlink(process.cwd() + '/public/images/' + product.image, () => {});
      res.json(product);
    })
    .catch(next);
};
exports.patchProduct = [
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
    req.body.price = +req.body.price;
    const { name, price, description } = req.body;
    if (req.file) {
      image = req.file.filename;
    } else {
      // (if multer middleware was skipped and data hasn't been valuidated)
      if (!name || !price || !description || typeof price !== 'number') {
        throw Error('Invalid data');
      }
      if (name.length > 24) {
        throw Error('Name length must be less than 24 symbols');
      }
      if (price > 100000 || price < 1) {
        throw Error('Price must be less than 100.000 and more than 1');
      }
      if (description.length > 1000) {
        throw Error('Description length must be less than 1000 symbols');
      }
      Product.findOne({ name })
        .then(product => {
          if (product && req.params.productId !== product._id.toString()) {
            throw Error('Product with this name already exists');
          }
        })
        .catch(next);
    }
    Product.findById(req.params.productId)
      .then(product => {
        if (image) {
          fs.unlink(
            process.cwd() + '/public/images/' + product.image,
            () => {}
          );
          image && (product.image = image);
        }
        product.name = name;
        product.price = price.toFixed(2);
        product.description = description;
        return product.save();
      })
      .then(product => res.json(product))
      .catch(next);
  }
];

exports.postProduct = [
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

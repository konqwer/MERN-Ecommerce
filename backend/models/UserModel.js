const mongoose = require('mongoose');
const Product = require('../models/ProductModel');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    total: {
      type: Number,
      required: true
    }
  }
});

userSchema.methods.patchCart = function (addedProductId, quantity = 1) {
  // checking if product exists
  let product;
  return Product.findById(addedProductId).then(product => {
    if (!product) {
      throw Error("Product with this id doesn't exist");
    }

    // checking if this product exists in cart
    const existingProductIdx = this.cart.items.findIndex(
      cp => cp.productId.toString() === addedProductId
    );

    if (existingProductIdx < 0) {
      if (quantity < 1) {
        /// if we want to delete product that doesn't exist
        throw Error("Product doesn't exist in your cart to delete it");
      } else {
        ///if we want to add product that doesn't exist
        this.cart.items.push({
          productId: new mongoose.Types.ObjectId(addedProductId),
          quantity
        });
      }
    } else {
      // if product already exists

      //if we want to decrement more than current quantity (delete it)
      if (
        quantity < 0 &&
        quantity * -1 >= this.cart.items[existingProductIdx].quantity
      ) {
        this.cart.total = (
          this.cart.total -
          product.price * this.cart.items[existingProductIdx].quantity
        ).toFixed(2);
        this.cart.items.splice(existingProductIdx, 1);
        return this.save();
      }

      //just add quantity
      this.cart.items[existingProductIdx].quantity += quantity;
    }

    this.cart.total = (this.cart.total + product.price * quantity).toFixed(2);
    return this.save();
  });
};

userSchema.methods.resetCart = function () {
  this.cart = { items: [], total: 0 };
  return this.save();
};

userSchema.methods.getCart = function () {
  // populating items
  const promises = this.cart.items.map(item =>
    Product.findById(item.productId).then(product => {
      if (product) {
        const { quantity } = item;
        return { product, quantity };
      }
    })
  );
  let items;
  return Promise.all(promises)
    .then(tempitems => {
      // extracting only existing products
      items = tempitems.filter(item => item);

      // saving to user
      this.cart.items = items.map(item => {
        return { productId: item.product._id, quantity: item.quantity };
      });
      this.cart.total = items.reduce(
        (prevValue, item) => prevValue + item.product.price * item.quantity,
        0
      );
      return this.save();
    })
    .then(user => {
      return { items, total: user.cart.total };
    });
};

module.exports = mongoose.model('User', userSchema);

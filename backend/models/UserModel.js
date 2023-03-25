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

userSchema.methods.patchCart = async function (addedProductId, quantity = 1) {
  // checking if product exists
  let product;
  try {
    product = await Product.findById(addedProductId);
  } catch (err) {
    throw Error("Product with this id doesn't exist");
  }
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
      return await this.save();
    }

    //just add quantity
    this.cart.items[existingProductIdx].quantity += quantity;
  }

  this.cart.total = (this.cart.total + product.price * quantity).toFixed(2);
  return await this.save();
};

userSchema.methods.resetCart = async function () {
  this.cart = { items: [], total: 0 };
  return await this.save();
};

module.exports = mongoose.model('User', userSchema);

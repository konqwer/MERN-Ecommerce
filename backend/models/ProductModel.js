const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

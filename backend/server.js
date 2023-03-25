require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const ProductsRoutes = require('./routes/ProductsRoutes');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: '*' }));

// routes
app.use('/api/user', UserRoutes);
app.use('/api/products', ProductsRoutes);

// Error middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 400).json({ message: err.message });
  console.log(err);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });

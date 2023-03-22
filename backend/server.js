require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// routes
app.use('/api/user', UserRoutes);

// Error middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 400).json({ message: err.message });
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

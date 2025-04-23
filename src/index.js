require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./presentation/controllers/AuthController');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(process.env.PORT || 5000, () => console.log('Serveur lancé'));
  })
  .catch(err => console.error(err));
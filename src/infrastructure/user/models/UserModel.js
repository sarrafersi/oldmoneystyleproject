const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['client', 'admin'] }, 

  resetToken: String,
  resetTokenExpire: Date
});

module.exports = mongoose.model('User', userSchema);
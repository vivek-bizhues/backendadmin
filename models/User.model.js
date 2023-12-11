const mongoose = require('mongoose');


// Define mongoose schema and model for users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
  });

  const User = mongoose.model('User', userSchema);


  module.exports = User;


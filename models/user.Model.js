// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // token:{
  //   type: String,
  //   required: false,
  // }
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

// Export the User model
module.exports = UserModel;

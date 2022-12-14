const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: Sting,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  about: {
    type: Sting,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  avatar: {
    type: Sting,
    required: true
  }
});
const userModel = mongoose.model('user', userSchema);

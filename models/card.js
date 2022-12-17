const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: [{
    type: [{type: String}],
    default:[]
  }],
  createdAt: {
    type: Date,

  }
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
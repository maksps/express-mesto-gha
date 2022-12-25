const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
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
  owner:{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
  },
  likes:
    [
      {type: Schema.Types.ObjectId}
    ],


  createdAt: {
    type: Date,
    default: Date.now
  }
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
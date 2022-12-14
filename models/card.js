const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  // name: {
  //   type: Sting,
  //   required: true,
  //   minLength: 2,
  //   maxLength: 30
  // },
  // link: {
  //   type: Sting,
  //   required: true,
  // },
  // owner: {
  //   type: ObjectId,
  //   required: true
  // },
  // likes: [{
  //   type: [{tupe: String}],
  //   default:[]
  // }],
  // createdAt: {
  //   type: Date,

  // }
});

const cardModel = mongoose.model('user', cardSchema);
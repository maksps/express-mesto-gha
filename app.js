const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');

const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.json());
app.use('/users', router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
});

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}, () => {
  console.log('conected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '639e11177c7c8b54f426dcf6' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', cards);
app.use('/', users);




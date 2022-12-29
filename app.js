const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('conected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '639e11177c7c8b54f426dcf6',
  };

  next();
});
app.use('/', cards);
app.use('/', users);
app.use('*', (req, res) => res.status(404).json({ message: 'Неверный URL' }));

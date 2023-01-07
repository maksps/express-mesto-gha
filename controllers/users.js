const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(401).json({ message: 'Неправильный пароль или логин' });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ message: 'Неправильный пароль или логин' });
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    return res.status(200).json({ jwt: token });
  } catch (e) {
    return res.status(500).json({ message: 'На сервере произошла ошибка', error: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: 'На сервере произошла ошибка', error: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'переданы некорректный запрос', error: e.message });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return res.status(201).json({ user });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: 'переданы некорректные данные в методы создания пользователя', error: e.message });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка', error: e });
  }
};

const updateUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      body,
      { new: true, runValidators: true },
    );
    if (user === null) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.status(200).json({ user });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: 'переданы некорректные данные в методы создания пользователя', error: e.message });
    }
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (user === null) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar, login,
};

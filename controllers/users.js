const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'произошла ошибка!' });
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
    console.error(e);
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'переданы некорректный запрос', error: e.message });
    }
    return res.status(500).json({ message: 'произошла ошибка!' });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: 'переданы некорректные данные в методы создания пользователя', error: e.message });
    }
    return res.status(500).json({ message: 'произошла ошибка!', error: e.message });
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
    console.error(e);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: 'переданы некорректные данные в методы создания пользователя', error: e.message });
    }
    return res.status(500).json({ message: 'произошла ошибка!' });
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
    console.error(e);
    return res.status(500).json({ message: e });
  }
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
};

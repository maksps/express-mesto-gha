const Card = require("../models/card");
const User = require("../models/user");

const getUsers = async (req, res) => {

  try {
    const users = await User.find({});
    return res.status(200).json(users)
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({ message: "пользователь не найден" })
    }
    return res.status(200).json(user)

  } catch {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.create(body);
    return res.status(201).json({ message: "пользователь создан" })

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

module.exports = { getUsers, getUser, createUser };
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
    const  {userId}   = req.params;
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ message: "пользователь не найден" })
    }
    return res.status(200).json(user)

  } catch(e) {
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

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    await User.findByIdAndUpdate(req.user._id , body);
    const updatedUser = await User.findById(req.user._id);
    return res.status(201).json({updatedUser})

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const {avatar} = req.body;
    await User.findByIdAndUpdate(req.user._id , {avatar});
    const updatedUser = await User.findById(req.user._id);
    return res.status(201).json({updatedUser})

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: e })
  }
};



module.exports = { getUsers, getUser, createUser, updateUser, updateUserAvatar };
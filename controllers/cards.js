const Card = require("../models/card");
const User = require("../models/user");


const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.status(200).json(cards)
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    console.log(cardId);
    const card = await Card.findByIdAndDelete(cardId);
    return res.status(200).json({ message: "карточка удалена" })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).json({ card });

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    return res.status(201).json({ card });

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const deleteLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },);
    return res.status(201).json({ card });

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};






module.exports = { getCards, createCard, deleteCard, addLike, deleteLike };
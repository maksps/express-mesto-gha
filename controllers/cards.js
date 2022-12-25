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
    if (card === null) {
      return res.status(404).json({ message: "Карточка не найдена" })
    }
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
    if (e.name === "ValidationError") {
      return res.status(400).json({ message: "переданы некорректные данные в методы создания карточки", error: e. message })
    }
    return res.status(500).json({ message: "произошла ошибка!", error: e. message })
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
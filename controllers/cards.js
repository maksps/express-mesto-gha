const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    console.log("nnjnj");
    const cards = await Card.find({});
    return res.status(200).json(cards)
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    await Card.delete(cardId);
    return res.status(200).json({ message: "карточка удалена" })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

const createCard = async (req, res) => {
  try {
    const body = req.body;
    const card = await Card.create({ name: body.name, link: body.link, owner: req.user })
    return res.status(201).json({ card });

  }
  catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка!" })
  }
};

module.exports = { getCards, createCard, deleteCard };
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');

const urlRegEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

router.get('/users', getUsers);
router.get('/users/me', getUserMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegEx).required(),
  }),
}), updateUserAvatar);

module.exports = router;

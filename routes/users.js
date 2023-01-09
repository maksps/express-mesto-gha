const router = require('express').Router();
const {
  getUsers, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = router;

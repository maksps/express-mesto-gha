const { getUsers, createUser, getUser } = require('../controllers');

const router = require('express').Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUser);

module.exports = router;

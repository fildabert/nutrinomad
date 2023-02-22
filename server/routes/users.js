const express = require('express');
const {
  getUsers,
  getUser,
  signInUser,
  signUpUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/signIn', signInUser);

router.post('/signUp', signUpUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;

const express = require('express');
const {
  getUsers,
  getUser,
  signInUser,
  signUpUser,
  getUserBmrAndMacroByEmail,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/signIn', signInUser);

router.post('/signUp', signUpUser);

router.get('/bmr/:email', getUserBmrAndMacroByEmail);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;

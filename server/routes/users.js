const express = require('express');
const {
  getUsers,
  getUser,
  signInUser,
  signUpUser,
  getUserBmrAndMacroByEmail,
  deleteUser,
  updateUser,
  uploadAvatar,
  updateUserPassword,
  getWeightTracking,
} = require('../controllers/user.controller');
const upload = require('../middlewares/multer');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/weight/:id', getWeightTracking);

router.post('/signIn', signInUser);

router.post('/signUp', signUpUser);

router.get('/bmr/:email', getUserBmrAndMacroByEmail);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.post('/avatar/:id', upload.single('file'), uploadAvatar);

router.patch('/password/:id', updateUserPassword);

module.exports = router;

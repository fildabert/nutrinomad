const express = require('express');
const {
  getDiary,
  addMealToDiary,
  removeMealFromDiary,
  editMealFromDiary,
  redirectIfDateQueryParamExists,
} = require('../controllers/foodDiary.controller');

const router = express.Router();

router.get('/:userId', redirectIfDateQueryParamExists, getDiary);

router.post('/:userId', addMealToDiary);

router.delete('/:userId/:foodId', removeMealFromDiary);

router.patch('/:userId/:foodId', editMealFromDiary);

module.exports = router;

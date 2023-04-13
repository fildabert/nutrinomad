const express = require('express');
const {
  getDiary,
  generateCalendarData,
  addMealToDiary,
  removeMealFromDiary,
  editMealFromDiary,
  redirectIfDateQueryParamExists,
  getCaloriesConsumedLast7Days,
} = require('../controllers/foodDiary.controller');

const router = express.Router();

router.get('/:userId', redirectIfDateQueryParamExists, getDiary);

router.get('/calendar/:userId', generateCalendarData);

router.get('/calories/week/:userId', getCaloriesConsumedLast7Days);

router.post('/:userId', addMealToDiary);

router.delete('/:userId/:foodId', removeMealFromDiary);

router.patch('/:userId/:foodId', editMealFromDiary);

module.exports = router;

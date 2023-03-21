const express = require('express');
const {
  getMeals,
  getMeal,
  createMeal,
  deleteMeal,
  editMeal,
} = require('../controllers/meal.controller');

const router = express.Router();

router.get('/', getMeals);

router.get('/:id', getMeal);

router.post('/create', createMeal);

router.delete('/:id', deleteMeal);

router.patch('/:id', editMeal);

module.exports = router;

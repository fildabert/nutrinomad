const express = require('express');
const {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  editFood,
} = require('../controllers/food.controller');

const router = express.Router();

router.get('/', getFoods);

router.get('/:id', getFood);

router.post('/create', createFood);

router.delete('/:id', deleteFood);

router.patch('/:id', editFood);

module.exports = router;

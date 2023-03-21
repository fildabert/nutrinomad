const foodService = require('../services/food.service');

// Get all foods
const getFoods = async (req, res) => {
  const foods = await foodService.getAllFoods();
  res.status(200).json(foods);
};

const getFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodService.getFoodById(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const newFood = await foodService.createFood(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFood = await foodService.deleteFoodById(id);
    if (!deletedFood) {
      return res.status(400).json({ error: 'Food not found' });
    }
    res
      .status(200)
      .json({ success: `${deletedFood.name} successfully deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editFood = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const food = await foodService.editFoodById(id, quantity);
    if (!food) {
      return res.status(400).json({ error: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFoods, getFood, createFood, deleteFood, editFood };

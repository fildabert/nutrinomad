const mealService = require('../services/meal.service');

const getMeals = async (req, res) => {
  const meals = await mealService.getAllMeals();
  res.status(200).json(meals);
};

const getMeal = async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await mealService.getMealById(id);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMeal = async (req, res) => {
  try {
    const meal = await mealService.createMeal(req.body);
    return res.status(201).json({ meal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeal = await mealService.deleteMealById(id);
    if (!deletedMeal) {
      return res.status(400).json({ error: 'Meal not found' });
    }
    res.status(200).json(deletedMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editMeal = async (req, res) => {
  const { id } = req.params;
  const mealData = req.body;
  try {
    const meal = await mealService.editMealById(id, mealData);
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMeals, getMeal, createMeal, deleteMeal, editMeal };

const FoodModel = require('../models/food.model');
const foodValidator = require('../validators/food.validator');
const mongoose = require('mongoose');

const getAllFoods = async () => {
  const foods = await FoodModel.find();
  return foods;
};

const getFoodById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const food = await FoodModel.findById(id);
  return food;
};

const createFood = async (foodData) => {
  try {
    const { error, value } = foodValidator.validate(foodData);
    if (error) {
      throw Error(error.details[0].message);
    }

    const {
      name,
      servingSize,
      calories,
      carbs,
      fat,
      protein,
      quantity,
      foodCategory,
    } = value;

    const newFood = await FoodModel.create({
      name,
      servingSize,
      calories,
      carbs,
      fat,
      protein,
      quantity,
      foodCategory,
    });

    return newFood;
  } catch (err) {
    return { error: err.message };
  }
};

const deleteFoodById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const deletedFood = await FoodModel.findOneAndDelete({ _id: id });
  return deletedFood;
};

const editFoodById = async (id, newQuantity) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const food = await getFoodById(id);

    food.quantity = newQuantity;
    await food.save();

    return food;
  } catch (error) {
    return { error: error.message };
  }
};

const foodService = {
  getAllFoods,
  getFoodById,
  createFood,
  deleteFoodById,
  editFoodById,
};

module.exports = foodService;

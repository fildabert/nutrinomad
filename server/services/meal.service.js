const mealValidator = require('../validators/meal.validator');
const foodService = require('./food.service');
const MealModel = require('../models/meal.model');
const mongoose = require('mongoose');

const getAllMeals = async (id) => {
  const meals = await MealModel.find();
  return meals;
};

const getMealById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const meal = await MealModel.findById(id);
  return meal;
};

const getMealByMealTypeAndDate = async (mealType, date) => {
  const meal = await MealModel.findOne({ mealType, date });
  return meal;
};

const getMealsByDate = async (date) => {
  const meals = await MealModel.find({ date: date });
  return meals;
};

const createMeal = async (mealData) => {
  const { error, value } = mealValidator.validate(mealData);
  if (error) {
    throw Error(error.details[0].message);
  }

  const { date, mealType, foods } = value;

  if (foods.length === 0) {
    throw Error('At least one food item is required for a meal');
  }

  for (const food of foods) {
    createdFood = await foodService.createFood(food);
  }

  let meal = await MealModel.findOne({ date, mealType });

  if (meal) {
    // If the meal already exists, add the new foods to the existing foods array
    meal.foods.push(createdFood._id);
  } else {
    // If the meal doesn't exist, create a new one with the given foods
    meal = await MealModel.create({
      date,
      mealType,
      foods: createdFood._id,
    });
  }

  // Save the updated meal to the database
  await meal.save();

  return meal;
};

const deleteMealById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const meal = await getMealById(id);
  const foodIds = meal.foods;

  //Delete all the food in the foods array
  for (const foodId of foodIds) {
    await foodService.deleteFoodById(foodId);
  }

  const deletedMeal = await MealModel.findOneAndDelete({ _id: id });
  return deletedMeal;
};

const editMealById = async (mealId, mealData) => {
  if (!mealData) {
    throw Error('Meal data is required to edit a meal');
  }

  const { quantity, mealType, foodId } = mealData;

  // Update the meal document in the database
  const updatedMeal = await MealModel.findByIdAndUpdate(mealId, {
    mealType,
  });

  const updatedFood = updatedMeal.foods.find((food) => food.equals(foodId));

  if (updatedFood) {
    const food = await foodService.editFoodById(foodId, quantity);

    // Update the food in the foods array in the meal document
    updatedFood.quantity = quantity;
  }

  await updatedMeal.save();

  return updatedMeal;
};

const mealService = {
  getAllMeals,
  getMealById,
  getMealByMealTypeAndDate,
  getMealsByDate,
  createMeal,
  deleteMealById,
  editMealById,
};

module.exports = mealService;

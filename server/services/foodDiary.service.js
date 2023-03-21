const FoodDiaryModel = require('../models/foodDiary.model');
const MealModel = require('../models/meal.model');
const mongoose = require('mongoose');
const mealService = require('./meal.service');
const foodService = require('./food.service');
const { getMealById } = require('./meal.service');

const getDiaryByUserId = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return null;
  }
  const foodDiary = await FoodDiaryModel.findOne({ user: userId });
  return foodDiary;
};

const getMealsByUserIdAndDate = async (userId, date) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    const diary = await getDiaryByUserId(userId);
    const mealIds = diary.meals;
    const meals = [];
    for (const mealId of mealIds) {
      const meal = await mealService.getMealById(mealId);
      if (meal && meal.date.toISOString().slice(0, 10) === date) {
        const foods = [];
        for (const foodId of meal.foods) {
          const food = await foodService.getFoodById(foodId);
          foods.push(food);
        }
        meals.push({ ...meal.toObject(), foods });
      }
    }

    return meals;
  } catch (error) {
    return { error: error.message };
  }
};

const addMealToDiary = async (userId, mealData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    const diary = await getDiaryByUserId(userId);

    //Create the meal
    const meal = await mealService.createMeal(mealData);

    //Check if the meal ID already exists in the diary's meals array
    const mealIndex = diary.meals.findIndex((mealId) =>
      mealId.equals(meal._id)
    );

    if (mealIndex === -1) {
      //If the meal ID doesn't exist in the diary's meals array, add it
      diary.meals.push(meal._id);
      await diary.save();
    }

    return diary;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteMealFromDiary = async (userId, foodId) => {
  try {
    const diary = await getDiaryByUserId(userId);

    // Find the meal that contains the food to be deleted
    const meal = await MealModel.findOne({ foods: foodId });
    if (!meal) {
      // If the meal is not found, return an error
      return { error: 'Food not found in any meal' };
    }

    // Remove the food from the meal's foods array
    await MealModel.findOneAndUpdate(
      { _id: meal._id },
      { $pull: { foods: foodId } }
    );

    // Delete the food
    const food = await foodService.deleteFoodById(foodId);

    //if foods array has 1 food left, delete the meal.
    if (meal.foods.length === 1) {
      await mealService.deleteMealById(meal._id);
    }

    // Save the updated diary
    await diary.save();

    return { meal, food };
  } catch (error) {
    return { error: error.message };
  }
};

const editMealFromDiary = async (userId, foodId, mealData) => {
  try {
    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return null;
    }

    // Get the user's food diary
    const diary = await foodDiaryService.getDiaryByUserId(userId);

    const mealToUpdate = await getMealById(mealData.mealId);

    // If the meal type is not changed, edit the food
    if (mealData.mealType !== mealToUpdate.mealType) {
      const updatedFood = await foodService.editFoodById(
        foodId,
        mealData.quantity
      );

      // if the meal already exist, insert the food.
      const existingMeal = await mealService.getMealByMealTypeAndDate(
        mealData.mealType,
        mealData.date
      );

      if (existingMeal) {
        existingMeal.foods.push(updatedFood._id);
        await existingMeal.save();

        const foodIndex = mealToUpdate.foods.indexOf(foodId);
        //remove the food upon editing
        if (foodIndex !== -1) {
          mealToUpdate.foods.splice(foodIndex, 1);
          await mealToUpdate.save();
        }
      } else {
        //If the meal type is changed, create a new meal with the updated food
        const updatedMeal = await mealService.createMeal({
          date: mealData.date,
          mealType: mealData.mealType,
          foods: [updatedFood],
        });
        diary.meals.push(updatedMeal._id);
        await deleteMealFromDiary(userId, foodId);
      }
    } else {
      // If only the quantity is being updated, update the existing food object in the meal
      const updatedMeal = await mealService.editMealById(mealData.mealId, {
        quantity: mealData.quantity,
        mealType: mealData.mealType,
        foodId: foodId,
      });
    }

    // Save the updated food diary
    await diary.save();

    return mealToUpdate;
  } catch (error) {
    return { error: error.message };
  }
};

const foodDiaryService = {
  getDiaryByUserId,
  getMealsByUserIdAndDate,
  addMealToDiary,
  deleteMealFromDiary,
  editMealFromDiary,
};

module.exports = foodDiaryService;

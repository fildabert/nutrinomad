const foodDiaryService = require('../services/foodDiary.service');

//Get diary by user id
const getDiary = async (req, res) => {
  const { userId } = req.params;
  try {
    const foodDiary = await foodDiaryService.getDiaryByUserId(userId);
    if (!foodDiary) {
      return res.status(404).json({ error: 'Food diary not found' });
    }
    res.status(200).json(foodDiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMealsByUserIdAndDate = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;
  try {
    const meals = await foodDiaryService.getMealsByUserIdAndDate(userId, date);
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const redirectIfDateQueryParamExists = (req, res, next) => {
  const { date } = req.query;
  if (date) {
    return getMealsByUserIdAndDate(req, res, next);
  }
  next();
};

//Add meal to diary
const addMealToDiary = async (req, res) => {
  const { userId } = req.params;

  try {
    const foodDiary = await foodDiaryService.addMealToDiary(userId, req.body);
    res.status(200).json({ foodDiary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Remove meal from diary
const removeMealFromDiary = async (req, res) => {
  const { userId, foodId } = req.params;
  try {
    const meal = await foodDiaryService.deleteMealFromDiary(userId, foodId);
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editMealFromDiary = async (req, res) => {
  const { userId, foodId } = req.params;
  const mealData = req.body;
  try {
    const meals = await foodDiaryService.editMealFromDiary(
      userId,
      foodId,
      mealData
    );
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDiary,
  getMealsByUserIdAndDate,
  addMealToDiary,
  removeMealFromDiary,
  editMealFromDiary,
  redirectIfDateQueryParamExists,
};

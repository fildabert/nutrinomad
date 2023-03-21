const Joi = require('joi');
const mealValidator = require('./meal.validator');

const foodDiaryValidator = Joi.object({
  meals: Joi.array().items(mealValidator),
});

module.exports = foodDiaryValidator;

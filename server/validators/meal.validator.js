const Joi = require('joi');
const foodValidator = require('../validators/food.validator');

const mealValidator = Joi.object({
  date: Joi.date().required(),
  mealType: Joi.string()
    .valid('breakfast', 'lunch', 'dinner', 'snack')
    .required(),
  foods: Joi.array().items(foodValidator).required(),
});

module.exports = mealValidator;

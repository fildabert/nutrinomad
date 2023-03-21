const Joi = require('joi');

const foodValidator = Joi.object({
  name: Joi.string().required(),
  servingSize: Joi.string().required(),
  calories: Joi.number().required(),
  carbs: Joi.number().required(),
  fat: Joi.number().required(),
  protein: Joi.number().required(),
  quantity: Joi.number().optional().default(1),
  foodCategory: Joi.string().optional(),
}).unknown(true);

module.exports = foodValidator;

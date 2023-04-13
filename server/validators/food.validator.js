const Joi = require('joi');

const foodValidator = Joi.object({
  name: Joi.string().required(),
  servingSize: Joi.string().required(),
  calories: Joi.number().required(),
  carbs: Joi.number().required(),
  fat: Joi.number().required(),
  protein: Joi.number().required(),
  sugar: Joi.number().required(),
  sodium: Joi.number().required(),
  calcium: Joi.number().required(),
  iron: Joi.number().required(),
  vitaminA: Joi.number().required(),
  vitaminB12: Joi.number().required(),
  vitaminC: Joi.number().required(),
  vitaminD: Joi.number().required(),
  vitaminE: Joi.number().required(),
  quantity: Joi.number().optional().default(1),
  foodCategory: Joi.string().optional(),
}).unknown(true);

module.exports = foodValidator;

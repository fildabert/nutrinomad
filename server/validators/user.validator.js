const Joi = require('joi');

const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password length must be at least {#limit} characters long',
  }),
  sex: Joi.string().valid('male', 'female').required(),
  age: Joi.number().min(12).max(100).required().messages({
    'number.min': 'Age must be greater than or equal to {#limit}',
    'number.max': 'Age must be less than or equal to {#limit}',
  }),
  height: Joi.number().min(120).max(250).required().messages({
    'number.min': 'Height must be greater than or equal to {#limit}',
    'number.max': 'Height must be less than or equal to {#limit}',
  }),
  weight: Joi.number().min(20).max(400).required().messages({
    'number.min': 'Weight must be greater than or equal to {#limit}',
    'number.max': 'Weight must be less than or equal to {#limit}',
  }),
  goal: Joi.string()
    .valid('maintain', 'lose', 'gain')
    .required()
    .messages({ 'any.only': 'Please select a goal' }),
  activityLevel: Joi.string()
    .valid(
      'sedentary',
      'lightly_active',
      'moderately_active',
      'very_active',
      'intensely_active'
    )
    .required()
    .messages({
      'any.only': 'Please select an activity level',
    }),
  bmr: Joi.number().allow(0, '').optional(),
  avatar: Joi.string().uri().trim().allow(null, '').optional(),
});

const signInValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userValidator = {
  createUserValidator,
  signInValidator,
};

module.exports = userValidator;

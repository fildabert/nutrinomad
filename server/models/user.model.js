const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalEnum = {
  MAINTAIN: 'maintain',
  LOSE: 'lose',
  GAIN: 'gain',
};

const activityLevelEnum = {
  SEDENTARY: 'sedentary',
  LIGHTLY_ACTIVE: 'lightly_active',
  MODERATELY_ACTIVE: 'moderately_active',
  VERY_ACTIVE: 'very_active',
  INTENSELY_ACTIVE: 'intensely_active',
};

const activityLevels = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  intensely_active: 1.9,
};

const sexEnum = {
  MALE: 'male',
  FEMALE: 'female',
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: Object.values(sexEnum),
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    activityLevel: {
      type: String,
      enum: Object.values(activityLevelEnum),
      required: true,
    },
    goal: {
      type: String,
      enum: Object.values(goalEnum),
      required: true,
    },
    bmr: {
      type: Number,
    },
    proteinIntake: {
      type: Number,
    },
    carbsIntake: {
      type: Number,
    },
    fatIntake: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    foodDiary: { type: Schema.Types.ObjectId, ref: 'FoodDiary' },
  },
  { timestamps: true }
);

userSchema.methods.calculateBmrAndMacroIntake = function () {
  const { sex, age, weight, height, activityLevel, goal } = this;

  //Mifflin - St Jeor Formula
  const bmr =
    sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  /* If lose weight, bmr - 500. If gain weight, bmr + 500 */
  let adjustedBmr = bmr;
  if (goal === goalEnum.LOSE) {
    adjustedBmr -= 500;
  } else if (goal === goalEnum.GAIN) {
    adjustedBmr += 500;
  }

  //Total Daily Energy Expenditure (TDEE)
  const tdee = adjustedBmr * activityLevels[activityLevel];

  //Macronutrient daily intake calculation based on the user's goals
  let proteinIntake, carbsIntake, fatIntake;
  switch (goal) {
    case goalEnum.MAINTAIN:
      proteinIntake = Math.round(0.8 * weight); // 0.8 g of protein per kg of body weight
      carbsIntake = Math.round((0.5 * tdee) / 4); // 50% of calories from carbs
      fatIntake = Math.round((0.3 * tdee) / 9); // 30% of calories from fat
      break;
    case goalEnum.LOSE:
      proteinIntake = Math.round(2 * weight); // 2 g of protein per kg of body weight
      carbsIntake = Math.round((0.4 * tdee) / 4); // 40% of calories from carbs
      fatIntake = Math.round((0.3 * tdee) / 9); // 30% of calories from fat
      break;
    case goalEnum.GAIN:
      proteinIntake = Math.round(1.5 * weight); // 1.5 g of protein per kg of body weight
      carbsIntake = Math.round((0.6 * tdee) / 4); // 60% of calories from carbs
      fatIntake = Math.round((0.25 * tdee) / 9); // 25% of calories from fat
      break;
    default:
      break;
  }

  this.proteinIntake = proteinIntake;
  this.carbsIntake = carbsIntake;
  this.fatIntake = fatIntake;

  this.bmr = Math.round(tdee);
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

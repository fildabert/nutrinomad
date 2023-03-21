const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealTypeEnum = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
};

const mealSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  mealType: {
    type: String,
    enum: Object.values(mealTypeEnum),
    required: true,
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
  ],
});

mealSchema.pre('save', async function (next) {
  if (this.foods.length === 0) {
    try {
      await this.remove();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

mealSchema.index({ date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model('Meal', mealSchema);

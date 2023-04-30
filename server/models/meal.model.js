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
  // problem: this may be just a personal preference, but it is not a good idea to use pre save hooks to operations like this
  // as it may cause a surprise to other developers that may not know that this hook exists
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

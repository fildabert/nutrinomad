const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodDiarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
});

module.exports = mongoose.model('FoodDiary', foodDiarySchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  servingSize: { type: String, required: true },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
  sugar: { type: Number, required: true },
  sodium: { type: Number, required: true },
  calcium: { type: Number, required: true },
  iron: { type: Number, required: true },
  vitaminA: { type: Number, required: true },
  vitaminB12: { type: Number, required: true },
  vitaminC: { type: Number, required: true },
  vitaminD: { type: Number, required: true },
  vitaminE: { type: Number, required: true },
  quantity: {
    type: Number,
    set: function (newQuantity) {
      if (this.quantity !== undefined) {
        this.quantity = 1;
        const ratio = newQuantity / this.quantity;
        this.calories = (this.calories * ratio).toFixed(2);
        this.carbs = (this.carbs * ratio).toFixed(2);
        this.fat = (this.fat * ratio).toFixed(2);
        this.protein = (this.protein * ratio).toFixed(2);
        this.sugar = (this.sugar * ratio).toFixed(2);
        this.sodium = (this.sodium * ratio).toFixed(2);
        this.calcium = (this.calcium * ratio).toFixed(2);
        this.iron = (this.iron * ratio).toFixed(2);
        this.vitaminA = (this.vitaminA * ratio).toFixed(2);
        this.vitaminB12 = (this.vitaminB12 * ratio).toFixed(2);
        this.vitaminC = (this.vitaminC * ratio).toFixed(2);
        this.vitaminD = (this.vitaminD * ratio).toFixed(2);
        this.vitaminE = (this.vitaminE * ratio).toFixed(2);
      }
      return newQuantity;
    },
  },
  foodCategory: { type: String },
});

module.exports = mongoose.model('Food', foodSchema);

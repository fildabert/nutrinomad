const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  servingSize: { type: String, required: true },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
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
      }
      return newQuantity;
    },
  },
  foodCategory: { type: String },
});

module.exports = mongoose.model('Food', foodSchema);

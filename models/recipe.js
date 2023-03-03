const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeName: String,
  protein: String,
  ingredients: [{
    ingredientName: String,
    ingredientUnit: String,
    ingredientQuantity: Number
  }],
  directions: String,
  imageUrl: String,
  description: String,
  prepMinutes: Number,
  cookMinutes: Number,
  servingNumber: Number
});

recipeSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Recipe', recipeSchema);

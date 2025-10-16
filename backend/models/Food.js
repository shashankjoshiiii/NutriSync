const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  name: { type: String, required: true, trim: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  sugar: { type: Number },
  fiber: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('food', FoodSchema);


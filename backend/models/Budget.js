const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ['monthly', 'weekly'], default: 'monthly' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', budgetSchema);
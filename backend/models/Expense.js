const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['need', 'want'], required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Expense', expenseSchema);

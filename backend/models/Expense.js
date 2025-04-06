const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: String,               // From the JWT auth
  title: String,                // Title of the expense
  amount: Number,
  date: String,                 // Format: "YYYY-MM-DD"
  category: {                   // One of the allowed options
    type: String,
    enum: ["food", "home", "entertainment", "shopping", "transportation"]
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);

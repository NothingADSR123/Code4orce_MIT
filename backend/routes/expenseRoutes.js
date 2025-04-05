const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const authCheck = require('../middleware/authCheck');
const { classifyExpense } = require('../services/expenseClassifier');
const { sendBudgetAlert } = require('../utils/emailService');
const admin = require('../utils/firebase');

// Get all expenses for a user
router.get('/expenses', authCheck, async (req, res) => {
  try {
    const userId = req.query.userId;
    
    // Verify that the authenticated user is requesting their own data
    if (req.user.uid !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to this user\'s data' });
    }
    
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new expense
router.post('/add-expense', authCheck, async (req, res) => {
  try {
    const { amount, category, date, notes } = req.body;
    const userId = req.user.uid;
    
    // Classify the expense as need or want
    const type = classifyExpense(category);
    
    // Create and save the expense
    const expense = new Expense({
      userId,
      amount,
      category,
      date: new Date(date),
      type,
      notes
    });
    
    await expense.save();
    
    // Check if user is approaching budget limit
    await checkBudgetLimit(userId);
    
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to check budget limit and send alert if needed
async function checkBudgetLimit(userId) {
  try {
    // Get user's budget
    const budget = await Budget.findOne({ userId });
    if (!budget) return; // No budget set
    
    // Calculate current month's expenses
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentUsed = (totalSpent / budget.amount) * 100;
    
    // If over 90% of budget, send alert
    if (percentUsed >= 90) {
      // Get user email from Firebase
      const userRecord = await admin.auth().getUser(userId);
      const userEmail = userRecord.email;
      
      if (userEmail) {
        await sendBudgetAlert(userEmail, budget.amount, totalSpent, percentUsed);
      }
    }
  } catch (error) {
    console.error('Error checking budget limit:', error);
  }
}

module.exports = router;

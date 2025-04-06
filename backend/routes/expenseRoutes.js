const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authCheck = require('../middleware/authCheck');

// Get all expenses for a user
router.get('/expenses', authCheck, async (req, res) => {
  try {
    const userId = req.user.uid;
    const expenses = await Expense.find({ userId })
      .sort({ date: -1 }); // Sort by date descending
    
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new expense
router.post('/expenses', authCheck, async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    const userId = req.user.uid;

    // Validate required fields
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const expense = new Expense({
      userId,
      title,
      amount,
      date,
      category
    });

    await expense.save();
    
    // Check for spending alerts after adding a new expense
    const alerts = await checkSpendingAlerts(userId, category);
    
    res.status(201).json({ 
      expense,
      alerts // Include any triggered alerts in the response
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to check for spending alerts
async function checkSpendingAlerts(userId, category) {
  try {
    const alerts = [];
    const now = new Date();
    
    // Check weekly spending by category
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7); // 7 days ago
    
    const weeklyExpenses = await Expense.find({
      userId,
      category,
      date: { $gte: weekStart.toISOString().split('T')[0] }
    });
    
    const weeklyTotal = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Set thresholds for different categories
    const thresholds = {
      food: 2000,
      entertainment: 1500,
      shopping: 3000,
      transportation: 1000,
      home: 5000
    };
    
    // Check if spending exceeds threshold
    if (weeklyTotal >= thresholds[category]) {
      alerts.push({
        type: 'weekly',
        category,
        amount: weeklyTotal,
        message: `You've spent ₹${weeklyTotal} on ${category} this week!`
      });
    }
    
    return alerts;
  } catch (error) {
    console.error('Error checking spending alerts:', error);
    return [];
  }
}

// Delete an expense
router.delete('/expenses/:id', authCheck, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check if the expense belongs to the user
    if (expense.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get spending alerts for a user
router.get('/expenses/alerts', authCheck, async (req, res) => {
  try {
    const userId = req.user.uid;
    const alerts = [];
    const now = new Date();
    
    // Get all categories
    const categories = ["food", "home", "entertainment", "shopping", "transportation"];
    
    // Check weekly spending for each category
    for (const category of categories) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 7);
      
      const weeklyExpenses = await Expense.find({
        userId,
        category,
        date: { $gte: weekStart.toISOString().split('T')[0] }
      });
      
      const weeklyTotal = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      // Set thresholds for different categories
      const thresholds = {
        food: 2000,
        entertainment: 1500,
        shopping: 3000,
        transportation: 1000,
        home: 5000
      };
      
      // Check if spending exceeds threshold
      if (weeklyTotal >= thresholds[category]) {
        alerts.push({
          type: 'weekly',
          category,
          amount: weeklyTotal,
          message: `You've spent ₹${weeklyTotal} on ${category} this week!`
        });
      }
    }
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching spending alerts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

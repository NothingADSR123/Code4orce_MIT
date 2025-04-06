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
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

module.exports = router;

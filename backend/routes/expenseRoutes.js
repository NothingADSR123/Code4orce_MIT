const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authCheck = require('../middleware/authCheck');

// POST /add-expense
router.post('/add-expense', authCheck, async (req, res) => {
  try {
    const { amount, category, date, type, notes } = req.body;
    const newExpense = new Expense({
      userId: req.user.uid,
      amount,
      category,
      date,
      type,
      notes,
    });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /expenses?userId=
router.get('/expenses', authCheck, async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId !== req.user.uid) return res.status(403).json({ message: 'Forbidden' });

    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

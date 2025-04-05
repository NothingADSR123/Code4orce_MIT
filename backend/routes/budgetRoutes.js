const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authCheck = require('../middleware/authCheck');

// Get user's budget
router.get('/budget', authCheck, async (req, res) => {
  try {
    const userId = req.user.uid;
    const budget = await Budget.findOne({ userId });
    
    if (!budget) {
      return res.status(404).json({ message: 'No budget found for this user' });
    }
    
    res.json(budget);
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set or update budget
router.post('/set-budget', authCheck, async (req, res) => {
  try {
    const { amount, period } = req.body;
    const userId = req.user.uid;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid budget amount is required' });
    }
    
    // Find existing budget or create new one
    let budget = await Budget.findOne({ userId });
    
    if (budget) {
      // Update existing budget
      budget.amount = amount;
      if (period) budget.period = period;
      budget.updatedAt = Date.now();
    } else {
      // Create new budget
      budget = new Budget({
        userId,
        amount,
        period: period || 'monthly'
      });
    }
    
    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    console.error('Error setting budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
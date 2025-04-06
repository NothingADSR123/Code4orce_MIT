const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Budget = require('../models/Budget'); // Add this
const Expense = require('../models/Expense'); // Add this

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = new User({
      email,
      password,
      name
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Create initial budget for the user
    const initialBudget = new Budget({
      userId: user._id.toString(),
      amount: 1000, // Default monthly budget
      period: 'monthly'
    });
    await initialBudget.save();
    
    // Create sample expenses for the user
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Sample expense categories
    const categories = ['food', 'home', 'entertainment', 'shopping', 'transportation'];
    
    // Create a few sample expenses for the current month
    const sampleExpenses = [
      {
        userId: user._id.toString(),
        title: 'Groceries',
        amount: 75.50,
        date: `${year}-${String(month + 1).padStart(2, '0')}-05`,
        category: 'food'
      },
      {
        userId: user._id.toString(),
        title: 'Electricity Bill',
        amount: 120.00,
        date: `${year}-${String(month + 1).padStart(2, '0')}-10`,
        category: 'home'
      },
      {
        userId: user._id.toString(),
        title: 'Movie Night',
        amount: 35.00,
        date: `${year}-${String(month + 1).padStart(2, '0')}-15`,
        category: 'entertainment'
      }
    ];
    
    await Expense.insertMany(sampleExpenses);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Expense = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food'
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`${API_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(response.data);
        processChartData(response.data);
        
        // Fetch alerts
        const alertsResponse = await axios.get(`${API_URL}/api/expenses/alerts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlerts(alertsResponse.data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, [navigate]);

  const processChartData = (expensesData) => {
    if (!expensesData || expensesData.length === 0) {
      setMonthlyData([]);
      setCategoryData([]);
      return;
    }

    const months = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < 6; i++) {
      const month = new Date(currentYear, currentDate.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      months[monthName] = 0;
    }

    expensesData.forEach(expense => {
      try {
        const expenseDate = new Date(expense.date);
        const monthName = expenseDate.toLocaleString('default', { month: 'short' });
        const monthDiff = (currentDate.getFullYear() - expenseDate.getFullYear()) * 12 + currentDate.getMonth() - expenseDate.getMonth();
        if (monthDiff >= 0 && monthDiff < 6 && months[monthName] !== undefined) {
          months[monthName] += expense.amount;
        }
      } catch (error) {
        console.error('Error processing expense date:', error, expense);
      }
    });

    const monthlyChartData = Object.keys(months).map(month => ({
      name: month,
      amount: months[month]
    })).reverse();
    setMonthlyData(monthlyChartData);

    const categories = {};
    expensesData.forEach(expense => {
      if (expense.category) {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
      }
    });

    const categoryChartData = Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
    setCategoryData(categoryChartData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/expenses`, {
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category.toLowerCase(),
        date: newExpense.date
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Add the new expense to the state
      const addedExpense = response.data.expense;
      setExpenses([...expenses, addedExpense]);
      
      // Check for alerts from the response
      if (response.data.alerts && response.data.alerts.length > 0) {
        setAlerts(response.data.alerts);
      }
      
      // Reset the form
      setNewExpense({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'food'
      });
      
      // Update charts
      processChartData([...expenses, addedExpense]);
      
    } catch (error) {
      console.error("Failed to add expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.delete(`${API_URL}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedExpenses = expenses.filter(expense => expense._id !== id);
      setExpenses(updatedExpenses);
      processChartData(updatedExpenses);
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4461F2] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your expenses...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="w-full mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-gray-600">Track and manage your daily expenses</p>
          </div>

          {/* Add Expense Form */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Expense</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newExpense.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4461F2] focus:border-[#4461F2] text-black"
                  placeholder="e.g., Groceries, Rent, etc."
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4461F2] focus:border-[#4461F2] text-black"
                  placeholder="e.g., 50.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4461F2] focus:border-[#4461F2] text-black"
                >
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="shopping">Shopping</option>
                  <option value="home">Housing</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4461F2] focus:border-[#4461F2] text-black"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={handleAddExpense}
                className="px-6 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Expense
              </motion.button>
            </div>
          </motion.div>

          {/* Expense Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Monthly Bar Chart */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Expenses</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="amount" fill="#4461F2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Category Pie Chart */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Expenses by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Expenses List */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Expenses</h2>
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No expenses found. Add your first expense above!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((expense) => (
                        <tr key={expense._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                            ${parseFloat(expense.amount).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleDeleteExpense(expense._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white shadow-md py-4 px-6 text-center text-gray-600">
        <p>© 2023 Financial Dashboard. All rights reserved.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="hover:text-[#4461F2]">Terms of Service</a>
          <a href="#" className="hover:text-[#4461F2]">Privacy Policy</a>
          <a href="#" className="hover:text-[#4461F2]">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Expense;

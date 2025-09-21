import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch expenses data
        
        const expensesResponse = await axios.get(`${API_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch budget data
        const budgetResponse = await axios.get(`${API_URL}/api/budget`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Process the data
        const processedData = processBackendData(expensesResponse.data, budgetResponse.data);
        setUserData(processedData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Process backend data into the format needed for the dashboard
  const processBackendData = (expenses, budget) => {
    // Get user name from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    
    // Calculate current month's spending
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    
    const currentMonthSpending = currentMonthExpenses.reduce((total, expense) => total + expense.amount, 0);
    
    // Calculate previous month's spending
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === previousMonth && expenseDate.getFullYear() === previousYear;
    });
    
    const previousMonthSpending = previousMonthExpenses.reduce((total, expense) => total + expense.amount, 0);
    
    // Calculate spending change percentage
    const spendingChangePercentage = previousMonthSpending === 0 
      ? 0 
      : Math.round(((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100);
    
    // Calculate monthly savings (budget - spending)
    const currentMonthBudget = budget ? budget.amount : 0;
    const monthlySavings = currentMonthBudget - currentMonthSpending;
    
    // Calculate savings rate
    const savingsRate = currentMonthBudget > 0 
      ? Math.round((monthlySavings / currentMonthBudget) * 100) 
      : 0;
    
    // Calculate previous month's savings
    const previousMonthSavings = previousMonthSpending > 0 
      ? currentMonthBudget - previousMonthSpending 
      : 0;
    
    // Calculate savings change percentage
    const savingsChangePercentage = previousMonthSavings === 0 
      ? 0 
      : Math.round(((monthlySavings - previousMonthSavings) / previousMonthSavings) * 100);
    
    // Calculate financial health score (0-100)
    // Simple algorithm: higher savings rate = better health
    const financialHealth = Math.min(100, Math.max(0, savingsRate * 2));
    
    // Generate monthly data for the past 6 months
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentYear, currentMonth - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === month.getMonth() && expenseDate.getFullYear() === month.getFullYear();
      });
      
      const totalSpent = monthExpenses.reduce((total, expense) => total + expense.amount, 0);
      const monthlySaved = currentMonthBudget - totalSpent;
      
      monthlyData.push({
        name: monthName,
        spending: totalSpent,
        savings: monthlySaved > 0 ? monthlySaved : 0
      });
    }
    
    // Generate expenditure distribution by category
    const categories = {};
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    
    const expenditureData = Object.keys(categories).map(category => ({
      name: category,
      value: Math.round((categories[category] / expenses.reduce((total, expense) => total + expense.amount, 0)) * 100)
    }));
    
    // Get recent transactions (last 5)
    const recentTransactions = [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(expense => ({
        id: expense._id,
        description: expense.title,
        amount: -expense.amount, // Negative because expenses reduce balance
        date: expense.date,
        category: expense.category
      }));
    
    return {
      name: userName,
      currentMonth: {
        spending: currentMonthSpending,
        savings: monthlySavings > 0 ? monthlySavings : 0,
        savingsRate: savingsRate > 0 ? savingsRate : 0,
        previousMonthSpendingChange: spendingChangePercentage,
        previousMonthSavingsChange: savingsChangePercentage
      },
      financialHealth,
      monthlyData,
      expenditureData,
      recentTransactions
    };
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your financial dashboard...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-600">Your complete financial overview</p>
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Monthly Spending</h3>
              <p className="mt-2 text-3xl font-bold text-[#4461F2]">${userData?.currentMonth.spending.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {userData?.currentMonth.previousMonthSpendingChange >= 0 ? '+' : ''}
                {userData?.currentMonth.previousMonthSpendingChange}% from last month
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Monthly Savings</h3>
              <p className="mt-2 text-3xl font-bold text-[#4461F2]">${userData?.currentMonth.savings.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {userData?.currentMonth.previousMonthSavingsChange >= 0 ? '+' : ''}
                {userData?.currentMonth.previousMonthSavingsChange}% from last month
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Financial Health</h3>
              <p className="mt-2 text-3xl font-bold text-[#4461F2]">{userData?.financialHealth}/100</p>
              <p className="text-sm text-gray-500">
                {userData?.financialHealth > 80 ? 'Excellent' : 
                 userData?.financialHealth > 60 ? 'Good' : 
                 userData?.financialHealth > 40 ? 'Fair' : 'Needs attention'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Savings Rate</h3>
              <p className="mt-2 text-3xl font-bold text-[#4461F2]">{userData?.currentMonth.savingsRate}%</p>
              <p className="text-sm text-gray-500">
                {userData?.currentMonth.savingsRate > 30 ? 'Above average' : 
                 userData?.currentMonth.savingsRate > 20 ? 'Average' : 'Below average'}
              </p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Monthly Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userData?.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="spending" stroke="#4461F2" strokeWidth={2} name="Spending" />
                    <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} name="Savings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Expenditure Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userData?.expenditureData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userData?.expenditureData?.map((entry, index) => (
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

          {/* Recent Transactions */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Transactions</h3>
              <button 
                onClick={() => navigate('/expenses')}
                className="px-4 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData?.recentTransactions?.length > 0 ? (
                    userData.recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No recent transactions</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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

export default Dashboard;
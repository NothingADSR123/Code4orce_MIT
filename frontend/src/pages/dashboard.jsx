import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data (simulated)
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get user name from localStorage (where it would be stored during registration)
        const userName = localStorage.getItem('userName') || 'User';
        
        // Sample user data that would come from backend
        const data = {
          name: userName,
          currentMonth: {
            spending: 1700,
            savings: 1000,
            savingsRate: 37,
            previousMonthSpendingChange: 5,
            previousMonthSavingsChange: 10
          },
          financialHealth: 85,
          monthlyData: [
            { name: 'Jan', spending: 1200, savings: 500 },
            { name: 'Feb', spending: 1500, savings: 600 },
            { name: 'Mar', spending: 1800, savings: 700 },
            { name: 'Apr', spending: 1100, savings: 800 },
            { name: 'May', spending: 2000, savings: 900 },
            { name: 'Jun', spending: 1700, savings: 1000 },
          ],
          expenditureData: [
            { name: 'Food', value: 35 },
            { name: 'Transport', value: 20 },
            { name: 'Entertainment', value: 15 },
            { name: 'Bills', value: 30 },
          ],
          recentTransactions: [
            { id: 1, description: 'Grocery Shopping', amount: -150, date: '2024-03-15', category: 'Food' },
            { id: 2, description: 'Salary Deposit', amount: 3000, date: '2024-03-14', category: 'Income' },
            { id: 3, description: 'Electricity Bill', amount: -80, date: '2024-03-13', category: 'Bills' },
            { id: 4, description: 'Movie Tickets', amount: -40, date: '2024-03-12', category: 'Entertainment' },
            { id: 5, description: 'Uber Ride', amount: -25, date: '2024-03-11', category: 'Transport' },
          ]
        };
        
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleLogout = () => {
    navigate('/login');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your financial dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
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
          <p className="mt-2 text-3xl font-bold text-[#4461F2]">${userData?.currentMonth.spending}</p>
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
          <p className="mt-2 text-3xl font-bold text-[#4461F2]">${userData?.currentMonth.savings}</p>
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
                <Line type="monotone" dataKey="spending" stroke="#4461F2" name="Spending" />
                <Line type="monotone" dataKey="savings" stroke="#10B981" name="Savings" />
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
                  {userData?.expenditureData.map((entry, index) => (
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
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
          <button className="px-4 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData?.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount >= 0 ? '+$' : '-$'}{Math.abs(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

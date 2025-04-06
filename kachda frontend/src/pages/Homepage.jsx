import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    totalGoals: 0
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    // Generate random stats for demo purposes
    const generateRandomStats = () => {
      return {
        totalUsers: Math.floor(Math.random() * 5000) + 1000,
        totalExpenses: Math.floor(Math.random() * 1000000) + 500000,
        totalGoals: Math.floor(Math.random() * 2000) + 500
      };
    };

    // Fetch stats from backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // If API fails, use random data
        setStats(generateRandomStats());
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Inter']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.span 
              className="text-2xl font-bold text-[#4461F2] font-['Poppins'] tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MindSpend
            </motion.span>
            
            {isLoggedIn ? (
              <div className="flex space-x-4">
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-[#4461F2] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dashboard
                </motion.button>
                <motion.button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex space-x-4">
                {/* Login and signup buttons removed */}
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4461F2]/20 to-purple-500/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'blur(1px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-['Poppins'] tracking-tight leading-tight"
            >
              Welcome to <span className="text-[#4461F2]">MindSpend</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Your intelligent financial companion for smarter spending and better savings
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              <motion.button
                onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
                className="px-8 py-3 bg-[#4461F2] text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl font-['Poppins'] tracking-wide"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              {/* Create Account button removed */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="text-4xl font-bold text-[#4461F2] mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {stats.totalUsers}+
              </motion.div>
              <p className="text-gray-600">Happy Users</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="text-4xl font-bold text-[#4461F2] mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                viewport={{ once: true }}
              >
                ${stats.totalExpenses.toLocaleString()}
              </motion.div>
              <p className="text-gray-600">Expenses Tracked</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="text-4xl font-bold text-[#4461F2] mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {stats.totalGoals}
              </motion.div>
              <p className="text-gray-600">Goals Achieved</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins'] tracking-tight">Why Choose MindSpend?</h2>
            <p className="text-xl text-gray-600 font-['Inter']">Smart features for smarter financial management</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <motion.svg 
                  className="w-8 h-8 text-[#4461F2]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-['Poppins'] tracking-tight">Expense Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Easily track and categorize your expenses with our intuitive interface.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <motion.svg 
                  className="w-8 h-8 text-[#4461F2]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-['Poppins'] tracking-tight">Smart Goals</h3>
              <p className="text-gray-600 leading-relaxed">Set and achieve your financial goals with our smart tracking system.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <motion.svg 
                  className="w-8 h-8 text-[#4461F2]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-['Poppins'] tracking-tight">Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Get detailed insights into your spending patterns and financial health.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* App Preview Section */}
      <div className="py-24 bg-gray-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins'] tracking-tight">Experience MindSpend</h2>
            <p className="text-xl text-gray-600 font-['Inter']">See how MindSpend can transform your financial management</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4461F2]/10 to-purple-500/10 rounded-2xl" />
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <motion.img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="App Preview"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 font-['Poppins'] tracking-tight">MindSpend</h3>
              <p className="text-gray-400 leading-relaxed">Your intelligent financial companion for smarter spending and better savings.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 font-['Poppins'] tracking-tight">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <motion.button 
                    onClick={() => navigate('/privacy')} 
                    className="text-gray-400 hover:text-white transition-colors font-['Inter']"
                    whileHover={{ x: 5 }}
                  >
                    Privacy Policy
                  </motion.button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => navigate('/terms')} 
                    className="text-gray-400 hover:text-white transition-colors font-['Inter']"
                    whileHover={{ x: 5 }}
                  >
                    Terms of Service
                  </motion.button>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 font-['Poppins'] tracking-tight">Contact</h3>
              <p className="text-gray-400 leading-relaxed">Email: support@mindspend.com</p>
              <p className="text-gray-400 leading-relaxed">Phone: +1 (555) 123-4567</p>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="font-['Inter']">&copy; 2024 MindSpend. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Home;
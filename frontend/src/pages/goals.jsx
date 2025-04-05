import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showGoalDetails, setShowGoalDetails] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [randomBonus, setRandomBonus] = useState(0);

  // Sample data for progress chart
  const progressData = [
    { day: 'Mon', amount: 20 },
    { day: 'Tue', amount: 35 },
    { day: 'Wed', amount: 50 },
    { day: 'Thu', amount: 65 },
    { day: 'Fri', amount: 80 },
    { day: 'Sat', amount: 90 },
    { day: 'Sun', amount: 100 },
  ];

  const handleAddGoal = () => {
    if (newGoal && targetAmount) {
      const newGoalObj = {
        id: Date.now(),
        name: newGoal,
        target: parseFloat(targetAmount),
        current: 0,
        completed: false,
        startDate: new Date(),
        milestones: [
          { amount: parseFloat(targetAmount) * 0.25, achieved: false },
          { amount: parseFloat(targetAmount) * 0.5, achieved: false },
          { amount: parseFloat(targetAmount) * 0.75, achieved: false },
          { amount: parseFloat(targetAmount), achieved: false }
        ]
      };
      setGoals([...goals, newGoalObj]);
      setNewGoal('');
      setTargetAmount('');
    }
  };

  const handleUpdateProgress = (id, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newCurrent = goal.current + amount;
        const completed = newCurrent >= goal.target;
        
        // Check for milestone achievements
        const updatedMilestones = goal.milestones.map(milestone => {
          if (!milestone.achieved && newCurrent >= milestone.amount) {
            setAchievements(prev => [...prev, {
              id: Date.now(),
              title: `Milestone Reached!`,
              description: `You've reached ${(milestone.amount / goal.target * 100).toFixed(0)}% of your ${goal.name} goal!`,
              type: 'milestone'
            }]);
            return { ...milestone, achieved: true };
          }
          return milestone;
        });

        if (completed && !goal.completed) {
          setShowConfetti(true);
          setAchievements(prev => [...prev, {
            id: Date.now(),
            title: `Goal Completed!`,
            description: `Congratulations! You've achieved your ${goal.name} goal!`,
            type: 'completion'
          }]);
          setTimeout(() => {
            setShowScratchCard(true);
            setShowConfetti(false);
          }, 2000);
        }
        return { ...goal, current: newCurrent, completed, milestones: updatedMilestones };
      }
      return goal;
    }));
  };

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    setShowGoalDetails(true);
  };

  const handleCloseDetails = () => {
    setShowGoalDetails(false);
    setSelectedGoal(null);
  };

  const handleScratch = () => {
    // Generate random bonus between $10 and $100
    const bonus = Math.floor(Math.random() * 91) + 10; // Random number between 10 and 100
    setRandomBonus(bonus);
    setIsScratched(true);
    
    // Add bonus to the most recently completed goal
    setGoals(goals.map(goal => {
      if (goal.completed && goal.current === goal.target) {
        return {
          ...goal,
          current: goal.current + bonus,
          target: goal.target + bonus
        };
      }
      return goal;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
        <p className="text-gray-600">Track your daily savings and achieve your financial goals</p>
      </div>

      {/* Add New Goal Form */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Set New Goal</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Goal name"
            className="flex-1 p-2 border rounded-md"
          />
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Target amount"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={handleAddGoal}
            className="px-4 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Goal
          </button>
        </div>
      </motion.div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGoalClick(goal)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{goal.name}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                goal.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {goal.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>${goal.current} / ${goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-[#4461F2] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            {!goal.completed && (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Add amount"
                  className="flex-1 p-2 border rounded-md"
                  onChange={(e) => handleUpdateProgress(goal.id, parseFloat(e.target.value))}
                />
                <button
                  className="px-4 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateProgress(goal.id, 10);
                  }}
                >
                  +$10
                </button>
              </div>
            )}
            {/* Milestone Indicators */}
            <div className="mt-4 flex justify-between">
              {goal.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4461F2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#4461F2]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -1000],
                  x: [0, Math.random() * 200 - 100],
                  rotate: [0, Math.random() * 360],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scratch Card */}
      <AnimatePresence>
        {showScratchCard && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#4461F2] via-purple-500 to-pink-500 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#4461F2] opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.h2 
                  className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#4461F2] via-blue-500 to-purple-500 text-transparent bg-clip-text"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Congratulations! 🎉
                </motion.h2>
                <motion.p 
                  className="text-center mb-6 text-blue-600"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  You've achieved your goal! Scratch to reveal your reward!
                </motion.p>
                <div
                  className="relative h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                  onClick={handleScratch}
                >
                  {!isScratched && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#4461F2] to-purple-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-white text-xl font-semibold"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          Scratch Me!
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                  {isScratched && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-center">
                        <motion.p 
                          className="text-3xl font-bold text-[#4461F2]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        >
                          ${randomBonus}
                        </motion.p>
                        <motion.p 
                          className="text-gray-600"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Lucky Bonus!
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </div>
                <motion.button
                  className="mt-6 w-full px-4 py-2 bg-[#4461F2] text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setShowScratchCard(false);
                    setIsScratched(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Goals;
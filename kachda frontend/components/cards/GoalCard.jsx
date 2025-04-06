import React from 'react';

const GoalCard = ({ title, targetAmount, currentAmount, deadline }) => {
  const progress = (currentAmount / targetAmount) * 100;
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-blue-600">₹{currentAmount}</span>
          <span className="text-gray-500">of ₹{targetAmount}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {progress.toFixed(1)}% complete
          </span>
          <span className="text-sm text-gray-500">
            Due: {formattedDeadline}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
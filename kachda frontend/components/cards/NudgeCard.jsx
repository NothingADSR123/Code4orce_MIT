import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const NudgeCard = ({ category, amount, timeframe, onDetailsClick }) => {
  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 shadow-md">
      <div className="flex items-start space-x-3">
        <div className="text-orange-500">
          <FaExclamationCircle className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="mb-3">
            <p className="text-gray-800 font-medium">
              You've spent <span className="font-bold">₹{amount}</span> on{' '}
              <span className="font-bold">{category}</span> this {timeframe}!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This seems higher than your usual spending pattern.
            </p>
          </div>
          
          <button
            onClick={onDetailsClick}
            className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium 
                     hover:bg-orange-600 transition-colors duration-200"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default NudgeCard;
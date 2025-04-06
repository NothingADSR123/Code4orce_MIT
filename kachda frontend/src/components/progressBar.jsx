import React from 'react';

const ProgressBar = ({ percentage = 0, label }) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="text-sm font-medium text-gray-700">
          {label}
        </div>
      )}
      <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
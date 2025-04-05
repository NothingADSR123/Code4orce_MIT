import React from 'react';
import { FaUtensils, FaShoppingBag, FaCar, FaHome } from 'react-icons/fa';

const ExpenseCard = ({ title, amount, date, category }) => {
  const getCategoryIcon = (category) => {
    const iconClass = "w-6 h-6";
    switch (category.toLowerCase()) {
      case 'food':
        return <FaUtensils className={iconClass} />;
      case 'shopping':
        return <FaShoppingBag className={iconClass} />;
      case 'transport':
        return <FaCar className={iconClass} />;
      default:
        return <FaHome className={iconClass} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            {getCategoryIcon(category)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">₹{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
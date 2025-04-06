import React from 'react';

const Badge = ({ variant = 'info', children }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 
      rounded-full text-sm font-medium 
      border ${variants[variant] || variants.info}
      transition-colors duration-200
    `}>
      {children}
    </span>
  );
};

export default Badge;
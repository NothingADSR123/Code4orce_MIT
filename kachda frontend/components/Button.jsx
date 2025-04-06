import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = ''
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 
              disabled:bg-blue-300 disabled:cursor-not-allowed`,
    secondary: `bg-gray-100 text-gray-700 hover:bg-gray-200 
                disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;
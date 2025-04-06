import React, { useState, useEffect } from 'react';

const ToastNotification = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const types = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✓'
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: '⚠'
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: '✕'
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const { bg, text, icon } = types[type] || types.success;

  return (
    <div className={`
      fixed bottom-4 right-4 
      flex items-center gap-2 
      ${bg} ${text} 
      px-4 py-3 rounded-lg shadow-lg
      transform transition-all duration-500 ease-in-out
      animate-slide-in-bottom
    `}>
      <span className="text-lg">{icon}</span>
      <p className="font-medium">{message}</p>
      <button 
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
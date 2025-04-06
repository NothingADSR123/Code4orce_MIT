import React from 'react';

const InputField = ({ 
  label, 
  placeholder, 
  error, 
  type = 'text',
  value,
  onChange,
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition duration-200
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;
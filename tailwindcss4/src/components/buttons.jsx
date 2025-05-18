import React from 'react';

export const PrimaryButton = ({ onClick, children, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full py-3 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-900 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export const TextButton = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-700 hover:text-gray-900 ${className}`}
    >
      {children}
    </button>
  );
}; 
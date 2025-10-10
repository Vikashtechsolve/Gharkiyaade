import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'amber', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    amber: 'text-amber-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-${color === 'amber' ? 'amber-600' : color} ${sizeClasses[size]}`}></div>
      {text && (
        <p className={`mt-2 text-sm ${colorClasses[color]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export const ButtonSpinner = ({ color = 'white' }) => {
  return (
    <div className={`animate-spin rounded-full border-2 border-transparent border-t-${color === 'white' ? 'white' : 'current'} w-4 h-4`}></div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full border-4 border-gray-300 border-t-amber-600 w-16 h-16 mx-auto mb-4"></div>
        <p className="text-amber-800 font-medium">Loading Ghar Ki Yaade...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

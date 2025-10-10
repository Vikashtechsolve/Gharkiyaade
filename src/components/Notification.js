import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-300' : 'border-red-300';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-16 sm:top-20 right-2 sm:right-4 z-50 p-3 sm:p-4 rounded-lg shadow-lg border ${bgColor} ${borderColor} transform transition-all duration-500 ease-in-out max-w-sm w-full mx-2 sm:mx-0`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        ) : (
          <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
        <span className={`font-medium ${textColor} text-sm sm:text-base flex-1`}>{message}</span>
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
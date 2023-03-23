import React from 'react';

const Button = ({ className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm bg-blue-300 py-2 px-4 font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

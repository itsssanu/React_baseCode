import React from 'react';

export const CloseIcon = ({ className, onClick, style = {}, darkMode }) => {
  // Dynamic fill color based on dark mode
  const fillColor = darkMode ? '#E5E7EB' : '#000';
  
  return (
    <span
      className={`cursor-pointer ${className}`}
      style={style}
      onClick={onClick || (() => null)}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px"
        fill={fillColor}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </span>
  );
};
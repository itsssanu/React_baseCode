import React from 'react';

export const UploadImageIcon = ({ className, onClick, style = {}, darkMode }) => {
    // Use currentColor to inherit the text color from parent elements
    const strokeColor = darkMode ? "#E5E7EB" : "#6B7280";
    
    return (
        <span
            className={`anticon ${className}`}
            style={style}
            onClick={onClick || (() => null)}
        >
            <svg 
                width="32" 
                height="30" 
                viewBox="0 0 32 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M15.9126 11.0048V29M15.9126 11.0048L21.4596 17.0032M15.9126 11.0048L10.3656 17.0032M26.0821 21.0021C28.8908 21.0021 30.7046 18.5408 30.7046 15.5036C30.7045 14.3011 30.34 13.1319 29.6667 12.1749C28.9935 11.2179 28.0487 10.5259 26.977 10.205C26.8122 7.96252 25.9527 5.8457 24.5376 4.19679C23.1225 2.54788 21.2345 1.46325 19.1789 1.11827C17.1232 0.773291 15.02 1.18812 13.2093 2.29569C11.3987 3.40325 9.98634 5.13882 9.20071 7.22179C7.54664 6.72597 5.77817 6.961 4.28434 7.87519C2.79052 8.78937 1.69371 10.3078 1.2352 12.0965C0.776685 13.8852 0.994031 15.7976 1.83942 17.4129C2.68481 19.0283 4.089 20.2144 5.74307 20.7102" 
                    stroke={strokeColor} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </svg>
        </span>
    );
};
import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  return (
    <div className="flex items-center justify-center space-x-24">
      {steps.map((label, index) => (
        <div key={index} className="relative flex items-center">
          <div
            className={`md:w-6 md:h-6 w-4 h-4 rounded-full flex items-center justify-center ${
              index < currentStep ? 'bg-purple-700' : 'border-2 border-purple-700 bg-white'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                index < currentStep ? 'bg-white' : 'bg-purple-700'
              }`}
            />
          </div>
          {index < steps.length - 1 && (
            <div
              className={`absolute top-1/2 left-full -translate-y-1/2 w-24 h-1 ${
                index < currentStep - 1 ? 'bg-purple-700' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

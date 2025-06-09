import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckIcon } from '@heroicons/react/24/solid'; // You can use any truck icon or emoji

const LoginScreen = () => {
  const [userNumber, setUserNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log(`Sending OTP to ${userNumber}`);
    setIsOtpSent(true);
  };

  const handleLogin = () => {
    console.log(`Verifying OTP ${otp} for ${userNumber}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4 text-indigo-600">
          <TruckIcon className="w-12 h-12" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-2">
          Lorry Expense Tracker
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">Enter your number to receive OTP</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Mobile Number"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {isOtpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}

          <button
            onClick={isOtpSent ? handleLogin : handleSendOtp}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {isOtpSent ? 'Login' : 'Send OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

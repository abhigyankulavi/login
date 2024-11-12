import React from 'react';
import { Stethoscope } from 'lucide-react';

const Logo = () => {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
        <Stethoscope className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">E-Health Advisor</h1>
        <p className="text-gray-600">Welcome back! Please login to continue.</p>
      </div>
    </div>
  );
};

export default Logo;
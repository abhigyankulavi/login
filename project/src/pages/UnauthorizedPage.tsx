import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Access Denied" subtitle="You don't have permission to access this page">
      <div className="flex flex-col items-center space-y-4">
        <AlertOctagon className="w-16 h-16 text-red-500" />
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return to Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default UnauthorizedPage;
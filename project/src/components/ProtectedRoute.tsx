import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserType: UserType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedUserType }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.type !== allowedUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';

export const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/feed" />;
  }
  return children;
};

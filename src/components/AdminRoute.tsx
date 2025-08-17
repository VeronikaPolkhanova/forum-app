import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

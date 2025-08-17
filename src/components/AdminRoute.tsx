import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { Role } from '../constants';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();

  if (!user || user.role !== Role.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

const PrivateRoute = ({ children, requiredRole, requiredPermission }: PrivateRouteProps) => {
  const { isAuthenticated, userRole, hasPermission } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

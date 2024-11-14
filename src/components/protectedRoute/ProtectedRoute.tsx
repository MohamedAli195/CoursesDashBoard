import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirect: string;
  children: ReactNode;
}

function ProtectedRoute({ isAllowed, redirect, children }: ProtectedRouteProps) {
  if (!isAllowed) return <Navigate to={redirect} />;
  return <>{children}</>;
}

export default ProtectedRoute;

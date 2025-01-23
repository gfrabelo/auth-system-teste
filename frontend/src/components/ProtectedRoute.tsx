import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, redireciona para /signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Se autenticado, renderiza a rota protegida
  return children;
}
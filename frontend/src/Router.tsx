import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

export function Router() {
  return (
    <Routes>
      {/* Rota pública - Login */}
      <Route path="/signin" element={<SignIn />} />
      
      {/* Rota pública - Cadastro */}
      <Route path="/signup" element={<SignUp />} />
      
      {/* Rota protegida - Home */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
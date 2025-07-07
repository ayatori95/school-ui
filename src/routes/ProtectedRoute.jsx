import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Enquanto verifica a autenticação, não renderiza nada ou mostra um spinner
  if (loading) {
    return <div>Carregando...</div>; 
  }

  // Se não há usuário, redireciona para o login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Se a rota exige roles específicas, verifica se o usuário tem a permissão
  if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redireciona para uma página de "Não Autorizado" ou para o dashboard padrão
      // Aqui, vamos redirecionar de volta para a home para simplificar.
      return <Navigate to="/" replace />;
  }

  // Se o usuário está logado e tem a permissão, renderiza a página solicitada
  return <Outlet />;
};

export default ProtectedRoute;
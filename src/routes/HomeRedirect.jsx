import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/contexts/AuthContext';

const HomeRedirect = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'aluno') {
        return <Navigate to="/aluno/dashboard" replace />;
    }

    if (user.role === 'professor') {
        return <Navigate to="/professor/dashboard" replace />;
    }

    // Fallback para o login se o usuário não tiver uma role válida
    return <Navigate to="/login" replace />;
}

export default HomeRedirect;